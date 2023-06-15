//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

//HOOKS
import { useHistory } from "react-router-dom";

export const NavCommunitiesDropdown = ({ createOnOpen, verifyOnOpen }) => {
  const history = useHistory();

  return (
    <>
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
            {"Communities"}
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
                key={"mycommunities"}
                onClick={(event) => {
                  history.push("/mycommunities");
                }}
              >
                {"My Communities"}
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
                key={"allcommunities"}
                onClick={(event) => {
                  history.push("/allcommunities");
                }}
              >
                {"All Communities"}
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
                key={"creaetecommunity"}
                onClick={(event) => {
                  createOnOpen();
                }}
              >
                {"Create Community"}
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
                key={"verifycommunity"}
                onClick={(event) => {
                  verifyOnOpen();
                }}
              >
                {"Verify Community"}
              </MenuItem>
            </Box>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
