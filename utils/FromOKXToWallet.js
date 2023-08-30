import ccxt from "ccxt";
import {General, OKXAuth} from '../config.js';
import {CheckBalance, WaitForUpdateBalance} from "./BalanceChecker.js";
import {SetupDelay} from "./Delay.js";
import {writeFile} from "fs/promises";

export const  FromOkxToWallet = async (path,address,logger,moduleString) => {

    let attempts = General.attempts
    while (attempts) {
        try{
            const handleCcxtError = (e) => {
                const errorType = e.constructor.name;
                console.error(`An error occurred ${errorType}.`);
                console.error(`Error details ${e}.`);
            }

            const exchange_options = {
                'apiKey': OKXAuth.okx_apiKey,
                'secret': OKXAuth.okx_apiSecret,
                'password': OKXAuth.okx_apiPassword,
                'enableRateLimit': true,
            };

            const exchange = new ccxt.okx(exchange_options);

            exchange.https_proxy = OKXAuth.okx_proxy

            let withdrawFee;
            const tmpNetwork = 'StarkNet';
            try {
                const fees = await exchange.fetchDepositWithdrawFees(['ETH']);
                const feeInfo = fees['ETH']?.networks?.[tmpNetwork];
                if (feeInfo) {
                    withdrawFee = feeInfo.withdraw.fee;

                } else {
                    withdrawFee = Math.random() * (0.0002 - 0.0001) + 0.0002;
                }
            } catch (error) {
                handleCcxtError(error);
                withdrawFee = Math.random() * (0.0002 - 0.0001) + 0.0002;
            }

            let amount = Math.random() * (General.amountToWithdrawalFromOKXToWallet[1] - General.amountToWithdrawalFromOKXToWallet[0]) + General.amountToWithdrawalFromOKXToWallet[1]
            amount = (amount - withdrawFee).toFixed(6);
            logger.info(`${moduleString} - Start withdrawal ${amount} ETH to StarkNet`)
            const chainName = 'ETH' + 'StarkNet';
            let balanceCash = await CheckBalance(address)
            await exchange.withdraw('ETH', amount, address, {
                toAddress: address,
                chainName: chainName,
                dest: 4,
                fee: withdrawFee,
                pwd: '-',
                amt: amount,
                network: this.network
            });

            await WaitForUpdateBalance(address, balanceCash, logger, moduleString)
            path[address]['DepositFromOKX'] = 'Done'
            await writeFile('./results.json', JSON.stringify(path, null, 2));
            await SetupDelay(General.delay, moduleString, logger)
            return path
        } catch (e){
            logger.info(`${moduleString}  - Error during execute: ${e}`);

            attempts--
            if (attempts > 0) {
                logger.info(`${moduleString} - Retrying... (${attempts} attempts left)`);
                await SetupDelay(General.delay, moduleString, logger)
            } else {
                logger.info(`${moduleString}  - Maximum retry count reached. Stopping retries`);

                path[address]['DepositFromOKX'] = 'Failed'
                await writeFile('./results.json', JSON.stringify(path, null, 2));
                return path
            }
        }
    }
}

