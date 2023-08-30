import fs from 'fs';
import { writeFile } from 'fs/promises';
import { General } from "../config.js";
import { getStarknetAddress } from "./getAddress.js";
import { join } from 'path';

export const CreateJSONResult = async (keys) => {
    const filePath = join('./', 'results.json');
    let data = {};

    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        data = JSON.parse(fileData);
    } catch (error) {

    }
    let id = 1
    for (const key of keys) {
        const address = await getStarknetAddress(key);
        if (!data[address]) {
            data[address] = {
                'PrivateKey': key,
                'DepositFromOKX':'',
                'MintNFT': '',
                'WalletName': General.WalletName,
                'id': id
            };
        }
        id++
    }

    await writeFile(filePath, JSON.stringify(data, null, 2));
};
