import { Text, VStack } from "@chakra-ui/react";
import Chance from "chance";
import { FaPlusCircle } from "react-icons/fa";

import { useMobileHook } from "../../hooks/useMobile";
export const BecomePartner = () => {
  const mobile = useMobileHook();
  return (
    <VStack
      _hover={{ outline: "2px solid #ffffff" }}
      outline="2px solid transparent"
      transition="0.2s"
      minH="230px"
      minW={mobile ? "90vw" : "40vw"}
      bg="blackAlpha.900"
      p={3}
      m={3}
      onClick={() => {
        window.open("http://localhost:3000/home", "_blank");
      }}
      rounded={8}
      justifyContent={"space-evenly"}
    >
      <VStack cursor={"pointer"} w={"100%"}>
        <FaPlusCircle size={100} color={"#ffffff"} />
      </VStack>
      <Text textAlign={"center"} color={"white"} fontSize={"3xl"}>
        Become a partner
      </Text>
    </VStack>
  );
};
