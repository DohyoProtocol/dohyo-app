//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";
import { supportedTokensList } from "../../assets/supportedTokensList";

export const SupportedTokensDropdown = ({ getter, setter }) => {
  //HOOKENTRY GET_PARTNER_TOKENS

  return (
    <Box>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          fontSize={sizes.SM}
          as={Button}
          _active={{ bg: colors.WHITE100 }}
          variant={"outline"}
          size={"sm"}
          _hover={{ bg: colors.WHITE100 }}
        >
          {getter}
        </MenuButton>
        <MenuList
          variant={variants.OUTLINE}
          bgColor={colors.BLACK900}
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
            {supportedTokensList.map((token, index) => (
              <MenuItem
                _focus={{
                  bg: colors.WHITE100,
                }}
                color={colors.WHITE900}
                _hover={{ bg: colors.WHITE100 }}
                autoFocus={false}
                pt={1}
                pb={1}
                key={token.SYMBOL}
                onClick={(event) => {
                  setter(token.SYMBOL);
                }}
              >
                {token.SYMBOL}
              </MenuItem>
            ))}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
