export class General {
    static delay = [10, 20] // задержка между транзакциями
    static attempts = 3 // количество попыток при какой-то ошибке
    static WalletName = 'Argent'// Argent | Braavos - приватники от какого кошелька вы хотите использовать

    static WithdrawalFromOKXToWallet = true
    static amountToWithdrawalFromOKXToWallet = [0.011, 0.012] // количества ETH на вывод с OKX
    static minAmountOnWallet = 0.00058 // если баланс больше этого числа, то вывода с океса не будет

    static maxStarknetFee = 0.0006 // максимальный газ для транзакции в starknet
}

export class OKXAuth {
    static okx_proxy = '';  // proxy url | http://login:password@ip:port |
    static okx_apiKey = '';
    static okx_apiSecret = '';
    static okx_apiPassword = '';
}
