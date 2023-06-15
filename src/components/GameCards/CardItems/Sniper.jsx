import { Box, HStack, Tooltip } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { FaCrosshairs } from "react-icons/fa";

const chance = new Chance(); // instantiate

export const Sniper = () => {
  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Tooltip
        shouldWrapChildren
        label={"Sniped by 0x" + chance.hash({ length: 12 }) + "..."}
      >
        <HStack maxH={4} spacing={0}>
          <FaCrosshairs color="#6B46C1" size={16} />
        </HStack>
      </Tooltip>
    </Box>
  );
};
