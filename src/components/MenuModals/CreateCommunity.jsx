import {
  Spacer,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMobileHook } from "../../hooks/useMobile";

export const CreateCommunity = ({ isOpen, onOpen, onClose }) => {
  const mobile = useMobileHook();
  const [name, setName] = useState("");
  return (
    <>
      <Modal size={mobile ? "xs" : "xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>Create community</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"blue"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack minW={"100%"}>
              <VStack mb={6} width={"100%"}>
                <Text width={"100%"} fontSize={"xl"}>
                  What are communities?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  Communites allow you to create games with a limited cirlce of users.
                  This is useful if you want to start a game, where not everyone should be
                  able to join freely. Creating communities is free and decentralised.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  Who can join my community?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  When creating a community, you automatically become its owner. The owner
                  can add and remove additional admins and members. Admins can only add
                  members, not other admins.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  What is the purpose of owners and admins?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  The owner and admins can start games for their community.
                </Text>
                <Text width={"100%"} fontSize={"xl"}>
                  How do i create a community?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  Call the "recordCommunity" function in the Dohyo smart contract. (link
                  below)
                </Text>
              </VStack>
              <Button
                width={"100%"}
                variant={"outline"}
                size={"md"}
                _hover={{ bg: "blue.700" }}
                alignSelf={"center"}
              >
                Create
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
