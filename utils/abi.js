export const mainabi = [
    {
        "name": "Uint256",
        "size": 2,
        "type": "struct",
        "members": [
            {
                "name": "low",
                "type": "felt",
                "offset": 0
            },
            {
                "name": "high",
                "type": "felt",
                "offset": 1
            }
        ]
    },
    {
        "data": [
            {
                "name": "previousOwner",
                "type": "felt"
            },
            {
                "name": "newOwner",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Transfer",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Approval",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "operator",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "implementation",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "previousAdmin",
                "type": "felt"
            },
            {
                "name": "newAdmin",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "name": "initializer",
        "type": "function",
        "inputs": [
            {
                "name": "name",
                "type": "felt"
            },
            {
                "name": "symbol",
                "type": "felt"
            },
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "totalSupply",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "totalSupply",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "tokenByIndex",
        "type": "function",
        "inputs": [
            {
                "name": "index",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "tokenOfOwnerByIndex",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "index",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "supportsInterface",
        "type": "function",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "name",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "name",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "symbol",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "symbol",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "mintPhase",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "phase",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "balance",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "ownerOf",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getApproved",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "isApprovedForAll",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "operator",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "tokenURI",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "uri_len",
                "type": "felt"
            },
            {
                "name": "uri",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "owner",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "hasMinted",
        "type": "function",
        "inputs": [
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "hasMinted",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "setMintPhase",
        "type": "function",
        "inputs": [
            {
                "name": "phase",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "setApprovalForAll",
        "type": "function",
        "inputs": [
            {
                "name": "operator",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "transferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "safeTransferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "outputs": []
    },
    {
        "name": "mint",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "mintPublic",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "burn",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "transferOwnership",
        "type": "function",
        "inputs": [
            {
                "name": "newOwner",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "renounceOwnership",
        "type": "function",
        "inputs": [],
        "outputs": []
    },
    {
        "name": "setTokenUri",
        "type": "function",
        "inputs": [
            {
                "name": "uri_len",
                "type": "felt"
            },
            {
                "name": "uri",
                "type": "felt*"
            }
        ],
        "outputs": []
    }
];