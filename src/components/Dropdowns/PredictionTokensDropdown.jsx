//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, sizes, variants } from "../../assets/constants";

//HOOKS

export const PredictionTokensDropdown = ({ getter, setter }) => {
  //HOOKENTRY GET_PREDICTION_TOKENS
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
              color={colors.WHITE900}
              _hover={{ bg: "red.800" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"ARB"}
              onClick={(event) => {
                setter("ARB");
              }}
            >
              {"ARB"}
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
              key={"ETH"}
              onClick={(event) => {
                setter("ETH");
              }}
            >
              {"ETH"}
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
              key={"BTC"}
              onClick={(event) => {
                setter("BTC");
              }}
            >
              {"BTC"}
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
              key={"GRAIL"}
              onClick={(event) => {
                setter("GRAIL");
              }}
            >
              {"GRAIL"}
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
              key={"GMX"}
              onClick={(event) => {
                setter("GMX");
              }}
            >
              {"GMX"}
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
              key={"SUSHI"}
              onClick={(event) => {
                setter("SUSHI");
              }}
            >
              {"SUSHI"}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
