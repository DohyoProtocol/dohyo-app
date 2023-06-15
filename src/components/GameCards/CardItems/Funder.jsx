import { Box, HStack, Tooltip } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { FaCommentDollar } from "react-icons/fa";

const chance = new Chance(); // instantiate

export const Funder = () => {
  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Tooltip
        shouldWrapChildren
        label={"Funded by 0x" + chance.hash({ length: 12 }) + "..."}
      >
        <HStack maxH={4} spacing={0}>
          <FaCommentDollar color="#B7791F" size={16} />
        </HStack>
      </Tooltip>
    </Box>
  );
};
