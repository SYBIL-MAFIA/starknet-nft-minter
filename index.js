import {loadWallets} from "./utils/LoadDataFromFiles.js";
import {CreateJSONResult} from "./utils/DataJSONFile.js";
import path from "path";
import fs from "fs";
import {Workers} from "./utils/workers.js";

const main = async () => {
    try {
        const keys = await loadWallets()

        await CreateJSONResult(keys)

        const mainPathFile = path.join('.', 'results.json');
        const mainPathData = JSON.parse(fs.readFileSync(mainPathFile, 'utf8'));
        const currentFileUrl = new URL(import.meta.url);
        const currentDirectory = path.basename(path.dirname(currentFileUrl.pathname));
        for (const address of Object.keys(mainPathData)) {

            if (mainPathData[address]['MintNFT'] !== 'Done') {
                await Workers(mainPathData,address,currentDirectory,mainPathData[address]['id'],Object.keys(mainPathData).length)
            }
        }
    } catch (error) {
        console.error('Error in main function:', error);
    }
};


main().catch(error => {
    console.error('Error during execution:', error);
});