import {
  HStack,
  Spacer,
  Text,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
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

export const CreateKatanaGame = ({ createIsOpen, createOnOpen, createOnClose }) => {
  //HOOKENTRY CREATE_KATANA_GAME
  //HOOKENTRY GET_ADMIN_COMMUNITIES

  const [communityOnly, setCommunityOnly] = useState(true);
  const [token, setToken] = useState("DOHYO");
  const [betAmount, setBetAmount] = useState("");
  const [communityId, setCommunityId] = useState(0);
  return (
    <>
      <Modal isOpen={createIsOpen} onClose={createOnClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>New Katana Game</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"red"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack minW={"100%"} alignItems={"flex-start"}>
              <HStack minW={"100%"}>
                <Text>Token</Text>
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
