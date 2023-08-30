import fs from 'fs-extra';

export const loadWallets = async () => {
    try {
        return fs.readFileSync('./privateKeys.txt', "utf8")
            .split("\n")
            .map(row => row.trim())
            .filter(row => row !== "") ;
    } catch (err) {
        console.error(`Error loadArgentWallets: ${err}`);
        throw err;
    }
};