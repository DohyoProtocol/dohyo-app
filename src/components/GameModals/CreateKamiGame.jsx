import {
  HStack,
  Spacer,
  Text,
  Button,
  Stack,
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
} from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import { SupportedTokensDropdown } from "../../components/Dropdowns/SupportedTokensDropdown";
import { PredictionTokensDropdown } from "../../components/Dropdowns/PredictionTokensDropdown";
import { VolatilityDropdown } from "../../components/Dropdowns/VolatilityDropdown";
import { CommunityOnlyDropdown } from "../../components/Dropdowns/CommunityOnlyDropdown";

const CreatePredictionTokenGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={
          "The price of this token will be compared between game start and game end."
        }
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

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
const CreatePredictionGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={
          "Your prediction for the game token. The prediction ranges for new games are adjusted weekly, to account for current market conditions."
        }
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

export const CreateKamiGame = ({ createIsOpen, createOnOpen, createOnClose }) => {
  //HOOKENTRY CREATE_KAMI_GAME
  //HOOKENTRY GET_ADMIN_COMMUNITIES
  const [token, setToken] = useState("DOHYO");
  const [betAmount, setBetAmount] = useState("");
  const [communityOnly, setCommunityOnly] = useState(true);
  const [gameToken, setGameToken] = useState("ETH");
  const [betId, setBetId] = useState(0);
  const [communityId, setCommunityId] = useState("-");
  return (
    <>
      <Modal isOpen={createIsOpen} onClose={createOnClose}>
        <ModalOverlay />

        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>New Kami Game</ModalHeader>
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
                <Text>Prediction Token</Text>
                <CreatePredictionTokenGameTip />
                <Spacer />
                <PredictionTokensDropdown setter={setGameToken} getter={gameToken} />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>My Prediction</Text>
              </Stack>{" "}
              <HStack minW={"100%"}>
                <Text>Prediction</Text>
                <CreatePredictionGameTip />
                <Spacer />
                <VolatilityDropdown setter={setBetId} getter={betId} />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>My Bet</Text>
              </Stack>{" "}
              <HStack minW={"100%"}>
                <Text>Bet Token</Text>
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
