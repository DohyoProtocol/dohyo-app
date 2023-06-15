import {
  HStack,
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

export const InfoPartner = ({ isOpen, onOpen, onClose }) => {
  const mobile = useMobileHook();
  const [name, setName] = useState("");
  return (
    <>
      <Modal size={mobile ? "xs" : "xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>Partner program</ModalHeader>
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
                  What is the partner program?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  The partner program is a way for you to reward your community for their
                  loyalty. They will be able to use your token as the betting token, when
                  playing games.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  What else is special about it?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  2.5% of your tokens game edge will be distributed to your projects
                  treasury. Additionally your token will have exposure to users, who might
                  not have heard of your project yet. Your social media, websites, and
                  token charts will be linked.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  How can i become a partner?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  Your project should have an established community and a token with
                  plenty of liquidity. This is to assure everyone can use your token for
                  playing games, without the risk of sudden price dumps.
                </Text>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
