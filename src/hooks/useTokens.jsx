import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3HelperContext } from "./useWeb3Helper";
import { useUserContext } from "./useUser";
import { addresses } from "../assets/constants";

const TokensContext = createContext({
  getTokenName: undefined,
  getTokenPrice: undefined,
  getTokenDecimals: undefined,
  getTokenBalance: undefined,
  getTokenAllowance: undefined,
  tokensLoaded: false,
});

export const TokensProvider = ({ children }) => {
  const {
    web3HelperLoaded,
    runReservesMultiCall,
    runBalancesMultiCall,
    runBalancesAndAllowancesMultiCall,
    getContractInstance,
    fromWei,
  } = useWeb3HelperContext();
  const { wallet } = useUserContext();
  const [tokenPrices, setTokenPrices] = useState({});
  const [tokenBalances, setTokenBalances] = useState({});
  const [tokenAllowances, setTokenAllowances] = useState({
    [addresses.BONSAI_GAME_CONTRACT]: {},
  });
  const [ethPrice, setEthPrice] = useState(0);
  const [arbPrice, setArbPrice] = useState(0);
  const [sushiPrice, setSushiPrice] = useState(0);
  const [usdcPrice, setUsdcPrice] = useState(1);
  const [dohyoPrice, setDohyoPrice] = useState(0);

  const [tokensLoaded, setTokensLoaded] = useState(false);

  //write me an empty useEffect hook
  useEffect(async () => {
    try {
      if (!web3HelperLoaded) return;
      let newPrices = {};
      let newBalances = {};
      let newAllowances = tokenAllowances;

      const [blockNumber, reserves] = await runReservesMultiCall([
        addresses.WETH_USDC_LP, //weth-usdc
        addresses.ARB_ETH_LP, //arb-eth
        addresses.SUSHI_ETH_LP, //sushi-eth
        addresses.DOHYO_ETH_LP, //dohyo-eth
      ]);

      const { reserve0: wethUsdcR0, reserve1: wethUsdcR1 } =
        reserves[addresses.WETH_USDC_LP];

      let newEthPrice =
        parseFloat(fromWei(wethUsdcR1.toString(), "mwei")) /
        parseFloat(fromWei(wethUsdcR0.toString()));

      newPrices["weth"] = newEthPrice;

      const { reserve0: arbWethR0, reserve1: arbWethR1 } = reserves[addresses.ARB_ETH_LP];

      let newArbPrice =
        (parseFloat(fromWei(arbWethR0.toString())) * newEthPrice) /
        parseFloat(fromWei(arbWethR1.toString()));

      newPrices["arb"] = newArbPrice;

      const { reserve0: sushiWethR0, reserve1: sushiWethR1 } =
        reserves[addresses.SUSHI_ETH_LP];

      let newSushiPrice =
        (parseFloat(fromWei(sushiWethR0.toString())) * newEthPrice) /
        parseFloat(fromWei(sushiWethR1.toString()));
      newPrices["sushi"] = newSushiPrice;

      const { reserve0: dohyoWethR0, reserve1: dohyoWethR1 } =
        reserves[addresses.DOHYO_ETH_LP];

      let newDohyoPrice =
        (parseFloat(fromWei(dohyoWethR0.toString())) * newEthPrice) /
        parseFloat(fromWei(dohyoWethR1.toString()));

      newPrices["dohyo"] = newDohyoPrice;

      setTokenPrices(newPrices);

      if (wallet?.account) {
        const [_blockNumber, balancesAndAllowances] =
          await runBalancesAndAllowancesMultiCall(
            [
              addresses.ARB_TOKEN, //arb
              addresses.WETH_TOKEN, //eth
              addresses.SUSHI_TOKEN, //sushi
              addresses.USDC_TOKEN, //usdc
              addresses.DOHYO_TOKEN, //dohyo
              addresses.ZERO_ADDRESS, //eth native
            ],
            wallet?.account,
            addresses.BONSAI_GAME_CONTRACT
          );

        const { balance: newArbBalance, allowance: arbAllowance } =
          balancesAndAllowances[addresses.ARB_TOKEN];

        newBalances["arb"] = newArbBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["arb"] = arbAllowance.toString();

        const { balance: newWethBalance, allowance: wethAllowance } =
          balancesAndAllowances[addresses.WETH_TOKEN];

        newBalances["weth"] = newWethBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["weth"] = wethAllowance.toString();

        const { balance: newSushiBalance, allowance: sushiAllowance } =
          balancesAndAllowances[addresses.SUSHI_TOKEN];

        newBalances["sushi"] = newSushiBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["sushi"] =
          sushiAllowance.toString();

        const { balance: newUsdcBalance, allowance: usdcAllowance } =
          balancesAndAllowances[addresses.USDC_TOKEN];

        newBalances["usdc"] = newUsdcBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["usdc"] = usdcAllowance.toString();

        const { balance: newDohyoBalance, allowance: dohyoAllowance } =
          balancesAndAllowances[addresses.DOHYO_TOKEN];

        newBalances["dohyo"] = newDohyoBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["dohyo"] =
          dohyoAllowance.toString();

        const { balance: newEthBalance, allowance: ethAllowance } =
          balancesAndAllowances[addresses.NATIVE_ADDRESS];

        newBalances["eth"] = newEthBalance.toString();
        newAllowances[addresses.BONSAI_GAME_CONTRACT]["eth"] = ethAllowance.toString();

        setTokenBalances(newBalances);
        setTokenAllowances(newAllowances);
      }

      setTokensLoaded(true);
    } catch (error) {}
  }, [web3HelperLoaded]);

  const getTokenBalance = (address) => {
    if (address === addresses.ARB_TOKEN) return tokenBalances.arb;
    if (address === addresses.WETH_TOKEN) return tokenBalances.weth;
    if (address === addresses.NATIVE_ADDRESS) return tokenBalances.eth;
    if (address === addresses.SUSHI_TOKEN) return tokenBalances.sushi;
    if (address === addresses.USDC_TOKEN) return tokenBalances.usdc;
    if (address === addresses.DOHYO_TOKEN) return tokenBalances.dohyo;

    return 0;
  };
  const getTokenAllowance = (address, spender) => {
    if (address === addresses.ARB_TOKEN) return tokenAllowances[spender]?.arb;
    if (address === addresses.WETH_TOKEN) return tokenAllowances[spender]?.weth;
    if (address === addresses.NATIVE_ADDRESS) return tokenAllowances[spender]?.eth;
    if (address === addresses.SUSHI_TOKEN) return tokenAllowances[spender]?.sushi;
    if (address === addresses.USDC_TOKEN) return tokenAllowances[spender]?.usdc;
    if (address === addresses.DOHYO_TOKEN) return tokenAllowances[spender]?.dohyo;

    return 0;
  };

  const getTokenPrice = (address) => {
    if (address === addresses.ARB_TOKEN) return tokenPrices?.arb;
    if (address === addresses.WETH_TOKEN) return tokenPrices?.weth;
    if (address === addresses.SUSHI_TOKEN) return tokenPrices?.sushi;
    if (address === addresses.USDC_TOKEN) return 1;
    if (address === addresses.DOHYO_TOKEN) return tokenPrices?.dohyo;

    return 0;
  };

  const getTokenName = (address) => {
    if (address === addresses.ARB_TOKEN) return "ARB";
    if (address === addresses.WETH_TOKEN) return "WETH";
    if (address === addresses.NATIVE_ADDRESS) return "ETH";
    if (address === addresses.SUSHI_TOKEN) return "SUSHI";
    if (address === addresses.USDC_TOKEN) return "USDC";
    if (address === addresses.DOHYO_TOKEN) return "DOHYO";
    return "ERROR";
  };

  const getTokenDecimals = (address) => {
    if (address === addresses.ARB_TOKEN) return 18;
    if (address === addresses.WETH_TOKEN) return 18;
    if (address === addresses.SUSHI_TOKEN) return 18;
    if (address === addresses.USDC_TOKEN) return 6;
    if (address === addresses.DOHYO_TOKEN) return 18;
    return 18;
  };

  return (
    <TokensContext.Provider
      value={{
        getTokenPrice,
        getTokenName,
        getTokenDecimals,
        getTokenBalance,
        getTokenAllowance,
        tokensLoaded,
      }}
    >
      {children}
    </TokensContext.Provider>
  );
};

export const useTokensContext = () => useContext(TokensContext);
