import { Box, Button, HStack, Image, Text, VStack, Spacer } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useMobileHook } from "../../hooks/useMobile";

export const PartnerCard = ({ iconLink, communityId, tokenLink, name, date, link }) => {
  const mobile = useMobileHook();
  return (
    <Box
      _hover={{ outline: "2px solid #ffffff" }}
      outline="2px solid transparent"
      transition="0.2s"
      minH="230px"
      minW={mobile ? "90vw" : "40vw"}
      bg="blackAlpha.900"
      p={3}
      m={3}
      rounded={8}
    >
      <HStack maxW={"100%"} justifyContent={"space-between"}>
        <Image
          height={"150px"}
          objectFit="scale-down"
          src={iconLink}
          alt={"partner icon"}
          width={"150px"}
        />
        <VStack
          alignItems={"flex-end"}
          spacing={0}
          alignSelf={"flex-start"}
          minH={"100%"}
        >
          <Text color={"white"} fontSize={"4xl"}>
            {name}
          </Text>
          <Text color={"white"} fontSize={"sm"}>
            Partners since {date}
          </Text>
          <HStack ml={3}>
            <Text
              fontWeight={"extrabold"}
              fontSize={"sm"}
              color={"white"}
              cursor={"pointer"}
            >
              <a href={tokenLink} target="_blank" rel="noopener noreferrer">
                Token
              </a>
            </Text>
            <FaExternalLinkAlt size={12} />
          </HStack>
          <Text color={"white"} fontSize={"sm"}>
            Community id {communityId}
          </Text>
        </VStack>
      </HStack>
      <Spacer />
      <Button
        onClick={() => {
          window.open(link, "_blank");
        }}
        width={"100%"}
        mt={4}
        bg={"whiteAlpha.900"}
        _hover={{ bg: "whiteAlpha.800" }}
        color={"black"}
        variant="solid"
      >
        Visit
      </Button>
    </Box>
  );
};
