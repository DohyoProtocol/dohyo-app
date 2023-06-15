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

export const VerifyCommunity = ({ isOpen, onOpen, onClose }) => {
  const mobile = useMobileHook();
  const [name, setName] = useState("");
  return (
    <>
      <Modal size={mobile ? "xs" : "xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>Verify community</ModalHeader>
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
                  Why should i verify my community?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  Verifying your community will allow you to chose a custom name.
                  Additionally you can submit links for social media and a logo.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  Why manual verification?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  This is to make sure no communities are of a malicous nature. This could
                  mean impersonation or using illicit names, links or logos.
                </Text>
                <Spacer />
                <Text width={"100%"} fontSize={"xl"}>
                  How do i verify my community?
                </Text>
                <Text pl={3} pr={3} width={"100%"} fontSize={"md"}>
                  Click one of the links below.
                </Text>
              </VStack>
              <HStack minW={"100%"} spacing={6}>
                <Button
                  width={"100%"}
                  variant={"outline"}
                  size={"md"}
                  _hover={{ bg: "blue.700" }}
                  alignSelf={"center"}
                >
                  Telegram
                </Button>
                <Button
                  width={"100%"}
                  variant={"outline"}
                  size={"md"}
                  _hover={{ bg: "blue.700" }}
                  alignSelf={"center"}
                >
                  Discord
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
