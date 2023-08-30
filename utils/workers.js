import { ChechMint, CheckBalance } from './BalanceChecker.js';
import { SetupDelay } from './Delay.js';
import { FromOkxToWallet } from "./FromOKXToWallet.js";
import { createLoggerInstance } from "./logger.js";
import { writeFile } from "fs/promises";
import { General } from "../config.js";
import { MintNFT } from "./MintFunction.js";

export const Workers = async (path,address,dirName,addressIndex,lenght) => {
    const customMessenge = `[${dirName}][${addressIndex}/${lenght}]`
    const logger = createLoggerInstance(addressIndex, customMessenge);

    if ((General.WithdrawalFromOKXToWallet) && (path[address]['DepositFromOKX'] !== 'Done')){
        let balance = await CheckBalance(address)
        if (Number(balance) < (General.minAmountOnWallet * 10**18)){
            path = await FromOkxToWallet(path,address,logger,`[Account ${addressIndex}][Withdrawal][OKX]`)
        } else {
            logger.info(`[Account ${addressIndex}][Withdrawal][OKX] - Enough balance to mint NFT, skip withdrawal`)
            path[address]['DepositFromOKX'] = 'Done'
            await writeFile('./results.json', JSON.stringify(path, null, 2));
            await SetupDelay(General.delay, `[Account ${addressIndex}][Withdrawal][OKX]`, logger)
        }

    }

    if (path[address]['MintNFT'] !== 'Done') {
        const hasMinted = await ChechMint(address);
        if (hasMinted === 1) {
            logger.info(`[Account ${ addressIndex }][Mint] - NFT already minted`)
            path[address]['MintNFT'] = 'Done'
            await writeFile('./results.json', JSON.stringify(path, null, 2));
            await SetupDelay(General.delay, `[Account ${addressIndex}][Withdrawal][OKX]`, logger)
        } else {
            path = await MintNFT(path, address, logger, `[Account ${ addressIndex }][Mint]`);
        }
    }
}