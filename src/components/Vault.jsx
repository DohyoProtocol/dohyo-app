import {
  HStack,
  VStack,
  Text,
  SimpleGrid,
  Button,
  Spacer,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useMobileHook } from "../hooks/useMobile";
import Countdown, { zeroPad } from "react-countdown";
import Chance from "chance";
import { useState } from "react";

const chance = new Chance(); // instantiate

// Renderer callback with condition
const rendererHour = ({ minutes, seconds }) => {
  return (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};
// Renderer callback with condition
const rendererDay = ({ hours, minutes, seconds }) => {
  return (
    <span>
      {hours}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};
// Renderer callback with condition
const rendererWeek = ({ days, hours, minutes, seconds }) => {
  return (
    <span>
      {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

const getRenderer = (lockDuration) => {
  if (lockDuration < 3600000) {
    return rendererHour;
  } else if (lockDuration >= 3600000 && lockDuration < 86400000) {
    return rendererDay;
  } else {
    return rendererWeek;
  }
};

export const Vault = ({ vaultName, tvl, harvestFee, depositFee, apr, lockDuration }) => {
  const mobile = useMobileHook();

  const [selectedAction, setSelectedAction] = useState("Deposit");

  return (
    <>
      <Text fontSize={"5xl"} color={"red.600"}>
        {vaultName}
      </Text>
      <HStack
        flexWrap={"wrap"}
        spacing={mobile ? null : 6}
        p={6}
        bg={"blackAlpha.900"}
        rounded={10}
        minW={"100%"}
        justifyContent={"space-between"}
      >
        <VStack
          mb={mobile ? 6 : 0}
          spacing={mobile ? 6 : 6}
          minW={mobile ? "100%" : "48%"}
        >
          <SimpleGrid
            flexWrap={"wrap"}
            minChildWidth={mobile ? "100%" : "40%"}
            minW={"100%"}
            spacing={mobile ? 6 : 6}
            rounded={10}
            justifyContent={"space-between"}
          >
            <VStack m={mobile ? 0 : 0} p={3} bg={"red.600"} rounded={10}>
              <Text color={"white"}>Harvest lockup</Text>
              <Text fontSize={"4xl"} color={"white"}>
                <Countdown
                  date={Date.now() + lockDuration}
                  renderer={getRenderer(lockDuration)}
                />
              </Text>
            </VStack>
            <VStack m={mobile ? 0 : 0} p={3} bg={"red.600"} rounded={10}>
              <Text color={"white"}>Harvest fee</Text>
              <Text fontSize={"4xl"} color={"white"}>
                {harvestFee}
              </Text>
            </VStack>
            <VStack m={mobile ? 0 : 0} p={3} bg={"red.600"} rounded={10}>
              <Text color={"white"}>Deposit/ Withdrawal Fee</Text>
              <Text fontSize={"4xl"} color={"white"}>
                {depositFee}
              </Text>
            </VStack>
            <VStack m={mobile ? 0 : 0} p={3} bg={"red.600"} rounded={10}>
              <Text color={"white"}>Apr</Text>
              <Text fontSize={"4xl"} color={"white"}>
                {apr}
              </Text>
            </VStack>
          </SimpleGrid>
          <Button minW={"100%"}>
            Claim {chance.floating({ min: 1, max: 100, fixed: 2 })} DOHYO
          </Button>
        </VStack>

        <HStack
          justifyContent={"space-between"}
          minW={mobile ? "100%" : "49%"}
          p={3}
          spacing={6}
          bg={"red.600"}
          mt={mobile ? 6 : 0}
          maxH={"100%"}
          h={"100%"}
          mr={mobile ? "auto" : null}
          ml={mobile ? "auto" : null}
          rounded={10}
        >
          <VStack spacing={3} minW={"100%"} justifyContent={"space-between"}>
            <HStack spacing={6} minW={"100%"}>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  setSelectedAction("Deposit");
                }}
                color={selectedAction === "Deposit" ? "white" : "gray.400"}
              >
                Deposit
              </Text>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  setSelectedAction("Withdraw");
                }}
                color={selectedAction === "Withdraw" ? "white" : "gray.400"}
              >
                Withdraw
              </Text>
            </HStack>
            <Spacer />
            <HStack minW={"100%"}>
              <Text color={"white"}>
                {selectedAction === "Deposit" ? "Balance" : "Staked"}
              </Text>
              <Spacer />
              <Text color={"white"}>
                {chance.floating({ min: 1, max: 100, fixed: 2 }) + " DOHYO-WETH LP"}
              </Text>
            </HStack>
            <Spacer />

            <HStack minW={"100%"}>
              <InputGroup>
                <Input placeholder="$0" />
                <InputRightElement w={"20"}>
                  <Button h="1.75rem" size="sm" onClick={() => {}}>
                    Max
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
            <Spacer />

            {selectedAction === "Deposit" && (
              <HStack ml={3} minW={"100%"}>
                <Text
                  fontWeight={"extrabold"}
                  fontSize={"sm"}
                  color={"white"}
                  cursor={"pointer"}
                >
                  <a
                    href={"http://localhost:3000/home"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Provide liquidity
                  </a>
                </Text>
                <FaExternalLinkAlt size={12} color={"white"} />
              </HStack>
            )}
            <Spacer />

            <HStack minW={"100%"}>
              <Text color={"white"}>TVL:</Text>
              <Text color={"white"}>{tvl}</Text>
            </HStack>
            <Spacer />
            <Button minW={"100%"}>{selectedAction}</Button>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
};
