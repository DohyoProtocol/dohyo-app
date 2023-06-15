import { Box, HStack, Text, Tooltip } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { FaUser } from "react-icons/fa";

const chance = new Chance(); // instantiate

export const Players = () => {
  const playerCount = chance.integer({ min: 1, max: 200 });
  let playerList = [];
  for (let i = 0; i < 15; i++) {
    playerList.push(<Text key={i}>0x{chance.hash({ length: 12 })}...</Text>);
  }
  if (playerCount.length >= 15) {
    playerList.push(<Text key={16}>...</Text>);
  }

  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Tooltip shouldWrapChildren label={playerList}>
        <HStack maxH={4} spacing={0}>
          <FaUser mt={2} size={12} />
          <Text pb={"2px"} fontSize={14}>
            {playerCount}
          </Text>
        </HStack>
      </Tooltip>
    </Box>
  );
};
