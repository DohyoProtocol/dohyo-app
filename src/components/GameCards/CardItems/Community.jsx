import { Box, Text, Tooltip } from "@chakra-ui/react"; // example.spec.js
import Chance from "chance";
import { FaUserFriends, FaUserLock } from "react-icons/fa";

const chance = new Chance(); // instantiate

export const Community = ({ joined = false }) => {
  return (
    <Box p={1} bg="whiteAlpha.100" rounded={8}>
      <Text>
        <Tooltip
          shouldWrapChildren
          label={
            "This game is hosted by " +
            chance.animal() +
            "Swap.io" +
            (!joined && " You are not part of this community.")
          }
        >
          {joined ? (
            <FaUserFriends color={"#48BB78"} size={16} />
          ) : (
            <FaUserLock color={"#F56565"} size={16} />
          )}
        </Tooltip>
      </Text>
    </Box>
  );
};
