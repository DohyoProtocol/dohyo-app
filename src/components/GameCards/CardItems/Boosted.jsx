import { Box, Text, Tooltip } from "@chakra-ui/react"; // example.spec.js
import {
  FaBiohazard,
  FaBug,
  FaBurn,
  FaEgg,
  FaSeedling,
  FaSpa,
  FaTree,
} from "react-icons/fa";

export const Boosted = ({ boosted, ultraBoosted }) => {
  const UltraBoostedGame = () => {
    return (
      <Box p={1} bg="whiteAlpha.100" rounded={8}>
        <Text>
          <Tooltip
            shouldWrapChildren
            label={
              "Hydroponic. Players have to redeposit the bet amount everytime they extend. Additionally, the bet amount gets increased by 10%, everytime the game gets extended."
            }
          >
            <FaBurn color={"#4299E1"} size={16} />
          </Tooltip>
        </Text>
      </Box>
    );
  };

  const BoostedGame = () => {
    return (
      <Box p={1} bg="whiteAlpha.100" rounded={8}>
        <Text>
          <Tooltip
            shouldWrapChildren
            label={
              "Fertalised. Players have to redeposit the bet amount everytime they extend."
            }
          >
            <FaSpa color={"#9F7AEA"} size={16} />
          </Tooltip>
        </Text>
      </Box>
    );
  };
  const NormalGame = () => {
    return (
      <Box p={1} bg="whiteAlpha.100" rounded={8}>
        <Text>
          <Tooltip
            shouldWrapChildren
            label={"Organic. Players deposit bet amount at game start."}
          >
            <FaSeedling color={"#48BB78"} size={16} />
          </Tooltip>
        </Text>
      </Box>
    );
  };

  return boosted ? <BoostedGame /> : ultraBoosted ? <UltraBoostedGame /> : <NormalGame />;
};
