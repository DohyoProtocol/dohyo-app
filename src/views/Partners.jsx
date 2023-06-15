import { Container, Box, Flex } from "@chakra-ui/react";
import Chance from "chance";
import { BecomePartner } from "../components/MenuCards/BecomePartner";
import { InfoPartnerCard } from "../components/MenuCards/InfoPartnerCard";
import { PartnerCard } from "../components/MenuCards/PartnerCard";
import { useMobileHook } from "../hooks/useMobile";

export const Partners = () => {
  const chance = new Chance(); // instantiate
  const mobile = useMobileHook();
  return (
    <Container mt={3} maxW={"100%"}>
      <Box mt={mobile ? 20 : 40} maxW={"90%"} mr={"auto"} ml={"auto"}>
        <Flex
          ml={-5}
          mr={-5}
          minW={"100%"}
          flexWrap={"wrap"}
          justifyContent={2 > 4 ? "space-around" : "center"}
          color="white"
        >
          <InfoPartnerCard />
          <BecomePartner />
        </Flex>
      </Box>
    </Container>
  );
};
