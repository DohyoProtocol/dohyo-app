//HOOKS
import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./useUser";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { useRPCContext } from "./useRPC";
import { MultiCall } from "@indexed-finance/multicall";
import { useToastHook } from "./useToast";
import { getContractParams, toastTypes } from "../assets/constants";

const Web3HelperContext = createContext({
  currentBlockNumber: null,
  currentBlockUnix: null,
  currentChainId: null,
  averageBlockTime: null,
  web3HelperLoaded: null,
  getContractInstance: undefined,
  runMultiCall: undefined,
  runReservesMultiCall: undefined,
  runBalancesMultiCall: undefined,
  runBalancesAndAllowancesMultiCall: undefined,
  fromWei: undefined,
});

export const Web3HelperProvider = ({ children }) => {
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);
  const [currentBlockUnix, setCurrentBlockUnix] = useState(0);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [averageBlockTime, setAverageBlockTime] = useState(0);
  const [web3HelperLoaded, setWeb3HelperLoaded] = useState(false);
  const [web3HelperLoading, setWeb3HelperLoading] = useState(false);
  const { userWeb3Provider } = useUserContext();
  const { randomWeb3Provider } = useRPCContext();
  const { chainId } = useWeb3React();
  const { newToast } = useToastHook();

  useEffect(async () => {
    try {
      if (userWeb3Provider || randomWeb3Provider) {
        setWeb3HelperLoading(true);
        setWeb3HelperLoaded(false);
        let web3 = randomWeb3Provider;
        if (userWeb3Provider && chainId === 42161) {
          let r = Math.random();
          web3 = 0.3 > r ? userWeb3Provider : randomWeb3Provider;
        }
        // setCurrentChainId(chainId);

        let blockNum = await web3.eth
          .getBlockNumber()
          .then((n) => {
            return n;
          })
          .catch(async () => {});

        let avBlockTime = await web3.eth.getBlock(blockNum - 1000).then((b) => {
          const diff = Date.now() - b.timestamp * 1000;
          return diff / 1000;
        });

        setAverageBlockTime(avBlockTime);
        setCurrentBlockNumber(blockNum);
        setCurrentBlockUnix(Date.now());

        if (blockNum !== 0) {
          setWeb3HelperLoaded(true);
        }
        setWeb3HelperLoading(false);
      }
    } catch (error) {
      await web3Crashed();
    }
  }, [randomWeb3Provider, userWeb3Provider]);

  const getContractInstance = async (contractName) => {
    try {
      if (userWeb3Provider || randomWeb3Provider) {
        let web3 = randomWeb3Provider;
        if (userWeb3Provider) {
          if (chainId === 42161) {
            web3 = userWeb3Provider;
          }
        }
        const { address, abi } = getContractParams(contractName, chainId);

        const contract = await new web3.eth.Contract(abi, address);
        return contract;
      }
    } catch (error) {
      console.log(error);
      await web3Crashed();
    }
  };

  const runMultiCall = async (contractName, inputs) => {
    try {
      const multi = new MultiCall(randomWeb3Provider);

      const { address, abi } = getContractParams(contractName, chainId);

      return await multi.multiCall(abi, inputs);
    } catch (error) {
      console.log(error);
      await web3Crashed();
    }
  };

  const runReservesMultiCall = async (tokens) => {
    try {
      const multi = new MultiCall(randomWeb3Provider);

      return await multi.getReserves(tokens);
    } catch (error) {
      console.log(error);
      await web3Crashed();
    }
  };

  const runBalancesMultiCall = async (tokens, account) => {
    try {
      const multi = new MultiCall(randomWeb3Provider);

      return await multi.getBalances(tokens, account);
    } catch (error) {
      console.log(error);
      await web3Crashed();
    }
  };

  const runBalancesAndAllowancesMultiCall = async (tokens, account, spender) => {
    try {
      const multi = new MultiCall(randomWeb3Provider);

      return await multi.getBalancesAndAllowances(tokens, account, spender);
    } catch (error) {
      console.log(error);
      await web3Crashed();
    }
  };

  const fromWei = (value, fromUnit = "ether") => {
    try {
      let web3 = new Web3(randomWeb3Provider);
      return web3.utils.fromWei(value, fromUnit);
    } catch (error) {}
  };

  const toWei = (value, toUnit = "ether") => {
    try {
      let web3 = new Web3(randomWeb3Provider);
      return web3.utils.toWei(value, toUnit);
    } catch (error) {
      console.log(error);
    }
  };

  const web3Crashed = async () => {
    newToast("Something went wrong, reloading page...", toastTypes.RELOADING);
    return;
    await new Promise((r) => setTimeout(r, 3000));
    window.location.reload();
  };

  return (
    <Web3HelperContext.Provider
      value={{
        currentBlockNumber,
        currentBlockUnix,
        currentChainId,
        averageBlockTime,
        web3HelperLoaded,
        getContractInstance,
        runMultiCall,
        runReservesMultiCall,
        runBalancesMultiCall,
        runBalancesAndAllowancesMultiCall,
        fromWei,
        toWei,
      }}
    >
      {children}
    </Web3HelperContext.Provider>
  );
};

export const useWeb3HelperContext = () => useContext(Web3HelperContext);
