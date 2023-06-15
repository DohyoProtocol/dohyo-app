import { Center, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useMobileHook } from "../hooks/useMobile";
import { Vault } from "../components/Vault";

import Chance from "chance";

const chance = new Chance(); // instantiate

export const Staking = () => {
  const mobile = useMobileHook();
  return (
    <Container mt={mobile ? 3 : 12} width={"100%"}>
      <Center>
        <VStack mt={20} mb={12} minW={"80vw"} spacing={6}>
          <VStack spacing={0} p={6} bg={"blackAlpha.900"} rounded={10} minW={"100%"}>
            <SimpleGrid
              flexWrap={"wrap"}
              minChildWidth={mobile ? "100%" : "45%"}
              spacing={6}
              rounded={10}
              minW={"100%"}
              justifyContent={"space-between"}
            >
              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Total TVL</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  $283,242.54
                </Text>
              </VStack>
              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Total Supply</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  1.000.000
                </Text>
              </VStack>
              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Market Cap</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  $1.000.000
                </Text>
              </VStack>

              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Supply in vaults</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  243.343
                </Text>
              </VStack>
              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Price</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  $1.34
                </Text>
              </VStack>
              <VStack p={3} bg={"red.600"} rounded={10}>
                <Text color={"white"}>Circulating supply</Text>
                <Text fontSize={"4xl"} color={"white"}>
                  754.324
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
          <Vault
            vaultName={"Diamond hand"}
            tvl={"$183,242.54"}
            harvestFee={"0%"}
            depositFee={"0%"}
            apr={"10%"}
            lockDuration={chance.integer({ min: 1, max: 60000 * 60 * 24 * 7 })}
          />
          <Vault
            vaultName={"Based farmer"}
            tvl={"$23,123.04"}
            harvestFee={"5%"}
            depositFee={"0%"}
            apr={"10%"}
            lockDuration={chance.integer({ min: 1, max: 60000 * 60 * 24 })}
          />
          <Vault
            vaultName={"Degen"}
            tvl={"$200.45"}
            harvestFee={"20%"}
            depositFee={"0%"}
            apr={"10%"}
            lockDuration={chance.integer({ min: 1, max: 60000 * 60 })}
          />
        </VStack>
      </Center>
    </Container>
  );
};
