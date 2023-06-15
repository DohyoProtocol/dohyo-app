import { Box, Text } from "@chakra-ui/react"; // example.spec.js
import Countdown, { zeroPad } from "react-countdown";

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds }) => {
  return (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

export const GameCountdown = ({ open, started, ended, cancelled, deadLineBlockUnix }) => {
  return (
    <Box pl={2} pr={2} bg="whiteAlpha.100" rounded={8}>
      <Text>
        {open ? (
          "open"
        ) : cancelled ? (
          "cancelled"
        ) : ended || deadLineBlockUnix < 0 ? (
          "ended"
        ) : (
          <Countdown date={deadLineBlockUnix} renderer={renderer} />
        )}
      </Text>
    </Box>
  );
};
