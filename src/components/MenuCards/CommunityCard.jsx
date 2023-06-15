import { Box, Button, HStack, Image, Text, VStack, Spacer } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useMobileHook } from "../../hooks/useMobile";
import { StyledButton } from "../StyledButton";
import Chance from "chance";
import { Link } from "react-router-dom";

const chance = new Chance(); // instantiate
export const CommunityCard = ({ iconLink, communityId, tokenLink, name, date, link }) => {
  const mobile = useMobileHook();
  return (
    <Box w={mobile ? "100%" : "30vw"} minW={"300px"} p={3} pl={0} pr={mobile ? 0 : 3}>
      <Box
        _hover={{ outline: "2px solid #ffffff" }}
        outline="2px solid transparent"
        transition="0.2s"
        minH="230px"
        minW={"100%"}
        bg="blackAlpha.900"
        p={3}
        rounded={8}
      >
        <HStack maxW={"100%"} justifyContent={"space-between"}>
          <Image
            height={mobile ? "100px" : "150px"}
            objectFit="scale-down"
            src={iconLink}
            alt={"community icon"}
            width={mobile ? "100px" : "150px"}
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
              Created {date}
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
        <HStack justifyContent={"space-around"} mt={mobile ? 12 : 4}>
          <Button
            minW={"88%"}
            fontSize="sm"
            bg={"white"}
            variant="solid"
            color={"black"}
            as={Link}
            to={"/community/" + chance.integer({ min: 1, max: 30 })}
          >
            {"View Community"}
          </Button>
          <Button
            onClick={() => {
              window.open(link, "_blank");
            }}
            _hover={{ bg: "whiteAlpha.300" }}
            bg="whiteAlpha.100"
            minW={"10%"}
            variant="ghost"
          >
            ...
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
