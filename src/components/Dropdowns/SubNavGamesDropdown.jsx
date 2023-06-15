//EXTENSION
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Box,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";
import { useFilterContext } from "../../hooks/useFilter";

const gamesNames = ["Bōnsai", "Shimō", "Katana", "Kami", "Sumō", "Luffy"];

export const SubNavGamesDropdown = ({}) => {
  const { setSelectedGame, selectedGame } = useFilterContext();
  return (
    <Box>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          fontSize={sizes.SM}
          size="sm"
          as={Button}
          color={"whiteAlpha.600"}
          bg={"whiteAlpha.100"}
          _active={{
            bg: "whiteAlpha.400",
          }}
          _hover={{ bg: "whiteAlpha.300" }}
        >
          <Text fontSize={"md"} fontWeight={"bold"}>
            {gamesNames[selectedGame]}
          </Text>
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
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE900}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"bonsai"}
              onClick={(event) => {
                setSelectedGame(0);
              }}
            >
              <Text fontWeight={"semibold"}>{"Bōnsai"}</Text>
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE500}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"shimo"}
              onClick={(event) => {
                // setSelectedGame(1);
              }}
            >
              <Text fontWeight={"semibold"}>{"Shimō (coming soon)"}</Text>
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE500}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"katana"}
              onClick={(event) => {
                // setSelectedGame(2);
              }}
            >
              <Text fontWeight={"semibold"}>{"Katana (coming soon)"}</Text>
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE500}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"kami"}
              onClick={(event) => {
                // setSelectedGame(3);
              }}
            >
              <Text fontWeight={"semibold"}>{"Kami (coming soon)"}</Text>
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE500}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"sumo"}
              onClick={(event) => {
                // setSelectedGame(4);
              }}
            >
              <Text fontWeight={"semibold"}>{"Sumō (coming soon)"}</Text>
            </MenuItem>
            <MenuItem
              _focus={{
                bg: "whiteAlpha.200",
              }}
              color={colors.WHITE500}
              _hover={{ bg: "whiteAlpha.200" }}
              autoFocus={false}
              pt={1}
              pb={1}
              key={"luffy"}
              onClick={(event) => {
                // setSelectedGame(5);
              }}
            >
              <Text fontWeight={"semibold"}>{"Luffy (coming soon)"}</Text>
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
