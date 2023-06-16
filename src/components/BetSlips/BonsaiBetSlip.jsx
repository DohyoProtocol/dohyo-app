import {
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import barcode from "../../assets/barcode.png";
import Countdown, { zeroPad } from "react-countdown";
import { useTokensContext } from "../../hooks/useTokens";
import { useEffect, useState } from "react";
import { useWeb3HelperContext } from "../../hooks/useWeb3Helper";
import { convertNumber } from "../../utils/numberConvert";
import { addresses, decimalsToUnits } from "../../assets/constants";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

export const BonsaiBetSlip = ({ slipIsOpen, slipOnClose, gameMeta, gameState }) => {
  const { getTokenName, getTokenPrice, getTokenDecimals } = useTokensContext();
  const {
    gameId = 0,
    tokenAddress = "",
    boosted = false,
    ultraBoosted = false,
    startTime = 0,
    player1 = "",
    player2 = "",
  } = gameMeta;

  const {
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
  } = gameState;

  const {
    currentBlockNumber,
    currentBlockUnix,
    averageBlockTime,
    fromWei,
    web3HelperLoaded,
  } = useWeb3HelperContext();

  const _bet = parseFloat(
    fromWei(bet.toString(), decimalsToUnits(getTokenDecimals(tokenAddress)))
  );

  const _pot = parseFloat(
    fromWei(pot.toString(), decimalsToUnits(getTokenDecimals(tokenAddress)))
  );

  useEffect(async () => {
    if (
      !slipIsOpen ||
      !currentBlockNumber ||
      !currentBlockUnix ||
      !averageBlockTime ||
      !web3HelperLoaded
    )
      return;

    async function getDates() {
      let gameStartedBlockUnix = 1000 * parseInt(startTime.toString());

      setDeadLineBlocksRemaining(
        1000 * parseInt(nextDeadline.toString()) - currentBlockUnix
      );
      setGameStartedBlock(gameStartedBlockUnix || currentBlockUnix);
    }

    let getNextBet = async (ultraBoosted_, bet_, deadLinesMet_) => {
      if (!ultraBoosted_) {
        setNextBet(bet_);
        return;
      }

      let bet = bet_;
      for (let index = 0; index < deadLinesMet_; index++) {
        let newBet = bet * 1.1;
        bet = newBet;
      }

      setNextBet(bet);
    };

    await getDates();
    await getNextBet(ultraBoosted, _bet, deadLinesMet);
    setSlipgameDataLoaded(true);
  }, [slipIsOpen]);

  const [slipgameDataLoaded, setSlipgameDataLoaded] = useState(false);
  const [nextBet, setNextBet] = useState(0);
  const [deadLineBlocksRemaining, setDeadLineBlocksRemaining] = useState(null);
  const [gameStartedBlock, setGameStartedBlock] = useState(null);

  return (
    <>
      <Modal isOpen={slipIsOpen} onClose={slipOnClose}>
        <ModalOverlay />

        <ModalContent
          outline={"1px solid #222"}
          spacing={0}
          bg={"whiteAlpha.900"}
          rounded={0}
          onClick={slipOnClose}
        >
          <ModalBody bg={"white"} p={0} spacing={0} m={0}>
            <HStack p={0} spacing={0} minW={"100%"} bg={"black"}>
              <Text
                overflow={"hidden"}
                whiteSpace={"pre"}
                color={"white"}
                lineHeight={1}
                fontFamily={"VT323"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {
                  "{ * O * } DOHYŌ!!!   { - _ - } ZZZzz zz z...   { * O * } DOHYŌ!!!   { - _ - } ZZZzz zz z..."
                }
              </Text>
            </HStack>
            {slipgameDataLoaded ? (
              <>
                <VStack
                  pt={6}
                  pb={6}
                  mr={6}
                  ml={6}
                  minH={96}
                  spacing={0}
                  alignItems={"flex-start"}
                >
                  <HStack justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      fontFamily={"VT323"}
                      bg={"black"}
                      color={"white"}
                      fontSize={"4xl"}
                      fontWeight={"extrabold"}
                    >
                      {"‎   ‎bet slip #" + gameId}
                    </Text>
                    <HStack p={0} justifyContent={"space-between"} spacing={1}>
                      {cancelled ? (
                        <Text
                          mt={0}
                          width={"100%"}
                          textAlign={"right"}
                          fontFamily={"VT323"}
                          bg={"black"}
                          color={"white"}
                          fontSize={"xl"}
                          fontWeight={"extrabold"}
                        >
                          {cancelled ? "‎   ‎" : ""}
                          cancelled
                        </Text>
                      ) : (
                        <HStack p={0} spacing={1}>
                          <Text
                            mt={0}
                            textAlign={"right"}
                            fontFamily={"VT323"}
                            bg={!started && !ended ? "black" : null}
                            color={!started && !ended ? "white" : "black"}
                            fontSize={"xl"}
                            fontWeight={"extrabold"}
                          >
                            {"‎   ‎" + "open"}
                          </Text>
                          <Text
                            textAlign={"right"}
                            fontFamily={"VT323"}
                            bg={
                              started && !ended && deadLineBlocksRemaining > 0
                                ? "black"
                                : null
                            }
                            color={
                              started && !ended && deadLineBlocksRemaining > 0
                                ? "white"
                                : "black"
                            }
                            fontSize={"xl"}
                            fontWeight={"extrabold"}
                          >
                            {started && !ended && deadLineBlocksRemaining > 0
                              ? "‎   ‎" + "running"
                              : "running"}
                          </Text>
                          <Text
                            textAlign={"right"}
                            fontFamily={"VT323"}
                            bg={
                              ended || (!ended && !open && deadLineBlocksRemaining < 0)
                                ? "black"
                                : null
                            }
                            color={
                              ended || (!ended && !open && deadLineBlocksRemaining < 0)
                                ? "white"
                                : "black"
                            }
                            fontSize={"xl"}
                            fontWeight={"extrabold"}
                          >
                            {ended || (!ended && !open && deadLineBlocksRemaining < 0)
                              ? "‎   ‎" + "ended"
                              : "ended"}
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </HStack>

                  <HStack justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      m={0}
                      mb={-3}
                      fontFamily={"VT323"}
                      fontSize={"xl"}
                      fontWeight={"extrabold"}
                    >
                      {ultraBoosted ? "initial bet" : "bet"}
                    </Text>
                  </HStack>
                  {tokenAddress && (
                    <HStack
                      borderBottom={"2px solid black"}
                      justifyContent={"space-between"}
                      minW={"100%"}
                    >
                      <HStack>
                        <Text
                          fontFamily={"VT323"}
                          fontSize={"xl"}
                          fontWeight={"extrabold"}
                        >
                          {convertNumber(_bet) +
                            " " +
                            getTokenName(tokenAddress) +
                            " @ $" +
                            convertNumber(getTokenPrice(tokenAddress))}
                        </Text>
                      </HStack>
                      <Text fontFamily={"VT323"} fontSize={"xl"} fontWeight={"extrabold"}>
                        {"$" + convertNumber(_bet * getTokenPrice(tokenAddress))}
                      </Text>
                    </HStack>
                  )}
                  {player1 && player2 && (
                    <HStack
                      borderBottom={"2px solid black"}
                      justifyContent={"space-between"}
                      minW={"100%"}
                    >
                      <Text
                        m={1}
                        ml={0}
                        fontFamily={"VT323"}
                        color={"black"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"player 1"}
                      </Text>
                      <Text
                        borderRight={"2px dotted black"}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {player1.substring(0, 8) + "..."}
                      </Text>
                      <Text
                        m={1}
                        ml={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        color={"black"}
                        fontWeight={"extrabold"}
                      >
                        {"player 2"}
                      </Text>
                      <Text fontFamily={"VT323"} fontSize={"xl"} fontWeight={"extrabold"}>
                        {player2.substring(0, 8) + "..."}
                      </Text>
                    </HStack>
                  )}

                  <HStack justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      m={0}
                      mb={-3}
                      fontFamily={"VT323"}
                      fontSize={"xl"}
                      fontWeight={"extrabold"}
                    >
                      {"game mode"}
                    </Text>
                  </HStack>
                  <HStack
                    borderBottom={"2px solid black"}
                    justifyContent={"space-between"}
                    minW={"100%"}
                  >
                    <HStack>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"organic"}
                      </Text>
                      <Stack spacing={0} p={0} h={6} w={6} border={"2px solid black"}>
                        <Text
                          lineHeight={"9px"}
                          fontFamily={"VT323"}
                          fontSize={"5xl"}
                          fontWeight={"extrabold"}
                        >
                          {!boosted && !ultraBoosted ? "x" : ""}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"fertilized"}
                      </Text>
                      <Stack spacing={0} p={0} h={6} w={6} border={"2px solid black"}>
                        <Text
                          lineHeight={"9px"}
                          fontFamily={"VT323"}
                          fontSize={"5xl"}
                          fontWeight={"extrabold"}
                        >
                          {boosted ? "x" : ""}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"hydroponic"}
                      </Text>
                      <Stack spacing={0} p={0} h={6} w={6} border={"2px solid black"}>
                        <Text
                          lineHeight={"9px"}
                          fontFamily={"VT323"}
                          fontSize={"5xl"}
                          fontWeight={"extrabold"}
                        >
                          {ultraBoosted ? "x" : ""}
                        </Text>
                      </Stack>
                    </HStack>
                  </HStack>
                  {ultraBoosted && started && !ended && nextBet && (
                    <>
                      <HStack justifyContent={"space-between"} minW={"100%"}>
                        <Text
                          m={0}
                          mb={-3}
                          fontFamily={"VT323"}
                          fontSize={"xl"}
                          fontWeight={"extrabold"}
                        >
                          {"next bet"}
                        </Text>
                      </HStack>
                      <HStack
                        borderBottom={"2px solid black"}
                        justifyContent={"space-between"}
                        minW={"100%"}
                      >
                        <HStack>
                          <Text
                            fontFamily={"VT323"}
                            fontSize={"xl"}
                            fontWeight={"extrabold"}
                          >
                            {convertNumber(nextBet.toFixed(9)) +
                              " " +
                              getTokenName(tokenAddress) +
                              " @ $" +
                              convertNumber(getTokenPrice(tokenAddress))}
                          </Text>
                        </HStack>
                        <Text
                          fontFamily={"VT323"}
                          fontSize={"xl"}
                          fontWeight={"extrabold"}
                        >
                          {"$" + convertNumber(nextBet * getTokenPrice(tokenAddress))}
                        </Text>
                      </HStack>
                    </>
                  )}

                  <HStack justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      m={0}
                      mb={-3}
                      fontFamily={"VT323"}
                      fontSize={"xl"}
                      fontWeight={"extrabold"}
                    >
                      {"deadline"}
                    </Text>
                  </HStack>
                  {started && !ended && !cancelled && deadLineBlocksRemaining && (
                    <HStack justifyContent={"space-between"} minW={"100%"}>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {nextPlayer === player1 ? "player 1 " : "player 2 "}
                      </Text>
                      <Text fontFamily={"VT323"} fontSize={"xl"} fontWeight={"extrabold"}>
                        {
                          <Countdown
                            date={1000 * parseInt(nextDeadline.toString())}
                            renderer={renderer}
                          />
                        }
                      </Text>
                    </HStack>
                  )}
                  <HStack pt={12} justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      m={0}
                      mb={-3}
                      fontFamily={"VT323"}
                      fontSize={"xl"}
                      fontWeight={"extrabold"}
                    >
                      {"winner"}
                    </Text>
                  </HStack>

                  <HStack
                    borderBottom={"2px solid black"}
                    justifyContent={"space-between"}
                    minW={"100%"}
                  >
                    <HStack>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"player 1"}
                      </Text>
                      <Stack spacing={0} p={0} h={6} w={6} border={"2px solid black"}>
                        <Text
                          color={"black"}
                          lineHeight={"9px"}
                          fontFamily={"VT323"}
                          fontSize={"5xl"}
                          fontWeight={"extrabold"}
                        >
                          {(ended && player1 === winner) ||
                          (!ended &&
                            !open &&
                            !cancelled &&
                            deadLineBlocksRemaining < 0 &&
                            nextPlayer !== player1)
                            ? "x"
                            : ""}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack>
                      <Text
                        m={0}
                        fontFamily={"VT323"}
                        fontSize={"xl"}
                        fontWeight={"extrabold"}
                      >
                        {"player 2"}
                      </Text>
                      <Stack spacing={0} p={0} h={6} w={6} border={"2px solid black"}>
                        <Text
                          color={"black"}
                          lineHeight={"9px"}
                          fontFamily={"VT323"}
                          fontSize={"5xl"}
                          fontWeight={"extrabold"}
                        >
                          {(ended &&
                            player2 === winner &&
                            winner !== addresses.ZERO_ADDRESS) ||
                          (!ended &&
                            !cancelled &&
                            !open &&
                            deadLineBlocksRemaining < 0 &&
                            nextPlayer !== player2)
                            ? "x"
                            : ""}
                        </Text>
                      </Stack>
                    </HStack>
                  </HStack>

                  <HStack justifyContent={"space-between"} minW={"100%"}>
                    <Text
                      m={0}
                      mb={-3}
                      fontFamily={"VT323"}
                      fontSize={"xl"}
                      fontWeight={"extrabold"}
                    >
                      {"pot"}
                    </Text>
                  </HStack>
                  <HStack
                    borderBottom={"2px solid black"}
                    justifyContent={"space-between"}
                    minW={"100%"}
                  >
                    <HStack>
                      <Text fontFamily={"VT323"} fontSize={"xl"} fontWeight={"extrabold"}>
                        {convertNumber(_pot) +
                          " " +
                          getTokenName(tokenAddress) +
                          " @ $" +
                          convertNumber(getTokenPrice(tokenAddress))}
                      </Text>
                    </HStack>
                    <Text fontFamily={"VT323"} fontSize={"xl"} fontWeight={"extrabold"}>
                      {"$" + convertNumber(_pot * getTokenPrice(tokenAddress))}
                    </Text>
                  </HStack>
                </VStack>

                <HStack justifyContent={"center"}>
                  <Text
                    textAlign={"center"}
                    fontFamily={"VT323"}
                    fontSize={"xl"}
                    fontWeight={"extrabold"}
                  >
                    {new Date(gameStartedBlock).toUTCString()}
                  </Text>
                </HStack>
              </>
            ) : (
              <VStack
                pt={6}
                pb={6}
                mr={6}
                ml={6}
                minH={96}
                spacing={0}
                alignItems={"flex-start"}
              >
                <Spinner colorScheme={"black"} />
              </VStack>
            )}
            <VStack maxH={"80px"} bg={"whiteAlpha.900"}>
              <Image boxSize={"78%"} src={barcode} />
            </VStack>
            <HStack
              alignSelf={"flex-end"}
              p={0}
              m={0}
              bottom={0}
              spacing={0}
              mr={12}
              minW={"100%"}
              bg={"black"}
            >
              <Text
                m={0}
                overflow={"hidden"}
                whiteSpace={"pre"}
                color={"white"}
                lineHeight={1}
                fontFamily={"VT323"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {
                  "YŌ!!!   { - _ - } ZZZzz zz z...   { * O * } DOHYŌ!!!   { - _ - } ZZZzz zz z..."
                }
              </Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

1684462445;
1684991023407;
