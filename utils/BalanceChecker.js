import { Contract, RpcProvider } from 'starknet';
import { mainabi } from './abi.js';

export const CheckBalance = async (address) => {
    try {
        const provider = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.public.blastapi.io' });

        const { abi: abi } = await provider.getClassAt('0x048624e084dc68d82076582219c7ed8cb0910c01746cca3cd72a28ecfe07e42d');
        if (abi === undefined) {
            throw new Error("no abi.");
        }
        const contract = new Contract(abi, '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', provider);

        const balance = await contract.functions.balanceOf(address)

        return balance.balance.low
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


export const ChechMint = async (address) => {
    try {
        const provider = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.public.blastapi.io' });

        const contract = new Contract(mainabi, '0x00b719f69b00a008a797dc48585449730aa1c09901fdbac1bc94b3bdc287cf76', provider);

        return await contract.functions.hasMinted(address)
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const WaitForUpdateBalance = async (address,balanceCash,logger,moduleString) => {
    try {
        while (true){
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            let balanceNew = await CheckBalance(address)

            if(balanceNew > balanceCash) {

                logger.info(`${moduleString} - Deposit confirmed on wallet`)

                return
            }
            else{
                logger.info(`${moduleString} - Deposit not confirmed on wallet yet, waiting 15sec...`)
                await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            }
        }
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
