//EXTENSION
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Box,
  MenuItem,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEye } from "react-icons/fa";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

import { useNetworkSelectorContext } from "../../hooks/useNetworkSelector";

export const NetworksDropdown = () => {
  const { currentNetworkSelection, setCurrentNetworkSelection } =
    useNetworkSelectorContext();

  return (
    <Box>
      <Menu>
        <Tooltip label={"View only mode. Network: " + currentNetworkSelection}>
          <MenuButton
            rightIcon={<FaEye />}
            m={3}
            fontSize={sizes.SM}
            as={Button}
            color={"red.600"}
            bg={colors.WHITE100}
            _hover={{ bg: colors.WHITE300 }}
          >
            {currentNetworkSelection}
          </MenuButton>
        </Tooltip>
        <MenuList
          variant={variants.OUTLINE}
          bgColor={"red.600"}
          rounded={5}
          borderColor={colors.WHITE900}
        >
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#8ccef0",
                borderRadius: "24px",
              },
            }}
            overflowX={positions.AUTO}
          >
            <MenuItem
              _focus={{
                bg: "red.800",
              }}
              color={colors.WHITE900}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"1"}
              onClick={(event) => {
                setCurrentNetworkSelection("Arbitrum");
              }}
            >
              {"Arbitrum"}
            </MenuItem>
            {/* <MenuItem
              _focus={{
                bg: "red.800",
              }}
              color={colors.WHITE900}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"2"}
              onClick={(event) => {
                setCurrentNetworkSelection("Arbitrum Testnet");
              }}
            >
              {"Arbitrum Testnet"}
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "red.800",
              }}
              color={colors.WHITE900}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"3"}
              onClick={(event) => {
                setCurrentNetworkSelection("Mumbai Testnet");
              }}
            >
              {"Mumbai Testnet"}
            </MenuItem> */}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
