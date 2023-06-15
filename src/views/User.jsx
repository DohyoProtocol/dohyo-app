//EXTENSION
import {
  Center,
  Container,
  Text,
  Box,
  HStack,
  Stack,
  Flex,
  VStack,
  Spacer,
} from "@chakra-ui/layout";

import Chance from "chance";

const chance = new Chance(); // instantiate

//COMPONENT
import { JazziconIcon } from "../components/Jazzicon";
import gradient from "../assets/gradient.png";

//UTILS
import { LogoutButton } from "../components/LogoutButton";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUser";
import { useLocation } from "react-router-dom";

import { useMobileHook } from "../hooks/useMobile";
import { ListFilterDropdown } from "../components/Dropdowns/ListFilterDropdown";
import { ListSortDropdown } from "../components/Dropdowns/ListSortDropdown";
import { SubNavGamesDropdown } from "../components/Dropdowns/SubNavGamesDropdown";
import { BonsaiGameCard } from "../components/GameCards/BonsaiGameCard";
import { KamiGameCard } from "../components/GameCards/KamiGameCard";
import { KatanaGameCard } from "../components/GameCards/KatanaGameCard";
import { LuffyGameCard } from "../components/GameCards/LuffyGameCard";
import { ShimoGameCard } from "../components/GameCards/ShimoGameCard";
import { SumoGameCard } from "../components/GameCards/SumoGameCard";
import { ChangeNameButton } from "../components/ChangeNameButton";
import { useFilterContext } from "../hooks/useFilter";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import { useGameDataContext } from "../hooks/useGameData";
import { useRPCContext } from "../hooks/useRPC";
import { useWeb3HelperContext } from "../hooks/useWeb3Helper";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const gamesNames = ["Bōnsai", "Shimō", "Katana", "Kami", "Sumō", "Luffy"];

export const User = () => {
  const { selectedGame } = useFilterContext();

  const {
    isOpen: slipIsOpen,
    onOpen: slipOnOpen,
    onClose: slipOnClose,
  } = useDisclosure();

  const { wallet } = useUserContext();
  const mobile = useMobileHook();
  const [selectedSlipIndex, setSelectedSlipIndex] = useState(null);

  const { gameData, gameDataLoading, gameDataLoaded, gameDataError } =
    useGameDataContext();

  const location = useLocation();
  const lp = location.pathname;
  const userAddress = lp.replace("/user/", "");

  const GameCards = [
    BonsaiGameCard,
    KamiGameCard,
    KatanaGameCard,
    LuffyGameCard,
    ShimoGameCard,
    SumoGameCard,
  ];

  let SelectedGameCard = GameCards[selectedGame];
  const BetSlips = [BonsaiBetSlip];

  let SelectedBetSlip = BetSlips[selectedGame];
  const { userWeb3Provider } = useUserContext();
  const { randomWeb3Provider } = useRPCContext();
  const { web3HelperLoaded, currentChainId } = useWeb3HelperContext();

  const [web3Provider, setWeb3Provider] = useState(null);
  useEffect(async () => {
    if (!web3HelperLoaded) return;
    if (userWeb3Provider || randomWeb3Provider) {
      setWeb3Provider(randomWeb3Provider);
      if (userWeb3Provider) {
        if (currentChainId === 42161) {
          setWeb3Provider(userWeb3Provider);
        }
      }
    }
  }, [userWeb3Provider, randomWeb3Provider, web3HelperLoaded]);

  return (
    <>
      <Container spacing={0} p={0} minW={"100vw"}>
        <HStack
          bgImage={gradient}
          bgSize={"cover"}
          bgPos={mobile ? "0px 0px" : "0px -50vw"}
          pl={mobile ? 3 : 6}
          pr={mobile ? 3 : 6}
          mt={6}
          mr={"auto"}
          ml={"auto"}
          rounded={6}
          justifyContent={mobile ? "center" : null}
          wrap={"wrap-reverse"}
          w={"90%"}
        >
          <VStack
            w={mobile ? "100%" : null}
            mt={-5}
            mb={mobile ? 6 : null}
            alignItems={mobile ? "center" : "flex-start"}
          >
            <Text m={0} fontWeight={"bold"} color={"white"} fontSize={"5xl"}>
              {"yobidashi"}
            </Text>

            <HStack>
              <Text m={0} color={"white"} fontSize={mobile ? "md" : "2xl"}>
                {mobile ? userAddress.slice(0, 12) + "..." : userAddress}
              </Text>
            </HStack>
            <Stack
              spacing={mobile ? 2 : 6}
              mb={mobile ? 0 : 2}
              alignItems={mobile ? "center" : "flex-end"}
              wrap={mobile ? "wrap" : null}
              direction={mobile ? "column" : "row"}
            >
              <HStack height={"100%"}>
                <Text color={"whiteAlpha.900"} fontSize={"md"}>
                  Games: {chance.integer({ min: 33, max: 100 })}
                </Text>
                <Text color={"whiteAlpha.900"} fontSize={"md"}>
                  Wins: {chance.integer({ min: 10, max: 33 })}
                </Text>
                <Text color={"whiteAlpha.900"} fontSize={"md"}>
                  Volume: ${chance.integer({ min: -100, max: 500 })}
                </Text>
              </HStack>
              <Text color={"white"} fontSize={"md"}>
                {"Joined on : " +
                  new Date(chance.date()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </Text>
            </Stack>
            <HStack spacing={6}>
              <HStack pt={mobile ? 3 : 6}>{wallet && <LogoutButton />}</HStack>
              <HStack pt={mobile ? 3 : 6}>{wallet && <ChangeNameButton />}</HStack>
            </HStack>
          </VStack>
          {!mobile && <Spacer />}

          <Box
            boxSize={"64"}
            right={mobile ? null : 0}
            p={6}
            pr={mobile ? 6 : 0}
            pl={mobile ? 6 : 12}
          >
            <Box bg={"blackAlpha.900"} rounded={400} p={10} right={0}>
              <Center>
                <JazziconIcon address={userAddress} />
              </Center>
            </Box>
          </Box>
        </HStack>
        <VStack bg={"#111111"} minW={"100vw"}>
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
                <Text fontWeight={"extrabold"} color={"whiteAlpha.600"}>
                  Game
                </Text>
                <SubNavGamesDropdown />
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
                  includeOpenInMenu={
                    gamesNames[selectedGame] === "Luffy" ||
                    gamesNames[selectedGame] === "Kami" ||
                    gamesNames[selectedGame] === "Bōnsai" ||
                    gamesNames[selectedGame] === "Sumō"
                      ? true
                      : false
                  }
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
                <ListSortDropdown />
              </HStack>
            </HStack>
          </HStack>
          <Box maxW={"90%"} mr={"auto"} ml={"auto"}>
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
                gameData.map((slipItem, index) => (
                  <SelectedGameCard
                    key={index}
                    cardIndex={index}
                    slipItem={slipItem}
                    openSlip={() => {
                      setSelectedSlipIndex(index);
                      slipOnOpen();
                    }}
                    web3={web3Provider}
                  />
                ))}
              {gameDataError && <Text>Something went wrong!</Text>}
              {gameDataLoading && <Spinner />}
            </Flex>
          </Box>
        </VStack>{" "}
      </Container>
      <SelectedBetSlip
        slipIsOpen={slipIsOpen}
        slipOnOpen={slipOnOpen}
        slipOnClose={slipOnClose}
        slipItem={gameData[selectedSlipIndex]}
      />
    </>
  );
};
