import {General} from "../config.js";
import {SetupDelay} from "./Delay.js";
import {writeFile} from "fs/promises";
import txConfirmation from "./txConfirmation.js";
import {CallData} from "starknet";

export const MintNFT = async (path,address,logger,moduleString) => {
    let attempts = General.attempts
    while (attempts > 0){
        try{
            logger.info(`${moduleString} - Start Minting NFT...`)
            const txPayload = [
                {
                    contractAddress: '0x00b719f69b00a008a797dc48585449730aa1c09901fdbac1bc94b3bdc287cf76',
                    entrypoint: 'mintPublic',
                    calldata: CallData.compile({
                        to: address
                    })
                }
            ];


            path[address]['MintNFT'] = await new txConfirmation(txPayload,path[address]['MintNFT'],address,path[address]['PrivateKey'],logger,moduleString).execute()
            await writeFile('./results.json', JSON.stringify(path, null, 2));
            await SetupDelay(General.delay, moduleString, logger)
            return path
        }catch (e) {
            logger.info(`${moduleString}  - Error during execute: ${e}`);

            attempts--
            if (attempts > 0) {
                logger.info(`${moduleString} - Retrying... (${attempts} attempts left)`);
                await SetupDelay(General.delay, moduleString, logger)
            } else {
                logger.info(`${moduleString}  - Maximum retry count reached. Stopping retries`);

                path[address]['MintNFT'] = 'Failed'
                await writeFile('./results.json', JSON.stringify(path, null, 2));
                return path
            }
        }
    }
    logger.info(`${moduleString} - Start Mint new NFT`)
}