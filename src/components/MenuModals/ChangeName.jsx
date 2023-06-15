import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export const ChangeName = ({ isOpen, onOpen, onClose }) => {
  //HOOKENTRY CHANGE_NAME

  const [name, setName] = useState("");
  return (
    <>
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={3} bg={"blue.400"}>
          <ModalHeader color={"whiteAlpha.900"}>Change name</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"blue"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack minW={"100%"} alignItems={"flex-start"}>
              <Input onChange={(event) => setName(event.target.value)} />
              <Stack width={"100%"}>
                <Button
                  mt={2}
                  width={"100%"}
                  variant={"outline"}
                  size={"md"}
                  _hover={{ bg: "red.700" }}
                  alignSelf={"center"}
                >
                  Confirm
                </Button>
              </Stack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
