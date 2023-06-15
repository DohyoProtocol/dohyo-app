import {
  HStack,
  Spacer,
  Text,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMobileHook } from "../../hooks/useMobile";
import { useUserContext } from "../../hooks/useUser";
import { CopyIcon, ExternalLinkIcon, RepeatIcon, WarningIcon } from "@chakra-ui/icons";
import { addresses, colors, toastTypes, urls } from "../../assets/constants";
import { useToastHook } from "../../hooks/useToast";
import { useTokensContext } from "../../hooks/useTokens";
import { useWeb3HelperContext } from "../../hooks/useWeb3Helper";
import {
  FaExternalLinkAlt,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { convertNumber } from "../../utils/numberConvert";
import { clearTransactions, getTransactions } from "../../utils/transactionHistory";
import { useRPCContext } from "../../hooks/useRPC";

export const MyWallet = ({
  myWalletSwitch,
  setMyWalletSwitch,
  isOpen,
  onOpen,
  onClose,
}) => {
  const mobile = useMobileHook();
  const { wallet, endSession } = useUserContext();
  const { onCopy, value, setValue, hasCopied } = useClipboard(wallet?.account);
  const { newToast } = useToastHook();
  const { fromWei, web3HelperLoaded, getContractInstance } = useWeb3HelperContext();
  const { randomWeb3Provider } = useRPCContext();
  const { tokensLoaded, getTokenBalance } = useTokensContext();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  useEffect(() => {
    if (!web3HelperLoaded || !wallet) return;

    const getGameCount = async () => {
      try {
        const dohyoInstance = await getContractInstance("dohyocontract");
        const _playerInfo = await dohyoInstance.methods.getPlayer(wallet?.account).call();
        setPlayerInfo(_playerInfo);
      } catch (error) {}
    };
    getGameCount();
  }, [web3HelperLoaded, wallet]);

  useEffect(() => {
    if (!web3HelperLoaded || !randomWeb3Provider || !wallet) return;

    const loadTransactionHistory = async () => {
      try {
        setRefreshTransactions(false);

        const transactions = getTransactions(wallet?.account);

        let web3 = randomWeb3Provider;

        let _transactions = [];
        for (let i = 0; i < transactions.length; i++) {
          const transaction = transactions[i];
          const transactionReceipt = await web3.eth
            .getTransactionReceipt(transaction.txHash)
            .then((n) => {
              return n;
            })
            .catch(async () => {});

          transaction.txStatus = transactionReceipt?.status || false;

          _transactions.push(transaction);
        }
        setTransactions(_transactions);
      } catch (error) {}
    };
    loadTransactionHistory();
  }, [web3HelperLoaded, wallet, randomWeb3Provider, refreshTransactions]);

  const Transaction = ({ transaction }) => {
    const { txHash, txData, txStatus } = transaction;

    return (
      <HStack
        onClick={() => {
          window.open(urls.ARBISCAN_TX + txHash, "_blank");
        }}
        _hover={{ cursor: "pointer" }}
        minW={"100%"}
        color={txStatus ? "green.200" : "red.200"}
      >
        {txStatus ? <FaRegCheckCircle /> : <FaRegTimesCircle />}
        <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
          {txData}
        </Text>
        <Spacer />
        <ExternalLinkIcon />
      </HStack>
    );
  };

  return (
    <>
      <Modal size={mobile ? "xs" : "sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH={"50vh"} pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>Your Wallet</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"blue"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack width={"100%"}>
              <ButtonGroup mb={6} isAttached>
                <Button
                  minW={32}
                  bg={myWalletSwitch === 1 ? "whiteAlpha.100" : "red.400"}
                  rounded={20}
                  _hover={{ bg: myWalletSwitch === 1 ? "whiteAlpha.200" : "red.300" }}
                  size={"sm"}
                  onClick={(event) => {
                    setMyWalletSwitch(0);
                  }}
                >
                  <Text color={myWalletSwitch === 1 ? "white" : "black"}>Wallet</Text>
                </Button>
                <Button
                  minW={32}
                  bg={myWalletSwitch === 0 ? "whiteAlpha.100" : "red.400"}
                  rounded={20}
                  size={"sm"}
                  _hover={{ bg: myWalletSwitch === 0 ? "whiteAlpha.200" : "red.300" }}
                  onClick={(event) => {
                    setMyWalletSwitch(1);
                  }}
                >
                  <Text color={myWalletSwitch === 0 ? "white" : "black"}>
                    Transactions
                  </Text>
                </Button>
              </ButtonGroup>
              {myWalletSwitch === 0 ? (
                <>
                  <Text
                    minW={"100%"}
                    textAlign={"left"}
                    fontSize={"xs"}
                    fontWeight={"bold"}
                  >
                    Your Address
                  </Text>
                  <HStack maxW={"100%"} bg={"whiteAlpha.100"} p={3} rounded={6}>
                    <HStack maxW={"100%"} overflow={"hidden"}>
                      <Text textAlign={"left"} color={"white"}>
                        {wallet?.account}
                      </Text>
                    </HStack>
                    <Spacer />
                    <CopyIcon
                      _hover={{ color: "whiteAlpha.600" }}
                      onClick={(event) => {
                        onCopy();
                        newToast("Address copied to clipboard.", toastTypes.SUCCESS);
                      }}
                    />
                  </HStack>
                  <Spacer />
                  <Spacer />
                  <HStack minW={"100%"}>
                    <Text
                      fontSize={"sm"}
                      textAlign={"left"}
                      _hover={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => {
                        window.open(urls.ARBISCAN_ADDRESS + wallet?.account, "_blank");
                      }}
                    >
                      View wallet on Arbiscan
                    </Text>
                    <FaExternalLinkAlt size={"12"} />
                  </HStack>

                  {tokensLoaded &&
                    fromWei(getTokenBalance(addresses.NATIVE_ADDRESS)?.toString()) <=
                      0.001 && (
                      <>
                        <Spacer />
                        <Spacer />
                        <HStack
                          pt={6}
                          minW={"100%"}
                          bg={"whiteAlpha.100"}
                          p={3}
                          rounded={6}
                        >
                          <HStack>
                            <WarningIcon
                              color={"yellow.200"}
                              m={1}
                              alignSelf={"flex-start"}
                            />
                            <VStack>
                              <Text
                                color={"yellow.200"}
                                minW={"100%"}
                                fontWeight={"bold"}
                                textAlign={"left"}
                              >
                                ETH Balance Low
                              </Text>
                              <Text color={"yellow.200"} minW={"100%"} textAlign={"left"}>
                                You need ETH for transaction fees.
                              </Text>
                            </VStack>
                          </HStack>
                        </HStack>
                      </>
                    )}
                  <Spacer />
                  <Spacer />
                  <VStack minW={"100%"}>
                    <HStack minW={"100%"} justifyContent={"space-between"}>
                      <Text>ETH Balance</Text>
                      <Text>
                        {convertNumber(
                          fromWei(getTokenBalance(addresses.NATIVE_ADDRESS)?.toString()),
                          6
                        )}
                      </Text>
                    </HStack>
                    <HStack minW={"100%"} justifyContent={"space-between"}>
                      <Text>USDC Balance</Text>
                      <Text>
                        {convertNumber(
                          fromWei(
                            getTokenBalance(addresses.USDC_TOKEN)?.toString(),
                            "mwei"
                          ),
                          2
                        )}
                      </Text>
                    </HStack>{" "}
                    <HStack minW={"100%"} justifyContent={"space-between"}>
                      <Text>DOHYO Balance</Text>
                      <Text>
                        {convertNumber(
                          fromWei(getTokenBalance(addresses.DOHYO_TOKEN)?.toString()),
                          6
                        )}
                      </Text>
                    </HStack>
                    {playerInfo && (
                      <>
                        <HStack minW={"100%"} justifyContent={"space-between"}>
                          <Text>Games Started</Text>
                          <Text>{playerInfo["3"]}</Text>
                        </HStack>
                        <HStack minW={"100%"} justifyContent={"space-between"}>
                          <Text>Games Won</Text>
                          <Text>{playerInfo["4"]}</Text>
                        </HStack>
                        <HStack minW={"100%"} justifyContent={"space-between"}>
                          <Text>Active Since</Text>
                          <Text>
                            {playerInfo["7"] !== "0"
                              ? new Date(
                                  parseInt(playerInfo["7"]) * 1000
                                )?.toLocaleDateString("en-GB")
                              : "-"}
                          </Text>
                        </HStack>
                      </>
                    )}
                  </VStack>
                  <Spacer />
                  <Spacer />
                  <HStack minW={"100%"}>
                    <Button
                      onClick={(event) => {
                        endSession();
                      }}
                      minW={"100%"}
                    >
                      <Text color={"red"} fontSize={"sm"} fontWeight={"bold"}>
                        Disconnect Wallet
                      </Text>
                    </Button>
                  </HStack>
                </>
              ) : (
                <VStack spacing={0} minW={"100%"}>
                  <HStack
                    alignItems={"flex-start"}
                    spacing={2}
                    justifyContent={"space-between"}
                    minW={"100%"}
                    mb={3}
                  >
                    <Text textAlign={"left"} fontSize={"xs"} fontWeight={"bold"}>
                      Transaction History
                    </Text>
                    <Spacer />
                    <Button
                      top={-1}
                      size={"xs"}
                      rightIcon={<RepeatIcon />}
                      bg={colors.WHITE100}
                      _hover={{ bg: colors.WHITE300 }}
                      onClick={(event) => {
                        setRefreshTransactions(true);
                      }}
                    >
                      Refresh
                    </Button>
                    <Button
                      top={-1}
                      size={"xs"}
                      rightIcon={<FaTrash />}
                      bg={colors.WHITE100}
                      _hover={{ bg: colors.WHITE300 }}
                      onClick={(event) => {
                        clearTransactions(wallet?.account);
                        setRefreshTransactions(true);
                      }}
                    >
                      Clear
                    </Button>
                  </HStack>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <Transaction key={index} transaction={transaction} />
                    ))
                  ) : (
                    <Text>No transactions yet.</Text>
                  )}
                </VStack>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
