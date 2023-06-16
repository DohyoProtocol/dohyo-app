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
  Divider,
} from "@chakra-ui/react";
import { useMobileHook } from "../../hooks/useMobile";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import { TimeIcon } from "@chakra-ui/icons";

export const ExplainBonsaiGame = ({ explainIsOpen, explainOnOpen, explainOnClose }) => {
  const mobile = useMobileHook();
  return (
    <>
      <Modal size={mobile ? "xl" : "xl"} isOpen={explainIsOpen} onClose={explainOnClose}>
        <ModalOverlay />
        <ModalContent onClick={explainOnClose} pb={3} bg={"blackAlpha.900"}>
          <ModalHeader color={"whiteAlpha.900"}>How To Play</ModalHeader>
          <ModalCloseButton
            mt={1}
            color={"whiteAlpha.900"}
            colorScheme={"blue"}
            variant={"outline"}
          />
          <ModalBody color={"whiteAlpha.900"}>
            <VStack minW={"100%"}>
              <VStack align={"flex-start"} mb={6} width={"100%"}>
                <Button
                  size={"xs"}
                  color={"black"}
                  pl={5}
                  pr={5}
                  bg={"blue.400"}
                  leftIcon={<FaPlus />}
                >
                  New Game
                </Button>
                <Text fontSize={"md"}>
                  The "New Game" button allows you to create a game.
                </Text>
                <HStack minW={"100%"}>
                  <Button
                    minW={"20"}
                    size={"xs"}
                    color={"red"}
                    p={3}
                    bg={"whiteAlpha.900"}
                  >
                    Join
                  </Button>
                  <Button
                    fontSize={"sm"}
                    minW={"20"}
                    size={"xs"}
                    p={3}
                    bg="whiteAlpha.100"
                  >
                    open
                  </Button>
                </HStack>
                <Text fontSize={"md"}>
                  The "Join" button allows you to join someone elses game.
                </Text>
                <HStack minW={"100%"}>
                  <Button
                    minW={"20"}
                    size={"xs"}
                    color={"red"}
                    p={3}
                    bg={"whiteAlpha.900"}
                  >
                    Extend
                  </Button>
                  <Button
                    fontSize={"sm"}
                    minW={"20"}
                    size={"xs"}
                    p={3}
                    bg="whiteAlpha.100"
                  >
                    18:23:59
                  </Button>
                </HStack>
                <Text fontSize={"md"}>
                  When it's your turn, you have a 24 hours countdown to click the "Extend"
                  button. When you click it, the timer will be reset to 24 hours and it's
                  now your opponents turn to extend.
                </Text>
                <HStack minW={"100%"}>
                  <Button
                    minW={"20"}
                    size={"xs"}
                    color={"red"}
                    p={3}
                    bg={"whiteAlpha.900"}
                  >
                    Waiting
                  </Button>
                  <Button
                    fontSize={"sm"}
                    minW={"20"}
                    size={"xs"}
                    p={3}
                    bg="whiteAlpha.100"
                  >
                    12:23:59
                  </Button>
                </HStack>
                <Text fontSize={"md"}>
                  The "Waiting" button is displayed when it's your opponents turn. You
                  can't do anything until he extends or his countdown runs out.
                </Text>
                <HStack minW={"100%"}>
                  <Button
                    minW={"20"}
                    size={"xs"}
                    color={"red"}
                    p={3}
                    bg={"whiteAlpha.900"}
                  >
                    Claim
                  </Button>
                  <Button
                    fontSize={"sm"}
                    minW={"20"}
                    size={"xs"}
                    p={3}
                    bg="whiteAlpha.100"
                  >
                    ended
                  </Button>
                </HStack>
                <Text fontSize={"md"}>
                  If your opponent, during his turn, didn't manage to extend within the 24
                  hour deadline, you can claim the pot by clicking the "Claim" button.
                </Text>
                <Button minW={"20"} size={"xs"} color={"red"} p={3} bg={"whiteAlpha.900"}>
                  Cancel
                </Button>
                <Text fontSize={"md"}>
                  The "Cancel" button allows you to cancel your games if nobody has joined
                  yet. Your bet will be refunded.
                </Text>

                <Spacer />
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
