import {
  HStack,
  Spacer,
  Text,
  Button,
  Tooltip,
  Stack,
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
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";

import { FaQuestionCircle, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { SupportedTokensDropdown } from "../Dropdowns/SupportedTokensDropdown";
import { PredictionTokensDropdown } from "../Dropdowns/PredictionTokensDropdown";
import { CommunityOnlyDropdown } from "../Dropdowns/CommunityOnlyDropdown";
import { sizes } from "../../assets/constants";

const CreateWithCommunityOnlyGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={
          "You have to be owner/admin of a community to create a community-only game."
        }
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};
const CreatePairTokensGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={"After 7 days, the token which has performed better wins."}
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

export const CreateLuffyGame = ({ createIsOpen, createOnOpen, createOnClose }) => {
  //HOOKENTRY CREATE_LUFFY_GAME
  //HOOKENTRY GET_ADMIN_COMMUNITIES

  const [communityOnly, setCommunityOnly] = useState(true);
  const [token, setToken] = useState("DOHYO");
  const [betAmount, setBetAmount] = useState("");
  const [gameToken1, setGameToken1] = useState("ETH");
  const [gameToken2, setGameToken2] = useState("ARB");
  const [betId, setBetId] = useState(1);
  const [communityId, setCommunityId] = useState(0);
  return (
    <>
      <Modal isOpen={createIsOpen} onClose={createOnClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>New Luffy Game</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"red"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack ml={3} pr={3} minW={"100%"} alignItems={"flex-start"}>
              <Stack width={"100%"}>
                <Text ml={-3}>Game Settings</Text>
              </Stack>{" "}
              <HStack minW={"100%"}>
                <Text>Prediction Token A</Text>
                <CreatePairTokensGameTip />
                <Spacer />
                <PredictionTokensDropdown setter={setGameToken1} getter={gameToken1} />
              </HStack>
              <HStack minW={"100%"}>
                <Text>Prediction Token B</Text>
                <Spacer />
                <PredictionTokensDropdown setter={setGameToken2} getter={gameToken2} />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>My Bet</Text>
              </Stack>{" "}
              <HStack minW={"100%"}>
                <Text>Bet on</Text>
                <Spacer />
                <ButtonGroup isAttached>
                  <Button
                    fontSize={sizes.SM}
                    variant={"outline"}
                    size={"sm"}
                    _hover={{ bg: "red.700" }}
                    rightIcon={
                      betId === 1 ? <FaCheckCircle ml={-1} /> : <FaTimesCircle ml={-1} />
                    }
                    onClick={() => {
                      setBetId(1);
                    }}
                  >
                    A
                  </Button>
                  <Button
                    fontSize={sizes.SM}
                    variant={"outline"}
                    size={"sm"}
                    rightIcon={
                      betId === 2 ? <FaCheckCircle ml={-1} /> : <FaTimesCircle ml={-1} />
                    }
                    _hover={{ bg: "red.700" }}
                    onClick={() => {
                      setBetId(2);
                    }}
                  >
                    B
                  </Button>
                </ButtonGroup>
              </HStack>{" "}
              <HStack minW={"100%"}>
                <Text>Bet Token</Text>
                <Spacer />
                <SupportedTokensDropdown setter={setToken} getter={token} />
              </HStack>
              <HStack minW={"100%"}>
                <Text>$ Bet amount</Text>
                <Spacer />
                <Input
                  placeholder="$0"
                  textAlign={"right"}
                  size={"sm"}
                  rounded={6}
                  maxW={"25%"}
                  onChange={(e) => {
                    setBetAmount(e.target.value);
                  }}
                  value={betAmount}
                />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>Players</Text>
              </Stack>{" "}
              <HStack minW={"100%"}>
                <Text>Community Only</Text>
                <CreateWithCommunityOnlyGameTip />
                <Spacer />
                <Switch
                  defaultChecked
                  onChange={() => {
                    setCommunityOnly(!communityOnly);
                  }}
                />
              </HStack>
              {communityOnly && (
                <HStack minW={"100%"}>
                  <Text>Community</Text>
                  <Spacer />
                  <CommunityOnlyDropdown setter={setCommunityId} getter={communityId} />
                </HStack>
              )}
            </VStack>
            <Stack mt={3} width={"100%"}>
              <Button
                disabled
                mt={2}
                width={"100%"}
                variant={"outline"}
                size={"md"}
                _hover={{ bg: "red.700" }}
                alignSelf={"center"}
              >
                Create game
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
