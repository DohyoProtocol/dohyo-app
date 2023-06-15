import { Text, VStack, useDisclosure } from "@chakra-ui/react";
import { FaInfo, FaInfoCircle, FaUserCheck } from "react-icons/fa";

import { useMobileHook } from "../../hooks/useMobile";
import { InfoPartner } from "../MenuModals/InfoPartner";
import { VerifyCommunity } from "../MenuModals/VerifyCommunity";
export const InfoPartnerCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobile = useMobileHook();
  return (
    <>
      <VStack
        _hover={{ outline: "2px solid #ffffff" }}
        outline="2px solid transparent"
        transition="0.2s"
        minH="230px"
        minW={mobile ? "90vw" : "40vw"}
        bg="blackAlpha.900"
        p={3}
        m={3}
        onClick={onOpen}
        cursor={"pointer"}
        rounded={8}
        justifyContent={"space-evenly"}
      >
        <VStack w={"100%"}>
          <FaInfoCircle size={100} />
        </VStack>
        <Text textAlign={"center"} color={"white"} fontSize={"3xl"}>
          Partner program
        </Text>
      </VStack>
      <InfoPartner isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};
