//EXTENSION
import { Button, Menu, MenuButton, MenuList, Box, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

//ASSETS
import { colors, positions, variants, sizes } from "../../assets/constants";

export const CommunityOnlyDropdown = ({ getter, setter, communitiesArray = [] }) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          disabled
          rightIcon={<ChevronDownIcon />}
          fontSize={sizes.SM}
          as={Button}
          variant={"outline"}
          size={"sm"}
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
            {communitiesArray.map((community, index) => {
              return (
                <MenuItem
                  _focus={{
                    bg: "red.800",
                  }}
                  _hover={{ bg: "red.800" }}
                  autoFocus={false}
                  pt={1}
                  color={colors.WHITE900}
                  pb={1}
                  key={index}
                  onClick={(event) => {
                    setter(community);
                  }}
                >
                  {community}
                </MenuItem>
              );
            })}
          </Box>
        </MenuList>
      </Menu>
    </Box>
  );
};
