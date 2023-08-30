import { Account, constants, Provider } from 'starknet';
import { General } from "../config.js";
import { SetupDelay } from "./Delay.js";
import { waitForGasTxStarknet } from "./WaitForGas.js";

export default class txConfirmation {
    constructor (txPayload, transaction, address,privateKey, logger, moduleString) {
        this.txPayload = txPayload;
        this.address = address;
        this.provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } });
        this.transaction = transaction;
        this.logger = logger;
        this.moduleString = moduleString;
        this.privateKey = privateKey
    }

    async execute() {

        return await this.retryOnFail(async () => {
            const account = new Account(this.provider, this.address, this.privateKey);

            try {
                await waitForGasTxStarknet(this.logger, this.txPayload, this.moduleString, account)
                let nonceCash;
                let nonce;
                try {
                    nonceCash = await account.getNonce();
                    nonceCash = parseInt(nonceCash, 16);
                } catch (e) {
                    this.logger.error(`${this.moduleString} - Error while fetching nonce: ${e}`);
                }

                let executeHash = await account.execute(this.txPayload);
                this.logger.info(`${this.moduleString} - Send TX: https://starkscan.co/tx/${executeHash.transaction_hash}`);
                this.logger.info(`${this.moduleString} - Waiting for tx status...`);
                let res; let flag;

                while (true) {
                    try {
                        res = await this.provider.getTransactionReceipt(executeHash.transaction_hash);
                        if (res.status === 'ACCEPTED_ON_L2' && res.finality_status === 'ACCEPTED_ON_L2' && res.execution_status === 'SUCCEEDED') {
                            flag = 1;
                            break;
                        } else if (res.status === 'REJECTED' || res.execution_status === 'REJECTED') {
                            flag = 0;
                            break;
                        } else if (res.status === 'REVERTED' || res.execution_status === 'REVERTED') {
                            flag = -1
                            break;
                        }
                    } catch (error) {
                        this.logger.info('An error occurred while getting txn status.');
                    }

                    await new Promise(resolve => setTimeout(resolve, 2 * 1000));
                }

                if (flag === 1) {
                    nonce = await account.getNonce();
                    nonce = parseInt(nonce, 16);

                    if (nonce === nonceCash) {
                        this.logger.info(`${ this.moduleString } - Transaction success, but nonce still low | Nonce ${ nonce }`);

                        for (let i = 0; i < 90; i++) {
                            await new Promise(resolve => setTimeout(resolve, 2 * 1000));
                            nonce = await account.getNonce();
                            nonce = parseInt(nonce, 16);
                            if (nonce > nonceCash) {
                                this.logger.info(`\x1b[32m${ this.moduleString } - The transaction is fully confirmed in the blockchain | Nonce ${ nonce }\x1b[0m`);
                                this.transaction.status = 'Done';
                                return this.transaction
                            }
                        }
                    } else if (nonce > nonceCash) {
                        this.logger.info(`\x1b[32m${ this.moduleString } - The transaction is fully confirmed in the blockchain | Nonce ${ nonce }\x1b[0m`);
                        this.transaction.status = 'Done';
                        return this.transaction
                    }
                } else if (flag === 0) {
                    this.logger.error(`${this.moduleString} - Transaction rejected.`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                } else if (flag === -1) {
                    this.logger.error(`${this.moduleString} - Transaction Reverted`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                } else {
                    this.logger.error(`${this.moduleString} - An error occurred in transaction.`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                }

                } catch (error) {
                    this.logger.error(`\x1b[31m${this.moduleString} - An error occurred txPayload error: ${error}\x1b[0m`);

                    throw new Error(`${this.moduleString} - Transaction rejected error.`)
                }
        }, General.attempts);
    }


    async retryOnFail(func, maxAttempts) {
        let attempts = 0;
        while (attempts < maxAttempts) {
            try {
                return await func();
            } catch (error) {
                this.logger.error(`${this.moduleString} - Attempt ${attempts + 1} failed with error: ${error}. Retrying...`);

                attempts++;
                await SetupDelay(General.delay,this.moduleString,this.logger)
                if (attempts >= maxAttempts) {
                    this.transaction.status = 'Failed';
                    return this.transaction
                }
            }
        }
    }



}