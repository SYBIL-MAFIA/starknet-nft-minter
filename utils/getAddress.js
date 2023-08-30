import {General} from "../config.js";
import {calculateBraavosAddress} from "./calculateBraavosAddress.js";
import {CallData, ec, hash} from "starknet";

export const  getStarknetAddress = async (startPrivateKey) => {
    switch (General.WalletName) {
        case "Argent":
            return await getArgentXWallet(startPrivateKey)
        case 'Braavos':
            return calculateBraavosAddress(startPrivateKey);
    }
}

const getArgentXWallet = async (key) => {
    const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
    const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

    const StarkpublicKey = ec.starkCurve.getStarkKey(key);

    const ConstructorCallData = CallData.compile({
        implementation: argentXaccountClassHash,
        selector: hash.getSelectorFromName("initialize"),
        calldata: CallData.compile({ signer: StarkpublicKey, guardian: "0" }),
    });

    return hash.calculateContractAddressFromHash(
        StarkpublicKey,
        argentXproxyClassHash,
        ConstructorCallData,
        0
    );
}