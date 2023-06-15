import { Box, HStack, Spacer, Text } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { Coins } from "./CardItems/Coins";
import { Community } from "./CardItems/Community";
import { GameCountdown } from "./CardItems/GameCountdown";
import { PlayButton } from "./CardItems/PlayButton";
import { Players } from "./CardItems/Players";
import { Pot } from "./CardItems/Pot";
import { GameCardBase } from "./GameCardBase";

const chance = new Chance(); // instantiate

export const KamiGameCard = ({ openSlip, cardIndex }) => {
  return (
    <GameCardBase openSlip={openSlip} cardIndex={cardIndex}>
      <HStack>
        <Box pl={2} pr={2} bg="whiteAlpha.100" rounded={8}>
          <Text>#{chance.integer({ min: 1, max: 20 })}</Text>
        </Box>
        {chance.pickone([
          <Community />,
          <Community />,
          <Community />,
          <Community joined={true} />,
          null,
        ])}
        <Players />
        <Coins />
        <Spacer />
        <GameCountdown />
      </HStack>
      <Pot />
      {chance.pickone([<PlayButton />, null, null, null, null])}
    </GameCardBase>
  );
};
