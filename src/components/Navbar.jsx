import React, { useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  Button,
  Box,
  useDisclosure,
  Text,
  Flex,
  SimpleGrid,
  Spacer,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { FaHome, FaWallet } from "react-icons/fa";
import { StyledButton } from "./StyledButton";
import { useUserContext } from "../hooks/useUser";
import { useMobileHook } from "../hooks/useMobile";
import { NavGamesDropdown } from "./Dropdowns/NavGamesDropdown";
import { NetworksDropdown } from "./Dropdowns/NetworksDropdown";
import { networks, networkSearch } from "../assets/constants";
import { WarningIcon } from "@chakra-ui/icons";
import { CreateCommunity } from "./MenuModals/CreateCommunity";
import { VerifyCommunity } from "./MenuModals/VerifyCommunity";
import { MyWallet } from "./MenuModals/MyWallet";
import { NavWalletDropdown } from "./Dropdowns/NavWalletDropdown";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();

  const mobile = useMobileHook();
  const {
    isOpen: mobileNavDrawerIsOpen,
    onOpen: mobileNavDrawerOnOpen,
    onClose: mobileNavDrawerOnClose,
  } = useDisclosure();
  const btnRef = useRef();
  const { wallet, authenticateDesktop, authenticateMobile } = useUserContext();
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onClose: createOnClose,
  } = useDisclosure();

  const {
    isOpen: verifyIsOpen,
    onOpen: verifyOnOpen,
    onClose: verifyOnClose,
  } = useDisclosure();
  const {
    isOpen: walletIsOpen,
    onOpen: walletOnOpen,
    onClose: walletOnClose,
  } = useDisclosure();

  const [myWalletSwitch, setMyWalletSwitch] = useState(0);

  const myWalletOnClick = (selection = 0) => {
    setMyWalletSwitch(selection);
    walletOnOpen();
  };

  return (
    <>
      <Box
        zIndex={100}
        minW={"100%"}
        pos={"fixed"}
        mt={mobile ? 0 : "92px"}
        minH={20}
        bg={"#111"}
        justifyItems={"center"}
      >
        <Box maxW={"90%"} mr={"auto"} ml={"auto"}>
          {mobile ? (
            <>
              <Flex
                align="center"
                justify="left"
                boxSize="full"
                width={"100%"}
                position="static"
                pt={2}
              >
                <StyledButton onClick={mobileNavDrawerOnOpen} text={"Menu"} />
                <Spacer />
                <Button
                  fontSize={"3xl"}
                  m={3}
                  color={"whiteAlpha.900"}
                  bg={"red.600"}
                  _hover={{ bg: "red.600" }}
                  onClick={(event) => {
                    history.push("/home");
                  }}
                >
                  DOHYŌ
                </Button>
                <Spacer />
                {!wallet ? (
                  <StyledButton onClick={authenticateMobile} text={"Connect"} />
                ) : (
                  <NavWalletDropdown myWalletOnClick={myWalletOnClick} />
                )}
              </Flex>
              <Drawer
                size={"md"}
                isOpen={mobileNavDrawerIsOpen}
                placement="left"
                onClose={mobileNavDrawerOnClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />

                <DrawerContent bg={"#000000"}>
                  <DrawerBody mt={12}>
                    <SimpleGrid columns={1}>
                      <StyledButton
                        onClick={mobileNavDrawerOnClose}
                        navLink="/"
                        text={<FaHome />}
                        m={3}
                      />

                      <Text m={3} color="white">
                        Dohyō
                      </Text>
                      {/* <StyledButton
                      onClick={onClose}
                      navLink="/partners"
                      text={"Partners"}
                      m={3}
                    /> */}
                      {/* <Text m={3} color="white">
                        Communities
                      </Text>
                      <StyledButton
                        onClick={mobileNavDrawerOnClose}
                        navLink="/allcommunities"
                        text={"All Communities"}
                        m={3}
                      />
                      <StyledButton
                        onClick={mobileNavDrawerOnClose}
                        navLink="/mycommunities"
                        text={"My Communities"}
                        m={3}
                      />
                      <Button
                        m={3}
                        onClick={(event) => {
                          createOnOpen();
                        }}
                        fontSize="sm"
                        color={"red.600"}
                        bg={"whiteAlpha.100"}
                        _hover={{ bg: "whiteAlpha.300" }}
                      >
                        Create Community
                      </Button>
                      <Button
                        m={3}
                        onClick={(event) => {
                          verifyOnOpen();
                        }}
                        fontSize="sm"
                        color={"red.600"}
                        bg={"whiteAlpha.100"}
                        _hover={{ bg: "whiteAlpha.300" }}
                      >
                        Verify Community
                      </Button> */}
                      <Text m={3} color="white">
                        Games
                      </Text>
                      {/* <StyledButton onClick={onClose} navLink="/kami" text={"Kami"} m={3} /> */}
                      {/* <StyledButton
                      onClick={onClose}
                      navLink="/luffy"
                      text={"Luffy"}
                      m={3}
                    /> */}
                      <StyledButton
                        onClick={mobileNavDrawerOnClose}
                        navLink="/bonsai"
                        text={"Bōnsai"}
                        m={3}
                      />
                      {/* <StyledButton
                      onClick={onClose}
                      navLink="/shimo"
                      text={"Shimō"}
                      m={3}
                    /> */}
                      {/* <StyledButton
                      onClick={onClose}
                      navLink="/katana"
                      text={"Katana"}
                      m={3}
                    /> */}
                      {/* <StyledButton onClick={onClose} navLink="/sumo" text={"Sumō"} m={3} /> */}
                    </SimpleGrid>
                  </DrawerBody>

                  <DrawerFooter>
                    <StyledButton onClick={mobileNavDrawerOnClose} text={"x"} m={3} />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Flex
              pt={2}
              align="center"
              pos="relative"
              justify="left"
              boxSize="full"
              width={"100%"}
              position="static"
            >
              <Flex
                align="center"
                pos="relative"
                justify="left"
                boxSize="full"
                width={"100%"}
                position="static"
              >
                <Button
                  fontSize={"3xl"}
                  m={3}
                  ml={0}
                  color={"whiteAlpha.900"}
                  bg={"red.600"}
                  _hover={{ bg: "red.600" }}
                  onClick={(event) => {
                    history.push("/home");
                  }}
                >
                  DOHYŌ
                </Button>
                <NavGamesDropdown />
                {/* <NavCommunitiesDropdown
                  createOnOpen={createOnOpen}
                  verifyOnOpen={verifyOnOpen}
                /> */}
                {/* <StyledButton navLink="/partners" text={"Partners"} m={3} /> */}
                {/* <StyledButton navLink="/communities-menu" text={"Communities"} m={3} /> */}
              </Flex>
              <Flex
                align="center"
                pos="relative"
                justify="right"
                boxSize="full"
                width={"100%"}
                position="static"
              >
                {!wallet && <NetworksDropdown />}
                {wallet && (
                  <Tooltip
                    label={
                      wallet.network !== 42161
                        ? "The connected network is not supported. Please switch to  Arbitrum."
                        : "Connected to Arbitrum."
                    }
                  >
                    <Button
                      fontSize="sm"
                      color={"red.600"}
                      bg={"whiteAlpha.100"}
                      _hover={{ bg: "whiteAlpha.100" }}
                      cursor={"default"}
                      m={3}
                      rightIcon={
                        wallet.network === 42161 ? <FaWallet /> : <WarningIcon />
                      }
                    >
                      {
                        networks(
                          networkSearch.ID,
                          wallet.network,
                          networkSearch.WALLETDATA
                        )["chainName"]
                      }
                    </Button>
                  </Tooltip>
                )}
                {!wallet ? (
                  <StyledButton m={0} onClick={authenticateDesktop} text={"Connect"} />
                ) : (
                  <NavWalletDropdown myWalletOnClick={myWalletOnClick} />
                )}
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
      <VerifyCommunity
        isOpen={verifyIsOpen}
        onClose={verifyOnClose}
        onOpen={verifyOnOpen}
      />
      <CreateCommunity
        isOpen={createIsOpen}
        onClose={createOnClose}
        onOpen={createOnOpen}
      />
      <MyWallet
        myWalletSwitch={myWalletSwitch}
        setMyWalletSwitch={setMyWalletSwitch}
        isOpen={walletIsOpen}
        onClose={walletOnClose}
        onOpen={walletOnOpen}
      />
    </>
  );
};

export default Navbar;
