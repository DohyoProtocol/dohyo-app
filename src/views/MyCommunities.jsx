import { ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Flex, Text, HStack, VStack, Button } from "@chakra-ui/react";
import Chance from "chance";
import { useRef } from "react";
import { CommunityCard } from "../components/MenuCards/CommunityCard";
import { useMobileHook } from "../hooks/useMobile";

export const MyCommunities = () => {
  const mobile = useMobileHook();
  const chance = new Chance(); // instantiate
  const adminRef = useRef(null);
  const memberRef = useRef(null);
  const executeScroll = (ref) => ref.current.scrollIntoView();

  return (
    <Container mt={3} maxW={"100%"}>
      <VStack mt={6} maxW={"90vw"} mr={"auto"} ml={"auto"} justifyContent={"left"}>
        <HStack minW={"100%"}>
          <Text
            pr={6}
            pl={6}
            width={"100%"}
            fontSize="2xl"
            fontWeight="bold"
            color="white"
          >
            You are Owner of:
          </Text>
          {mobile ? (
            <Button variant={"ghost"} onClick={() => executeScroll(adminRef)}>
              <ChevronDownIcon boxSize={12} color={"red.600"} />
            </Button>
          ) : null}
        </HStack>
        <HStack
          spacing={0}
          minW={"100%"}
          pr={6}
          pl={6}
          justifyContent="space-around"
          flexWrap={"wrap"}
          color="white"
        >
          {" "}
          <Text width={"100%"} fontSize="2xl" fontWeight="bold" color="white">
            -
          </Text>
        </HStack>
        <HStack ref={adminRef} minW={"100%"}>
          <Text
            pr={6}
            pl={6}
            width={"100%"}
            fontSize="2xl"
            fontWeight="bold"
            color="white"
          >
            Admin of:
          </Text>
          {mobile ? (
            <Button variant={"ghost"} onClick={() => executeScroll(memberRef)}>
              <ChevronDownIcon boxSize={12} color={"red.600"} />
            </Button>
          ) : null}
        </HStack>
        <HStack
          spacing={0}
          minW={"100%"}
          justifyContent={mobile ? "space-around" : "flex-start"}
          flexWrap={"wrap"}
          color="white"
        ></HStack>
        <Text
          ref={memberRef}
          pr={6}
          pl={6}
          width={"100%"}
          fontSize="2xl"
          fontWeight="bold"
          color="white"
        >
          Member of:
        </Text>
        <Flex
          minW={"100%"}
          flexWrap={"wrap"}
          justifyContent={"flex-start"}
          color="white"
        ></Flex>
      </VStack>
    </Container>
  );
};
