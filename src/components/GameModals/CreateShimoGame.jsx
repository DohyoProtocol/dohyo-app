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
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { GameDurationDropdown } from "../../components/Dropdowns/GameDurationDropdown";
import { SupportedTokensDropdown } from "../../components/Dropdowns/SupportedTokensDropdown";
import { CommunityOnlyDropdown } from "../../components/Dropdowns/CommunityOnlyDropdown";

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
const CreateReleaseDateGameTip = () => {
  return (
    <Text pt={1}>
      <Tooltip
        shouldWrapChildren
        label={"How long the tokens should be locked before release."}
      >
        <Icon as={FaQuestionCircle} color={"white"} />
      </Tooltip>
    </Text>
  );
};

export const CreateShimoGame = ({ createIsOpen, createOnOpen, createOnClose }) => {
  //HOOKENTRY CREATE_SHIMO_GAME
  //HOOKENTRY GET_ADMIN_COMMUNITIES

  const [releaseDate, setRealeaseDate] = useState("1 day");
  const [communityOnly, setCommunityOnly] = useState(true);
  const [token, setToken] = useState("DOHYO");
  const [betAmount, setBetAmount] = useState("");
  const [communityId, setCommunityId] = useState(0);
  return (
    <>
      <Modal isOpen={createIsOpen} onClose={createOnClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>New Shimō Game</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"red"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack ml={3} pr={3} minW={"100%"} alignItems={"flex-start"}>
              <Stack width={"100%"}>
                <Text ml={-3}>Game settings</Text>{" "}
              </Stack>
              <HStack minW={"100%"}>
                <Text>Token</Text>
                <Spacer />
                <SupportedTokensDropdown setter={setToken} getter={token} />
              </HStack>
              <HStack minW={"100%"}>
                <Text>$ Funding amount</Text>
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
              <HStack minW={"100%"}>
                <Text>Release date</Text>
                <CreateReleaseDateGameTip />
                <Spacer />
                <GameDurationDropdown getter={releaseDate} setter={setRealeaseDate} />
              </HStack>
              <Stack width={"100%"}>
                <Text ml={-3}>Players</Text>{" "}
              </Stack>
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
