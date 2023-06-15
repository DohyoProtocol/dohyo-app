import { Box, HStack, Tooltip } from "@chakra-ui/react"; // example.spec.js
import { FaReceipt } from "react-icons/fa";

export const SlipButton = () => {
  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Tooltip shouldWrapChildren label={"Click to see more"}>
        <HStack _hover={{ cursor: "pointer" }} maxH={4} spacing={0}>
          <FaReceipt color="#B7791F" size={16} />
        </HStack>
      </Tooltip>
    </Box>
  );
};
