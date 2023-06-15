import { Box } from "@chakra-ui/react";

export const GameCardBase = ({ children }) => {
  return (
    <Box h="165px" minW={"325px"} mr={"auto"} ml={"auto"} bg={"#111"} p={3}>
      <Box
        _hover={{ outline: "2px solid #ffffff" }}
        outline="2px solid transparent"
        transition="0.2s"
        minH="100%"
        minW="100%"
        bg="blackAlpha.900"
        p={3}
        rounded={8}
      >
        {children}
      </Box>
    </Box>
  );
};
