import { ethers } from "ethers"; // npm install ethers

import WalletConnectProvider from "@walletconnect/web3-provider"; // This is the SDK provided by Wallet Connect
import * as config from "../helpers/config";
import * as utils from "./utils";
import {defaultWallet} from "../models/defaultWallet"
import { IWallet} from "../models/IWallet"


export const connect = async (): Promise<IWallet> => {
  try {
    // Reset cache
    localStorage.clear();
    const provider:WalletConnectProvider = new WalletConnectProvider({
        rpc: {
          1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
          137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
          // ...
        },
        clientMeta:{
          description:"A sample Dapp built by the CMU Blockchain group.",
          name: "Odyssey",
          url: "https://cmublockchain.xyz/",
          icons: ["https://cmublockchain.xyz/cbgLogo.png"]
        }
      });
    
    await provider.enable();
    console.log(provider);

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    provider.on("accountsChanged", utils.reloadApp);
    provider.on("chainChanged", utils.reloadApp);
    provider.on("disconnect", utils.reloadApp);
    //adapted from https://github.com/kentimsit/cronos-dapp-basic-3/blob/8bbbab74f0fcabb773123e1491a0e40c7bab1547/src/helpers/wallet-connect.ts
    return {
      ...defaultWallet,
      walletProviderName: "walletconnect",
      address: (await ethersProvider.listAccounts())[0],
      browserWeb3Provider: ethersProvider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.ethConfig.rpcNetwork.rpcUrl
      ),
      wcProvider: provider,
      connected: true,
      chainId: provider.chainId
    };
  } catch (e) {
    window.alert(e);
    return defaultWallet;
  }
};