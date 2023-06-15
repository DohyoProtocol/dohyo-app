//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

//HOOKS
import { useHistory } from "react-router-dom";

export const NavGamesDropdown = () => {
  const history = useHistory();

  return (
    <Box>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          m={3}
          fontSize={sizes.SM}
          as={Button}
          color={"red.600"}
          bg={colors.WHITE100}
          _hover={{ bg: colors.WHITE300 }}
        >
          {"Games"}
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
                history.push("/bonsai");
              }}
            >
              {"Bōnsai"}
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
                history.push("/kami");
              }}
            >
              {"Kami"}
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
                history.push("/luffy");
              }}
            >
              {"Luffy"}
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
                history.push("/shimo");
              }}
            >
              {"Shimō"}
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
              key={"katana"}
              onClick={(event) => {
                history.push("/katana");
              }}
            >
              {"Katana"}
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
              key={"sumo"}
              onClick={(event) => {
                history.push("/sumo");
              }}
            >
              {"Sumō"}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
