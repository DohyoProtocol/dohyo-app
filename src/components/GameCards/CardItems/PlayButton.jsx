import { Button, Text } from "@chakra-ui/react"; // example.spec.js

export const PlayButton = ({ text = "text", onClick }) => {
  return (
    <Button
      width={"100%"}
      mt={4}
      bg={"whiteAlpha.900"}
      _hover={{ bg: "whiteAlpha.800" }}
      variant="solid"
      onClick={onClick}
    >
      <Text color={"red"} fontSize={"sm"} fontWeight={"bold"}>
        {text}
      </Text>
    </Button>
  );
};
