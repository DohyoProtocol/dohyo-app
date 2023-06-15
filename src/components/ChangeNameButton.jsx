//EXTENSION
import { Button, VStack, useDisclosure } from "@chakra-ui/react";

//ASSETS
import { colors, variants } from "../assets/constants";
import { useUserContext } from "../hooks/useUser";
import { ChangeName } from "./MenuModals/ChangeName";

export const ChangeNameButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { endSession } = useUserContext();
  return (
    <>
      <VStack spacing={6}>
        <Button
          onClick={onOpen}
          color={"red.600"}
          bg={"whiteAlpha.100"}
          _hover={{ bg: "whiteAlpha.300" }}
          fontSize="sm"
        >
          Change name
        </Button>
      </VStack>
      <ChangeName isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};
