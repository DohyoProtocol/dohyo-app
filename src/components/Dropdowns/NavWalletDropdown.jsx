//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

//HOOKS
import { useUserContext } from "../../hooks/useUser";
import { useMobileHook } from "../../hooks/useMobile";

export const NavWalletDropdown = ({ myWalletOnClick }) => {
  const { wallet, endSession } = useUserContext();
  const mobile = useMobileHook();

  return (
    <Box>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          m={3}
          mr={0}
          fontSize={sizes.SM}
          p={mobile ? 1 : undefined}
          as={Button}
          color={"red.600"}
          bg={colors.WHITE100}
          _hover={{ bg: colors.WHITE300 }}
        >
          {wallet?.account.slice(0, 5) + "..."}
        </MenuButton>
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
              key={"bonsai"}
              onClick={(event) => {
                myWalletOnClick(0);
              }}
            >
              {"Your Wallet"}
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
              key={"kami"}
              onClick={(event) => {
                myWalletOnClick(1);
              }}
            >
              {"Transaction History"}
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
              key={"luffy"}
              onClick={(event) => {
                endSession();
              }}
            >
              {"Logout"}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
