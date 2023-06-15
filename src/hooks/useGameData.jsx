import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supportedTokensList } from "../assets/supportedTokensList";

import { useFilterContext } from "./useFilter";
import { useUserContext } from "./useUser";
import { useWeb3HelperContext } from "./useWeb3Helper";
import { useTokensContext } from "./useTokens";
import { decimalsToUnits } from "../assets/constants";

const GameDataContext = createContext({
  gameData: null,
  gameDataLoading: null,
  gameDataLoaded: null,
  gameDataError: null,
  forceReloadGameData: undefined,
});
const gamesNames = ["bonsai", "shimo", "katana", "kami", "sumo", "luffy"];

export const GameDataProvider = ({ children }) => {
  const { selectedGame, selectedFilter, selectedSortNewest } = useFilterContext();
  const { wallet } = useUserContext();
  const userAddress = wallet?.account;
  const location = useLocation();
  const lp = location.pathname;
  const [pagination, setPagination] = useState(1);
  const [gameData, setGameData] = useState(null);
  const [gameDataLoading, setGameDataLoading] = useState(false);
  const [gameDataLoaded, setGameDataLoaded] = useState(false);
  const [gameDataError, setGameDataError] = useState(false);
  const { web3HelperLoaded, runMultiCall, getContractInstance, fromWei } =
    useWeb3HelperContext();
  const { getTokenPrice, getTokenDecimals, tokensLoaded } = useTokensContext();

  useEffect(async () => {
    const getGameInstance = async () => {
      try {
        if (!tokensLoaded || !web3HelperLoaded || !lp.includes("bonsai")) {
          setGameData(null);
          setGameDataLoading(false);
          setGameDataLoaded(true);
          return;
        }

        setGameDataLoaded(false);
        setGameDataError(false);
        setGameData(null);
        let _gameData = {};

        let gameName = "";
        let communityId = 0;
        let playerAddress = "";
        if (lp.includes("/community/")) {
          communityId = lp.replace("/community/", "");
          gameName = gamesNames[selectedGame];
        } else if (lp.includes("/user/")) {
          playerAddress = lp.replace("/user/", "");
          gameName = gamesNames[selectedGame];
        } else {
          playerAddress = userAddress;
          gameName = lp.replace("/", "");
        }

        const gameInstance = await getContractInstance(gameName);
        const dohyoInstance = await getContractInstance("dohyocontract");
        const gameAddress = gameInstance._address;
        const dohyoAddress = dohyoInstance._address;
        const gameCounter = await gameInstance.methods.gameCounter().call();

        const dohyoMultiCallInput = [];
        const gameMultiCallInput = [];
        const dohyoMultiCallModel = [];
        const gameMultiCallModel = [];
        const dohyoMultiCallRes = {};
        const gameMultiCallRes = {};

        // // GET GAME COUNTER
        if (lp.includes("/community/")) {
          dohyoMultiCallInput.push({
            target: dohyoAddress,
            function: "communityInfo",
            args: [communityId],
          });
          dohyoMultiCallModel.push({
            communityInfo: null,
          });
        } else if (lp.includes("/user/")) {
          dohyoMultiCallInput.push({
            target: dohyoAddress,
            function: "playerInfo",
            args: [playerAddress],
          });
          dohyoMultiCallModel.push({
            playerInfo: null,
          });
        } else {
          gameMultiCallInput.push({
            target: gameAddress,
            function: "gameCounter",
            args: [],
          });
          gameMultiCallModel.push({
            gameCounter: null,
          });
        }

        // // GET ENDED COUNTER
        if (!lp.includes("/community/") && !lp.includes("/user/")) {
          gameMultiCallInput.push({
            target: gameAddress,
            function: "endedGameCounter",
            args: [],
          });
          gameMultiCallModel.push({
            endedGameCounter: null,
          });
        }

        if (playerAddress) {
          // // GET WIN COUNTER
          dohyoMultiCallInput.push({
            target: dohyoAddress,
            function: "playerInfo",
            args: [playerAddress],
          });
          dohyoMultiCallModel.push({
            playerInfo: null,
          });
        }

        // // GET VOLUME
        let tokensVolumeStartIndex = dohyoMultiCallInput.length;
        supportedTokensList.forEach((tokenObject) => {
          let token = tokenObject.ADDRESS;
          if (lp.includes("/community/")) {
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "communityBetAmount",
              args: [communityId, token],
            });
            dohyoMultiCallModel.push({
              communityBetAmount: null,
              tokenAddress: token,
            });
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "communityWinAmount",
              args: [communityId, token],
            });
            dohyoMultiCallModel.push({
              communityWinAmount: null,
              tokenAddress: token,
            });
          } else if (lp.includes("/user/")) {
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "playerBetAmount",
              args: [playerAddress, token],
            });
            dohyoMultiCallModel.push({
              playerBetAmount: null,
              tokenAddress: token,
            });
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "playerWinAmount",
              args: [playerAddress, token],
            });
            dohyoMultiCallModel.push({
              playerWinAmount: null,
              tokenAddress: token,
            });
          } else {
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "supportedTokenBetAmount",
              args: [gameAddress, token],
            });
            dohyoMultiCallModel.push({
              supportedTokenBetAmount: null,
              tokenAddress: token,
            });
            dohyoMultiCallInput.push({
              target: dohyoAddress,
              function: "supportedTokenWinAmount",
              args: [gameAddress, token],
            });
            dohyoMultiCallModel.push({
              supportedTokenWinAmount: null,
              tokenAddress: token,
            });
          }
        });

        // // GET GAME CARDS
        const gameIds = [];
        if (selectedSortNewest) {
          for (let index = gameCounter - 1; index >= 0; index--) {
            gameIds.push(index);
          }
        } else {
          for (let index = 0; index < gameCounter; index++) {
            gameIds.push(index);
          }
        }

        gameMultiCallInput.push({
          target: gameAddress,
          function: "getGames",
          args: [gameIds],
        });
        gameMultiCallModel.push({
          getGames: [],
          gameIds: gameIds,
        });

        const [_blockNumber, dohyoMultiCallOutput] = await runMultiCall(
          "dohyocontract",
          dohyoMultiCallInput
        );
        const [__blockNumber, gameMultiCallOutput] = await runMultiCall(
          gameName,
          gameMultiCallInput
        );

        for (let index = 0; index < gameMultiCallModel.length; index++) {
          const element = gameMultiCallOutput[index];
          const key = Object.keys(gameMultiCallModel[index])[0];
          gameMultiCallModel[index][key] = element;
          gameMultiCallRes[key] = element;
        }
        for (let index = 0; index < dohyoMultiCallModel.length; index++) {
          const element = dohyoMultiCallOutput[index];
          const key = Object.keys(dohyoMultiCallModel[index])[0];
          dohyoMultiCallModel[index][key] = element;
          dohyoMultiCallRes[key] = element;
        }

        let volume = 0;
        for (
          let index = tokensVolumeStartIndex;
          index < dohyoMultiCallModel.length;
          index++
        ) {
          let element = dohyoMultiCallModel[index];
          let tokenDecimals = getTokenDecimals(element["tokenAddress"]);
          let tokenVolumeWei = element[Object.keys(element)[0]].toString();
          let tokenVolume = fromWei(tokenVolumeWei, decimalsToUnits(tokenDecimals));
          let tokenPrice = getTokenPrice(element["tokenAddress"]);
          volume += tokenVolume * tokenPrice;
        }

        _gameData["volume"] = volume;
        _gameData["gameCounter"] = gameCounter;
        _gameData["endedGameCounter"] = gameMultiCallRes["endedGameCounter"];
        _gameData["gameIds"] = gameIds;
        _gameData["gameMetas"] = gameMultiCallRes["getGames"][0];
        _gameData["gameStates"] = gameMultiCallRes["getGames"][1];
        setGameData(_gameData);

        setGameDataError(false);

        setGameDataLoading(false);
        setGameDataLoaded(true);
      } catch (e) {
        setGameData(null);
        setGameDataError(true);

        setGameDataLoading(false);

        setGameDataLoaded(true);
      }
    };

    await getGameInstance();
  }, [gameDataLoading]);

  useEffect(async () => {
    if (web3HelperLoaded && tokensLoaded && !gameDataLoading) {
      setGameDataLoaded(false);
      setGameDataLoading(true);
    }
  }, [
    selectedFilter,
    pagination,
    location,
    selectedSortNewest,
    web3HelperLoaded,
    tokensLoaded,
  ]);

  const loadMoreGameData = () => {
    setPagination(pagination + 1);
  };

  const forceReloadGameData = () => {
    setGameDataLoading(true);
  };

  return (
    <GameDataContext.Provider
      value={{
        gameDataLoading,
        gameDataLoaded,
        gameData,
        gameDataError,
        forceReloadGameData,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameDataContext = () => useContext(GameDataContext);
