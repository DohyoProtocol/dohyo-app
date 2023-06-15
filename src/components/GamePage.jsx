import {
  Box,
  Container,
  HStack,
  Image,
  Text,
  Flex,
  VStack,
  Button,
  Spacer,
  Icon,
  Tooltip,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { FaPlus, FaQuestionCircle } from "react-icons/fa";
import { ListFilterDropdown } from "./Dropdowns/ListFilterDropdown";
import { ListSortDropdown } from "./Dropdowns/ListSortDropdown";
import { useMobileHook } from "../hooks/useMobile";
import { useEffect, useState } from "react";
import { useGameDataContext } from "../hooks/useGameData";
import { useUserContext } from "../hooks/useUser";
import { useWeb3HelperContext } from "../hooks/useWeb3Helper";
import { convertNumber } from "../utils/numberConvert";
import { useFilterContext } from "../hooks/useFilter";
import { WarningIcon } from "@chakra-ui/icons";

export const GamePage = ({
  gameName,
  gameSlogan,
  gameDescription,
  headerBg,
  headerImage,
  GameCard,
  CreateGame,
  BetSlip,
  commingSoon,
}) => {
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onClose: createOnClose,
  } = useDisclosure();
  const {
    isOpen: slipIsOpen,
    onOpen: slipOnOpen,
    onClose: slipOnClose,
  } = useDisclosure();
  const mobile = useMobileHook();
  const [selectedSlipIndex, setSelectedSlipIndex] = useState(0);

  const { gameData, gameDataLoading, gameDataLoaded, gameDataError } =
    useGameDataContext();
  const { selectedFilter } = useFilterContext();
  const { wallet } = useUserContext();

  const { currentBlockUnix } = useWeb3HelperContext();

  useEffect(async () => {
    if (!gameDataLoaded) {
      setGameIds([]);
      return;
    }
    if (!gameData) return;

    setRunningGames(
      parseInt(gameData["gameCounter"].toString()) -
        parseInt(gameData["endedGameCounter"].toString())
    );
    setEndedGames(gameData["endedGameCounter"].toString());
    setGameIds(gameData["gameIds"]);
    setVolume(convertNumber(parseFloat(gameData["volume"].toString()), 0));
  }, [gameDataLoaded]);

  const [runningGames, setRunningGames] = useState(0);
  const [endedGames, setEndedGames] = useState(0);
  const [volume, setVolume] = useState(0);
  const [gameIds, setGameIds] = useState([]);

  return (
    <>
      <Container spacing={0} p={0} minW={"100vw"} bg={"#111111"}>
        <HStack
          bgImage={headerBg}
          bgSize={"cover"}
          bgPos={mobile ? "0px 0px" : "0px -50vw"}
          pl={mobile ? 3 : 6}
          pr={mobile ? 3 : 6}
          mt={6}
          ml={"auto"}
          mr={"auto"}
          rounded={12}
          justifyContent={mobile ? "center" : null}
          wrap={"wrap-reverse"}
          w={"90%"}
          minH={"64"}
        >
          <VStack
            w={mobile ? "100%" : null}
            mt={-5}
            mb={mobile ? 6 : null}
            alignItems={mobile ? "center" : "flex-start"}
          >
            <Text m={0} mb={-3} fontWeight={"bold"} color={"white"} fontSize={"5xl"}>
              {gameName}
            </Text>

            <HStack height={"100%"}>
              {!commingSoon ? (
                <>
                  <Text color={"whiteAlpha.900"} fontSize={"md"}>
                    Running: {runningGames}
                  </Text>
                  <Text color={"whiteAlpha.900"} fontSize={"md"}>
                    Finished: {endedGames}
                  </Text>
                  <Text color={"whiteAlpha.900"} fontSize={"md"}>
                    Volume: ${volume}
                  </Text>
                </>
              ) : (
                <Text color={"whiteAlpha.900"} fontSize={"md"}>
                  Coming Soon
                </Text>
              )}
            </HStack>
            <HStack>
              <Text m={0} mt={-1} color={"white"} fontSize={"2xl"}>
                {gameSlogan}
              </Text>

              {gameDescription && (
                <Tooltip shouldWrapChildren label={gameDescription}>
                  <Icon as={FaQuestionCircle} color={"white"} />
                </Tooltip>
              )}
            </HStack>
          </VStack>
          {!mobile && <Spacer />}

          {/* <Box boxSize={"64"} right={0}>
            <Image
              p={mobile ? 10 : null}
              mt={mobile ? 3 : 0}
              src={headerImage}
              alt="Dan Abramov"
            />
          </Box> */}
        </HStack>
        <VStack bg={"#111111"} minW={"100vw"}>
          <HStack
            p={3}
            mt={3}
            w={"90%"}
            mr={"auto"}
            bgImage={headerBg}
            bgSize={"cover"}
            bgPos={mobile ? "0px 0px" : "0px 0px"}
            bg={"white"}
            rounded={12}
            opacity={"0.75"}
            ml={"auto"}
            justifyContent={mobile ? "center" : "center"}
          >
            <WarningIcon color={"red"} />
            <Text
              m={0}
              textAlign={"center"}
              color={"red"}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              Alpha version.
            </Text>
            <Text
              m={0}
              textAlign={"center"}
              color={"red"}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              Don't play with funds you can't afford to lose.
            </Text>
            <WarningIcon color={"red"} />
          </HStack>
          <HStack
            pt={6}
            pb={3}
            w={"90%"}
            mr={"auto"}
            ml={"auto"}
            justifyContent={mobile ? "center" : "flex-start"}
          >
            <HStack
              alignItems={"center"}
              spacing={mobile ? null : 3}
              wrap={"wrap"}
              minW={mobile ? null : "100%"}
              maxW={mobile ? "90%" : null}
            >
              <HStack
                justifyContent={mobile ? "space-between" : null}
                pt={mobile ? 3 : 0}
                spacing={1}
                minW={mobile ? "100%" : null}
              >
                {mobile && (
                  <Text fontWeight={"extrabold"} color={"whiteAlpha.600"}>
                    Game
                  </Text>
                )}
                <Button
                  size={"sm"}
                  color={"whiteAlpha.600"}
                  bg={"whiteAlpha.100"}
                  _hover={{ bg: "whiteAlpha.300" }}
                  leftIcon={<FaPlus />}
                  disabled={commingSoon && gameName !== "KAMI"}
                  onClick={createOnOpen}
                >
                  Create
                </Button>
              </HStack>
              <HStack
                justifyContent={mobile ? "space-between" : null}
                pt={mobile ? 3 : 0}
                spacing={1}
                minW={mobile ? "100%" : null}
              >
                <Text fontWeight={"extrabold"} color={"whiteAlpha.600"}>
                  Filter by
                </Text>
                <ListFilterDropdown
                  disabled={commingSoon}
                  onlyMyCommunitiesInMenu={gameName === "BŌNSAI" ? false : true}
                  onlyMyGamesInMenu={true}
                  includeOpenInMenu={
                    gameName === "LUFFY" ||
                    gameName === "KAMI" ||
                    gameName === "BŌNSAI" ||
                    gameName === "SUMŌ"
                  }
                  includeCancelledInMenu={gameName === "BŌNSAI"}
                />
              </HStack>
              <HStack
                justifyContent={mobile ? "space-between" : null}
                pt={mobile ? 3 : 0}
                spacing={1}
                minW={mobile ? "100%" : null}
              >
                <Text fontWeight={"extrabold"} color={"whiteAlpha.600"}>
                  Sort age
                </Text>
                <ListSortDropdown disabled={commingSoon} />
              </HStack>
            </HStack>
          </HStack>
          <Box maxW={"90%"} mr={"auto"} ml={"auto"}>
            {!commingSoon && (
              <Flex
                ml={-5}
                mr={-5}
                mb={12}
                minW={"100%"}
                minH={"50vh"}
                flexWrap={"wrap"}
                justifyContent={"space-around"}
                color="white"
              >
                {gameDataLoaded &&
                  gameIds.map((gameId, index) => {
                    return filterGames(
                      gameName,
                      gameId,
                      index,
                      gameData,
                      selectedFilter,
                      wallet,
                      currentBlockUnix
                    ) === true ? (
                      <GameCard
                        key={index}
                        openSlip={() => {
                          setSelectedSlipIndex(index);
                          slipOnOpen();
                        }}
                        cardMeta={gameData["gameMetas"][index]}
                        cardState={gameData["gameStates"][index]}
                      />
                    ) : null;
                  })}

                {gameDataError && <Text>Something went wrong!</Text>}
                {(!gameDataLoaded || gameDataLoading) && <Spinner />}
              </Flex>
            )}
          </Box>
        </VStack>
      </Container>
      {gameData && (
        <BetSlip
          slipIsOpen={slipIsOpen}
          slipOnOpen={slipOnOpen}
          slipOnClose={slipOnClose}
          gameMeta={gameData["gameMetas"][selectedSlipIndex]}
          gameState={gameData["gameStates"][selectedSlipIndex]}
        />
      )}
      <CreateGame
        createIsOpen={createIsOpen}
        createOnOpen={createOnOpen}
        createOnClose={createOnClose}
      />
    </>
  );
};

const filterGames = (
  gameName,
  gameId,
  index,
  gameData,
  selectedFilter,
  wallet,
  currentBlockUnix
) => {
  const gameMeta = gameData["gameMetas"][index];
  const gameState = gameData["gameStates"][index];

  let deadlineUnix = 1000 * parseInt(gameState.nextDeadline.toString());

  let started = gameState.started;
  let ended = gameState.ended;

  if (gameName === "BŌNSAI") {
    if (
      !selectedFilter.includeOpen &&
      started === false &&
      gameState.cancelled === false
    ) {
      return false;
    }
    if (!selectedFilter.includeCancelled && gameState.cancelled === true) {
      return false;
    }

    if (
      !selectedFilter.includeRunning &&
      started === true &&
      ended === false &&
      currentBlockUnix < deadlineUnix
    ) {
      return false;
    }

    if (
      !selectedFilter.includeEnded &&
      ((started === true && ended === true) ||
        (started === true && ended === false && currentBlockUnix > deadlineUnix))
    ) {
      return false;
    }
  }

  if (selectedFilter.onlyMyGames && !gameState.gamePlayers.includes(wallet?.account)) {
    return false;
  }

  return true;
};
