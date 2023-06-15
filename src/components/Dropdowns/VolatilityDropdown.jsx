//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

const bets = [
  "-12% or more",
  "between -12% and -6%",
  "between -6% and +6%",
  "between +6% and +12%",
  "+12% or more",
];

export const VolatilityDropdown = ({ getter, setter }) => {
  //HOOKENTRY GET_VOLATILIIES
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
          {bets[getter]}
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
              key={"0"}
              onClick={(event) => {
                setter(0);
              }}
            >
              {"-12% or more"}
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
              key={"1"}
              onClick={(event) => {
                setter(1);
              }}
            >
              {"between -12% and -6%"}
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
              key={"2"}
              onClick={(event) => {
                setter(2);
              }}
            >
              {"between -6% and +6%"}
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
                setter(3);
              }}
            >
              {"between +6% and +12%"}
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
              key={"4"}
              onClick={(event) => {
                setter(4);
              }}
            >
              {"+12% or more"}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
