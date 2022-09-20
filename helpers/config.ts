export const ropstenConfig = {
    mode: "regular",
    rpcNetwork: {
      rpcUrl: "	https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 3,
      chainIdHex: "0x3",
      chainName: "Ropsten Testnet",
      chainType: "mainnet",
      nativeCurrency: {
        name: "rEth",
        symbol: "rEth",
        decimals: 18,
      },
      blockExplorerUrl: "https://ropsten.etherscan.io/",
    }
};

export const ethConfig = {
  mode: "regular",
    rpcNetwork: {
      rpcUrl: "https://rpc.ankr.com/eth",
      chainId: 1,
      chainIdHex: "0x1",
      chainName: "Ethereum",
      chainType: "mainnet",
      nativeCurrency: {
        name: "Eth",
        symbol: "Eth",
        decimals: 18,
      },
      blockExplorerUrl: "https://etherscan.io/",
    }
}