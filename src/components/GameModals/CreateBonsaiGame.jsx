import {
  HStack,
  Spacer,
  Text,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Switch,
  Input,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { SupportedTokensDropdown } from "../../components/Dropdowns/SupportedTokensDropdown";
import { useToastHook } from "../../hooks/useToast";
import {
  addresses,
  toastTypes,
  colors,
  tokenAddressToSymbol,
  tokenAddressToUnits,
  tokenNameToAddress,
} from "../../assets/constants";
import { useWeb3HelperContext } from "../../hooks/useWeb3Helper";
import { useUserContext } from "../../hooks/useUser";
import { useTokensContext } from "../../hooks/useTokens";
import { useGameDataContext } from "../../hooks/useGameData";
import { saveTransaction } from "../../utils/transactionHistory";

const CreateNormalGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={"Players deposit bet amount once at game start."}
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

const CreateBoostedGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={"Players deposit bet amount once at game start and everytime they extend."}
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

const CreateUltraBoostedGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={
          "Players deposit bet amount once at gamestart and everytime they extend. Additionally, for each extension, the bet amount gets increased by 10%, and next deadline gets reduced by 1 hour."
        }
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

const CreateWithPlayer2GameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={
          "Only this person will be able to join the game. If left empty, anyone can join the game."
        }
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

export const CreateBonsaiGame = ({ createIsOpen, createOnOpen, createOnClose }) => {
  //HOOKENTRY CREATE_BONSAI_GAME
  const { newToast, closeToast } = useToastHook();

  const { wallet } = useUserContext();
  const { web3HelperLoaded, getContractInstance, toWei, fromWei } =
    useWeb3HelperContext();
  const { tokensLoaded, getTokenPrice, getTokenBalance, getTokenAllowance } =
    useTokensContext();
  const { forceReloadGameData } = useGameDataContext();
  const [approvalGiven, setApprovalGiven] = useState(false);
  const [token, setToken] = useState("DOHYO");
  const [betAmount, setBetAmount] = useState("");
  const [boosted, setBoosted] = useState(false);
  const [ultraBoosted, setUltraBoosted] = useState(false);
  const [choosePlayer2, setChoosePlayer2] = useState(false);
  const [player2Address, setPlayer2Address] = useState("");

  useEffect(() => {
    if (
      !web3HelperLoaded ||
      !tokensLoaded ||
      !betAmount ||
      isNaN(betAmount) ||
      parseFloat(betAmount) <= 0
    )
      return;

    const checkApproval = async () => {
      try {
        setApprovalGiven(false);

        let tokenAllowance = fromWei(
          getTokenAllowance(tokenNameToAddress(token), addresses.BONSAI_GAME_CONTRACT),
          tokenAddressToUnits(tokenNameToAddress(token))
        );

        let tokenBalance = fromWei(
          getTokenBalance(tokenNameToAddress(token)),
          tokenAddressToUnits(tokenNameToAddress(token))
        );

        let betTokensAmount =
          parseFloat(betAmount) / getTokenPrice(tokenNameToAddress(token));

        let betTokensWeiAmount = toWei(
          betTokensAmount.toFixed(6).toString(),
          tokenAddressToUnits(tokenNameToAddress(token))
        );

        if (betTokensAmount <= tokenAllowance && betTokensAmount <= tokenBalance) {
          setApprovalGiven(true);
        }
      } catch (error) {}
    };
    checkApproval();
  }, [web3HelperLoaded, tokensLoaded, token, betAmount]);

  const createGame = async () => {
    if (!web3HelperLoaded || !tokensLoaded) return;

    let betTokensAmount =
      parseFloat(betAmount) / getTokenPrice(tokenNameToAddress(token));

    let betTokensWeiAmount = toWei(
      betTokensAmount.toFixed(6).toString(),
      tokenAddressToUnits(tokenNameToAddress(token))
    );

    if (!wallet) {
      newToast("Please connect your wallet", toastTypes.ERROR);
      return;
    }
    if (!token) {
      newToast("Please select a token", toastTypes.ERROR);
      return;
    }
    if (!betAmount) {
      newToast("Please enter a bet amount", toastTypes.ERROR);
      return;
    }
    if (isNaN(betAmount)) {
      newToast("Bet amount must be a number", toastTypes.ERROR);
      return;
    }
    if (parseFloat(betAmount) <= 0) {
      newToast("Bet amount must be greater than 0", toastTypes.ERROR);
      return;
    }

    let tokenBalance = getTokenBalance(tokenNameToAddress(token));

    if (
      parseFloat(
        fromWei(tokenBalance.toString(), tokenAddressToUnits(tokenNameToAddress(token)))
      ) < betTokensAmount
    ) {
      newToast("Insufficient token balance", toastTypes.ERROR);
      return;
    }
    if (approvalGiven) {
      let gameInstance = await getContractInstance("bonsai");
      await gameInstance.methods
        .createGame(
          tokenNameToAddress(token),
          betTokensWeiAmount,
          boosted,
          ultraBoosted,
          player2Address || addresses.ZERO_ADDRESS
        )
        .send({ from: wallet?.account })
        .on("transactionHash", function (hash) {
          newToast("Create Bonsai game.", toastTypes.CONFIRMING, 3000000);
          saveTransaction(wallet?.account, hash, "Create Bonsai game.");
        })
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          closeToast();

          newToast("Create Bonsai game.", toastTypes.SUCCESS);

          forceReloadGameData();
        })
        .on("error", function (error, receipt) {});
    } else {
      let tokenInstance = await getContractInstance(tokenNameToAddress(token));
      await tokenInstance.methods
        .approve(addresses.BONSAI_GAME_CONTRACT, betTokensWeiAmount.toString())
        .send({ from: wallet?.account })
        .on("transactionHash", function (hash) {
          newToast("Approve " + token + " spending", toastTypes.CONFIRMING, 3000000);
          saveTransaction(wallet?.account, hash, "Approve " + token + " spending");
        })
        .on("confirmation", function (confirmationNumber, receipt) {})
        .on("receipt", function (receipt) {
          // receipt example
          closeToast();

          newToast("Approve " + token + " spending", toastTypes.SUCCESS);
        })
        .on("error", function (error, receipt) {});

      setApprovalGiven(true);
    }
  };

  return (
    <>
      <Modal isOpen={createIsOpen} onClose={createOnClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>New Bōnsai Game</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"red"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack ml={3} pr={3} minW={"100%"} alignItems={"flex-start"}>
              <Stack width={"100%"}>
                <Text ml={-3}>Game Mode</Text>{" "}
              </Stack>
              <HStack minW={"100%"}>
                <Text>Organic</Text>
                <CreateNormalGameTip />
                <Spacer />
                <Switch
                  isChecked={!boosted && !ultraBoosted}
                  onChange={() => {
                    if (ultraBoosted) setUltraBoosted(false);
                    if (boosted) setBoosted(false);
                  }}
                />
              </HStack>
              <HStack minW={"100%"}>
                <Text>Fertilised</Text>
                <CreateBoostedGameTip />
                <Spacer />
                <Switch
                  isChecked={boosted}
                  onChange={() => {
                    if (ultraBoosted) setUltraBoosted(false);
                    setBoosted(!boosted);
                  }}
                />
              </HStack>
              <HStack minW={"100%"}>
                <Text>Hydroponic</Text>
                <CreateUltraBoostedGameTip />
                <Spacer />
                <Switch
                  isChecked={ultraBoosted}
                  onChange={() => {
                    if (boosted) setBoosted(false);
                    setUltraBoosted(!ultraBoosted);
                  }}
                />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>My bet</Text>
              </Stack>

              <HStack minW={"100%"}>
                <Text>Token</Text>
                <Spacer />
                <SupportedTokensDropdown setter={setToken} getter={token} />
              </HStack>
              <HStack minW={"100%"}>
                <Text>$ Bet Amount</Text>
                <Spacer />
                <Input
                  placeholder="$0"
                  textAlign={"right"}
                  size={"sm"}
                  rounded={6}
                  maxW={"25%"}
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>Players</Text>{" "}
              </Stack>
              <HStack minW={"100%"}>
                <Text>Choose player 2</Text>
                <CreateWithPlayer2GameTip />
                <Spacer />
                <Switch
                  onChange={() => {
                    setChoosePlayer2(!choosePlayer2);
                  }}
                />
              </HStack>
              {choosePlayer2 && (
                <HStack minW={"100%"}>
                  <Text>Player 2 address</Text>
                  <Spacer />
                  <Input
                    placeholder="0x..."
                    textAlign={"right"}
                    size={"sm"}
                    rounded={6}
                    maxW={"50%"}
                    onChange={(e) => {
                      setPlayer2Address(e.target.value);
                    }}
                    value={player2Address}
                  />
                </HStack>
              )}
            </VStack>
            <Stack mt={3} width={"100%"}>
              <Button
                mt={2}
                width={"100%"}
                variant={"outline"}
                size={"md"}
                _hover={{ bg: colors.WHITE100 }}
                alignSelf={"center"}
                onClick={() => {
                  createGame();
                }}
              >
                {approvalGiven ? "Create Game" : "Approve " + token + " spending"}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
