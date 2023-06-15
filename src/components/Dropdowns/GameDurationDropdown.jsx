//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

export const GameDurationDropdown = ({ getter, setter }) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          fontSize={sizes.SM}
          as={Button}
          size={"sm"}
          variant={"outline"}
          _hover={{ bg: "red.700" }}
        >
          {getter}
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
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              color={colors.WHITE900}
              pb={1}
              key={"bonsai"}
              onClick={(event) => {
                setter("1 hour");
              }}
            >
              {"1 hour"}
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
              key={"shimo"}
              onClick={(event) => {
                setter("1 day");
              }}
            >
              {"1 day"}
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "red.800",
              }}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              color={colors.WHITE900}
              pt={1}
              pb={1}
              key={"katana"}
              onClick={(event) => {
                setter("1 week");
              }}
            >
              {"1 week"}
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "red.800",
              }}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              color={colors.WHITE900}
              pb={1}
              key={"kami"}
              onClick={(event) => {
                setter("1 month");
              }}
            >
              {"1 month"}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
