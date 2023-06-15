import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const StyledButton = ({ text, onClick, m = "3", navLink = "", minW = null }) => {
  return (
    <>
      {navLink !== "" ? (
        <Button
          m={m}
          minW={minW}
          onClick={onClick}
          fontSize="sm"
          color={"red.600"}
          bg={"whiteAlpha.100"}
          _hover={{ bg: "whiteAlpha.300" }}
          as={Link}
          to={navLink}
        >
          {text}
        </Button>
      ) : (
        <Button
          m={m}
          minW={minW}
          onClick={onClick}
          color={"red.600"}
          fontSize="sm"
          bg={"whiteAlpha.100"}
          _hover={{ bg: "whiteAlpha.300" }}
        >
          {text}
        </Button>
      )}
    </>
  );
};
