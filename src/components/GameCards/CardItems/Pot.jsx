import { Box, HStack, Text, Tooltip } from "@chakra-ui/react"; // example.spec.js
import { FaCoins } from "react-icons/fa";
import { useTokensContext } from "../../../hooks/useTokens";
import { convertNumber } from "../../../utils/numberConvert";
import { useWeb3HelperContext } from "../../../hooks/useWeb3Helper";
import { decimalsToUnits } from "../../../assets/constants";

export const Pot = ({ pot, tokenAddress }) => {
  const { getTokenName, getTokenPrice, getTokenDecimals } = useTokensContext();
  const { fromWei } = useWeb3HelperContext();

  return (
    <Box maxW={"100%"}>
      <HStack mt={4}>
        <Tooltip label={"The current pot of this game."}>
          <Text>
            {"Pot $" +
              convertNumber(
                getTokenPrice(tokenAddress) *
                  parseFloat(
                    fromWei(
                      pot.toString(),
                      decimalsToUnits(getTokenDecimals(tokenAddress))
                    )
                  ),
                2
              ) +
              " " +
              getTokenName(tokenAddress)}
          </Text>
        </Tooltip>
      </HStack>
    </Box>
  );
};
