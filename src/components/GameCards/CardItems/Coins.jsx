import { Box, HStack, Tooltip } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { FaCoins } from "react-icons/fa";

const chance = new Chance(); // instantiate

export const Coins = () => {
  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Tooltip
        shouldWrapChildren
        label={chance.pickone(["ETH", "BTC", "ARB", "GRAIL", "GMX", "SUSHI"])}
      >
        <HStack maxH={4} spacing={0}>
          <FaCoins size={16} />
        </HStack>
      </Tooltip>
    </Box>
  );
};
