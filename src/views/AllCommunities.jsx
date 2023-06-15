import { Container, Text, HStack, VStack } from "@chakra-ui/react";
import Chance from "chance";
import { CommunityCard } from "../components/MenuCards/CommunityCard";

export const AllCommunities = () => {
  const chance = new Chance(); // instantiate
  return (
    <Container mt={3} maxW={"100%"}>
      <VStack mt={6} maxW={"90vw"} mr={"auto"} ml={"auto"} justifyContent={"left"}>
        <HStack
          spacing={0}
          minW={"100%"}
          justifyContent="space-around"
          flexWrap={"wrap"}
          color="white"
        ></HStack>
      </VStack>
    </Container>
  );
};
