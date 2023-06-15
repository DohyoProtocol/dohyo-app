import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Boosted } from "./CardItems/Boosted";

import { GameCountdown } from "./CardItems/GameCountdown";
import { PlayButton } from "./CardItems/PlayButton";
import { Pot } from "./CardItems/Pot";
import { GameCardBase } from "./GameCardBase";
import { useUserContext } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useWeb3HelperContext } from "../../hooks/useWeb3Helper";
import { SlipButton } from "./CardItems/SlipButton";
import { useToastHook } from "../../hooks/useToast";
import {
  addresses,
  toastTypes,
  tokenAddressToSymbol,
  tokenAddressToUnits,
} from "../../assets/constants";
import { useTokensContext } from "../../hooks/useTokens";
import { useGameDataContext } from "../../hooks/useGameData";
import { saveTransaction } from "../../utils/transactionHistory";
export const BonsaiGameCard = ({ openSlip, cardMeta, cardState }) => {
  let {
    gameId = 0,
    tokenAddress = "",
    boosted = false,
    ultraBoosted = false,
    startTime = 0,
    player1 = "",
    player2 = "",
  } = cardMeta;

  let {
    bet = 0,
    pot = 0,
    nextPlayer = "",
    nextDeadline = 0,
    deadLinesMet = 0,
    started = false,
    ended = false,
    cancelled = false,
    open = !started && !ended && !cancelled,
    winner = "",
  } = cardState;

  const { newToast, closeToast } = useToastHook();
  const { tokensLoaded, getTokenPrice, getTokenBalance, getTokenAllowance } =
    useTokensContext();
  const { wallet } = useUserContext();
  const { currentBlockUnix, web3HelperLoaded, getContractInstance, fromWei } =
    useWeb3HelperContext();
  const { forceReloadGameData } = useGameDataContext();

  const [deadLineBlockUnix, setDeadLineBlockUnix] = useState(null);
  const [deadLineBlocksRemaining, setDeadLineBlocksRemaining] = useState(null);
  const [approvalGiven, setApprovalGiven] = useState(false);
  const [pbText, setPbText] = useState(null);

  useEffect(async () => {
    if (!currentBlockUnix || !web3HelperLoaded || !tokensLoaded) return;
    let _deadLineBlocksRemaining = 0;
    async function getDates() {
      let deadLineBlockUnix = 1000 * parseInt(nextDeadline.toString());
      setDeadLineBlockUnix(deadLineBlockUnix);

      _deadLineBlocksRemaining = !started ? -1 : deadLineBlockUnix - currentBlockUnix;

      setDeadLineBlocksRemaining(_deadLineBlocksRemaining);
    }

    await getDates();

    const checkApproval = async () => {
      try {
        setApprovalGiven(false);

        let tokenAllowance = fromWei(
          getTokenAllowance(tokenAddress, addresses.BONSAI_GAME_CONTRACT),
          tokenAddressToUnits(tokenAddress)
        );

        let tokenBalance = fromWei(
          getTokenBalance(tokenAddress),
          tokenAddressToUnits(tokenAddress)
        );

        let betTokensAmount = fromWei(bet.toString(), tokenAddressToUnits(tokenAddress));

        let betTokensWeiAmount = bet.toString();

        if (!started && !cancelled && player1 === wallet?.account) {
          setPbText("Cancel");
        } else if (
          open &&
          (player2 === wallet?.account || player2 === addresses.ZERO_ADDRESS) &&
          wallet?.account !== player1
        ) {
          setPbText("Join");
          if (betTokensAmount <= tokenAllowance && betTokensAmount <= tokenBalance) {
            setApprovalGiven(true);
          }
        } else if (
          started &&
          !ended &&
          _deadLineBlocksRemaining > 0 &&
          nextPlayer === wallet?.account
        ) {
          setPbText("Extend");
          if (
            (betTokensAmount <= tokenAllowance && betTokensAmount <= tokenBalance) ||
            (!boosted && !ultraBoosted)
          ) {
            setApprovalGiven(true);
          }
        } else if (
          (wallet?.account === player1 || wallet?.account === player2) &&
          nextPlayer !== wallet?.account &&
          _deadLineBlocksRemaining < 0 &&
          !ended &&
          !cancelled &&
          started
        ) {
          setPbText("Claim");
        }
      } catch (error) {}
    };
    await checkApproval();
  }, [currentBlockUnix, web3HelperLoaded, tokensLoaded]);

  const playButtonOnClick = async () => {
    const gameInstance = await getContractInstance("bonsai");
    const tokenInstance = await getContractInstance(tokenAddress);

    if (pbText === "Cancel") {
      await gameInstance.methods
        .cancelGame(parseInt(gameId.toString()))
        .send({ from: wallet?.account })
        .on("transactionHash", function (hash) {
          newToast(
            "Cancel Bonsai Game #" + gameId.toString(),
            toastTypes.CONFIRMING,
            3000000
          );
          saveTransaction(
            wallet?.account,
            hash,
            "Cancel Bonsai Game #" + gameId.toString()
          );
        })
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          closeToast();
          newToast("Cancel Bonsai Game #" + gameId.toString(), toastTypes.SUCCESS);
          forceReloadGameData();
        })
        .on("error", function (error, receipt) {});
    }

    if (pbText === "Join") {
      if (approvalGiven) {
        await gameInstance.methods
          .joinGame(parseInt(gameId.toString()))
          .send({ from: wallet?.account })
          .on("transactionHash", function (hash) {
            newToast(
              "Join Bonsai Game #" + gameId.toString(),
              toastTypes.CONFIRMING,
              3000000
            );
            saveTransaction(
              wallet?.account,
              hash,
              "Join Bonsai Game #" + gameId.toString()
            );
          })
          .on("confirmation", function (confirmationNumber, receipt) {})
          .on("receipt", function (receipt) {
            closeToast();
            newToast("Join Bonsai Game #" + gameId.toString(), toastTypes.SUCCESS);
            forceReloadGameData();
          })
          .on("error", function (error, receipt) {});

        open = false;
      } else {
        await tokenInstance.methods
          .approve(addresses.BONSAI_GAME_CONTRACT, bet.toString())
          .send({ from: wallet?.account })
          .on("transactionHash", function (hash) {
            newToast(
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending",
              toastTypes.CONFIRMING,
              3000000
            );
            saveTransaction(
              wallet?.account,
              hash,
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending"
            );
          })
          .on("confirmation", function (confirmationNumber, receipt) {})
          .on("receipt", function (receipt) {
            closeToast();

            newToast(
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending",
              toastTypes.SUCCESS
            );
          })
          .on("error", function (error, receipt) {});

        setApprovalGiven(true);
      }
    }

    if (pbText === "Extend") {
      if (approvalGiven) {
        await gameInstance.methods
          .extendGame(parseInt(gameId.toString()))
          .send({ from: wallet?.account })
          .on("transactionHash", function (hash) {
            newToast(
              "Extend Bonsai Game #" + gameId.toString(),
              toastTypes.CONFIRMING,
              3000000
            );
            saveTransaction(
              wallet?.account,
              hash,
              "Extend Bonsai Game #" + gameId.toString()
            );
          })
          .on("confirmation", function (confirmationNumber, receipt) {})
          .on("receipt", function (receipt) {
            closeToast();
            newToast("Extend Bonsai Game #" + gameId.toString(), toastTypes.SUCCESS);
            forceReloadGameData();
          })
          .on("error", function (error, receipt) {});

        open = false;
      } else {
        await tokenInstance.methods
          .approve(addresses.BONSAI_GAME_CONTRACT, bet.toString())
          .send({ from: wallet?.account })
          .on("transactionHash", function (hash) {
            newToast(
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending",

              toastTypes.CONFIRMING,
              3000000
            );
            saveTransaction(
              wallet?.account,
              hash,
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending"
            );
          })
          .on("confirmation", function (confirmationNumber, receipt) {})
          .on("receipt", function (receipt) {
            closeToast();

            newToast(
              "Approve " + tokenAddressToSymbol(tokenAddress) + " spending",
              toastTypes.SUCCESS
            );
          })
          .on("error", function (error, receipt) {});

        setApprovalGiven(true);
      }
    }

    if (pbText === "Claim") {
      await gameInstance.methods
        .extendGame(gameId.toString())
        .send({ from: wallet?.account })
        .on("transactionHash", function (hash) {
          newToast(
            "Claim Bonsai Game #" + gameId.toString(),
            toastTypes.CONFIRMING,
            3000000
          );
          saveTransaction(
            wallet?.account,
            hash,
            "Claim Bonsai Game #" + gameId.toString()
          );
        })
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          // receipt example
          closeToast();

          newToast("Claim Bonsai Game #" + gameId.toString(), toastTypes.SUCCESS);
          forceReloadGameData();
        })
        .on("error", function (error, receipt) {});

      ended = true;
    }
  };

  return (
    <GameCardBase>
      <VStack
        onClick={() => {
          openSlip();
        }}
        alignItems={"left"}
        minW={"100%"}
        spacing={0}
      >
        <HStack minW={"100%"}>
          <Box pl={2} pr={2} bg="whiteAlpha.100" rounded={8}>
            <Text>#{gameId.toString()}</Text>
          </Box>

          <Boosted boosted={boosted} ultraBoosted={ultraBoosted} />
          <SlipButton />
          <Spacer />
          {deadLineBlocksRemaining && (
            <GameCountdown
              open={open}
              started={started}
              ended={ended || (started && deadLineBlocksRemaining < 0)}
              cancelled={cancelled}
              deadLineBlockUnix={deadLineBlockUnix}
            />
          )}
        </HStack>
        <Pot pot={pot} tokenAddress={tokenAddress} />
      </VStack>

      {pbText && wallet && <PlayButton text={pbText} onClick={playButtonOnClick} />}
    </GameCardBase>
  );
};
