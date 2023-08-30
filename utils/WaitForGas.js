import {General} from "../config.js";

export const waitForGasTxStarknet = async (logger, tx, moduleString, account) => {
    try{
        let fee = await account.estimateInvokeFee(tx);
        let overallFee = Number(fee.overall_fee) / (10**18);

        if (overallFee > General.maxStarknetFee) {
            logger.info(`${moduleString} - Gas is still high | Current ${overallFee} | Need ${General.maxStarknetFee}`);

            await new Promise(resolve => setTimeout(resolve, 60 * 1000));
            return await this.waitForGasTxStarknet(logger, tx, moduleString, account);
        }

        logger.info(`${moduleString} - Gas within normal limits | Current ${overallFee} | Max ${General.maxStarknetFee}`);

        return true
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }

}