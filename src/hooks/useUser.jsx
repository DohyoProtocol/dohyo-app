//EXTENSION
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Web3 from "web3";
//ASSETS
import {
  messages,
  networks,
  networkSearch,
  walletConnectBridgeUrl,
} from "../assets/constants";

//HOOKS
import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

const UserContext = createContext({
  wallet: null,
  userWeb3Provider: null,
  isLoggedIn: null,
  isLoggingIn: null,
  authenticateDesktop: undefined,
  authenticateMobile: undefined,
  endSession: undefined,
});

export const UserProvider = ({ children }) => {
  //This is used to manage user state and authentication.

  const [userWeb3Provider, setUserWeb3Provider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [provider, setProvider] = useState(null);
  const { activate, deactivate, active, chainId, account, library, get } = useWeb3React();

  //this useEffect takes care of wallet logins by listening to the useWeb3React "active" boolean
  useEffect(() => {
    const run = async () => {
      try {
        if (!active) {
          setIsLoggedIn(false);
          setIsLoggingIn(false);
          return;
        }

        setProvider(library.provider);

        if (!account) {
          setWallet(null);
          setIsLoggedIn(false);
        } else {
          console.log("WALLET: " + JSON.stringify({ account, network: chainId }));

          setWallet({ account: account, network: chainId });

          localStorage.setItem("userIsLoggedIn", "true");

          let web3 = new Web3(library.provider);

          setUserWeb3Provider(web3);

          console.log(
            "User provider connected. Network name: " +
              networks(networkSearch.ID, chainId, networkSearch.WALLETDATA)["chainName"]
          );

          setIsLoggedIn(true);
        }
        setIsLoggingIn(false);
      } catch (error) {
        setWallet(null);
        setIsLoggedIn(false);
        setIsLoggingIn(false);
      }
    };
    run();

    // eslint-disable-next-line
  }, [active]);

  //this useEffect allow us to autoconnect known users, while not anoying new users with a popup
  useEffect(() => {
    if (!active) {
      const userIsLoggedIn = localStorage.getItem("userIsLoggedIn");
      if (userIsLoggedIn) {
        authenticateDesktop();
      }
    }
  }, []);

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: networks(networkSearch.HEXID, "0x1", networkSearch.WALLETDATA).rpcUrls,
    bridge: walletConnectBridgeUrl,
    qrcode: true,
  });

  //this function initiates mobile wallet logins by listening to the WalletConnect "active" boolean
  const authenticateMobile = async () => {
    if (active) return;
    setWallet(null);
    setIsLoggedIn(false);
    setIsLoggingIn(true);
    await activate(WalletConnect, () => setIsLoggingIn(false));
  };

  const Injected = new InjectedConnector({
    supportedChainIds: [
      1, 10, 25, 5, 199, 1285, 1284, 66, 1088, 8217, 56, 420, 30, 42161, 43114, 97, 25,
      250, 9001, 137, 80001,
    ],
  });

  //this function initiates desktop wallet logins by listening to the Injected "active" boolean
  const authenticateDesktop = async () => {
    if (active) return;
    setWallet(null);
    setIsLoggedIn(false);
    setIsLoggingIn(true);
    await activate(Injected, () => setIsLoggingIn(false));
  };

  provider?.on("connect", async (info) => {
    console.log("wallet connect", info);
  });

  provider?.on("accountsChanged", (accounts) => {
    if (accounts[0] !== wallet.account) {
      endSession(messages.ACCOUNTCHANGED);
    }
  });

  provider?.on("chainChanged", (chainId) => {
    if ("0x" + chainId.toString(16) !== wallet.network)
      endSession(messages.NETWORKCHANGED);
  });

  const endSession = async (reason) => {
    setIsLoggedIn(false);
    setIsLoggingIn(true);
    deactivate();
    setProvider(null);
    localStorage.removeItem("userIsLoggedIn");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        wallet,
        userWeb3Provider,
        isLoggedIn,
        isLoggingIn,
        authenticateDesktop,
        authenticateMobile,
        endSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
