import { createContext, useContext, useEffect, useState } from "react";
import Chance from "chance";
const chance = new Chance(); // instantiate
import Web3 from "web3";
import { useNetworkSelectorContext } from "./useNetworkSelector";
import { networks, networkSearch } from "../assets/constants";

const RPCContext = createContext({
  randomWeb3Provider: null,
});

export const RPCProvider = ({ children }) => {
  const { currentNetworkSelection } = useNetworkSelectorContext();
  const [randomWeb3Provider, setRandomWeb3Provider] = useState(null);
  let randomRPC;
  let rpcFound = false;

  //useEffect template
  useEffect(async () => {
    const getRandomRPC = async (network = "Arbitrum") => {
      if (rpcFound) return;

      if (network === "Arbitrum") {
        randomRPC = chance.pickone([
          "https://arbitrum.blockpi.network/v1/rpc/public",
          "https://arbitrum-one.public.blastapi.io",
          "https://arb1.croswap.com/rpc",
          "https://arb1.arbitrum.io/rpc",
          // "https://1rpc.io/arb",
        ]);
      } else if (network === "Arbitrum Testnet") {
        randomRPC = chance.pickone([
          "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
          "https://arbitrum-goerli.public.blastapi.io",
          "https://arb-goerli.g.alchemy.com/v2/demo",
        ]);
      } else if (network === "Mumbai Testnet") {
        randomRPC = chance.pickone([
          "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
          "https://polygon-testnet.public.blastapi.io	",
          "https://polygon-mumbai.g.alchemy.com/v2/demo",
          "https://matic-mumbai.chainstacklabs.com",
        ]);
      }
      let web3 = new Web3(randomRPC);
      setRandomWeb3Provider(web3);

      await web3.eth
        .getChainId()
        .then((n) => {
          console.log(
            "DApp provider connected. Network name: " +
              networks(networkSearch.ID, n, networkSearch.WALLETDATA)["chainName"]
          );
          console.log("DApp provider RPC URL: " + randomRPC);
          rpcFound = true;
        })
        .catch(async () => {
          await getRandomRPC();
        });
    };

    await getRandomRPC(currentNetworkSelection);
  }, [currentNetworkSelection]);

  return (
    <RPCContext.Provider value={{ randomWeb3Provider }}>{children}</RPCContext.Provider>
  );
};

export const useRPCContext = () => useContext(RPCContext);
