// Injected wallet
// Works with MetaMask in browser or in in-app browser

import { ethers } from "ethers"; // npm install ethers

import { IWallet} from "../models/IWallet"
import {defaultWallet} from "../models/defaultWallet"

import * as utils from "./utils"
import * as config from "./config"
import { Web3Provider } from "@ethersproject/providers";

// One feature of MetaMask is that the Dapp developer
// can programmatically
// change the network that the browser
// extension is connected to.

export const switchNetwork = async (provider:Web3Provider) => {
  try {
      // switch chain
    await provider.send(
      "wallet_switchEthereumChain",
      [{ chainId: config.ethConfig.rpcNetwork.chainIdHex }],
    );
  } 
  catch (e) {
    console.log(e);
    // if error.. further speciify
    await provider.send(
      "wallet_addEthereumChain",
      [
        {
          chainId: config.ethConfig.rpcNetwork.chainIdHex,
          chainName: config.ethConfig.rpcNetwork.chainName,
          rpcUrls: [config.ethConfig.rpcNetwork.rpcUrl],
          nativeCurrency: config.ethConfig.rpcNetwork.nativeCurrency,
          blockExplorerUrls: [config.ethConfig.rpcNetwork.blockExplorerUrl],
        },
      ],
    );
  }
};

// Main login flow for injected wallet like MetaMask
export const connect = async (): Promise<IWallet> => {
  try {
    console.log("Connecting to metamask...")
    await (window as any).ethereum.enable();
    let provider = new ethers.providers.Web3Provider((window as any).ethereum);
    console.log(provider);
    let block = await provider.getBlock(100004);
    console.log("test block request:");
    console.log(block);
    let network = await provider.getNetwork();
    console.log("Metamask returned chain id:");
    console.log(network.chainId);
    // check if chain id matches the chain id we would like to interact with
    if (!(network.chainId.toString() === config.ethConfig.rpcNetwork.chainIdHex)) {
        // switch network to desired
      await switchNetwork(provider);
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
    }
    console.log("Get accounts:");
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("hit!");

    // It is possible to subscribe to events chainChanged,
    // accountsChanged or disconnect,
    // and reload the Dapp whenever one of these events occurs
    provider.on("chainChanged", utils.reloadApp);
    provider.on("accountsChanged", utils.reloadApp);
    provider.on("disconnect", utils.reloadApp);

    let currNetwork = await provider.getNetwork();
    let newWallet = {
        ...defaultWallet,
        walletProviderName: "metamask",
        address: accounts[0],
        browserWeb3Provider: provider,
        serverWeb3Provider: new ethers.providers.JsonRpcProvider(
          config.ethConfig.rpcNetwork.rpcUrl
        ),
        connected: true,
        chainId: utils.hexToInt(
          // curr network chain id as string
          currNetwork.chainId.toString()
        ),
    };
    console.log("new wallet:");
    console.log(newWallet);
    return newWallet;
  } 
  catch (e) {
    window.alert(e);
    return defaultWallet;
  }
};
