//EXTENSION
import { Button, VStack } from "@chakra-ui/react";

//ASSETS
import { useUserContext } from "../hooks/useUser";

export const LogoutButton = () => {
  const { endSession } = useUserContext();
  return (
    <VStack spacing={6}>
      <Button
        onClick={async (event) => {
          event.preventDefault();
          localStorage.removeItem("userIsLoggedIn");

          endSession();
        }}
        color={"red.600"}
        bg={"whiteAlpha.100"}
        _hover={{ bg: "whiteAlpha.300" }}
        fontSize="sm"
      >
        Log out
      </Button>
    </VStack>
  );
};
