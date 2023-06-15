//EXTENSION
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Box,
  MenuItem,
  Checkbox,
  Text,
} from "@chakra-ui/react";

//ASSETS
import { colors, positions, variants } from "../../assets/constants";

//HOOKS
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFilterContext } from "../../hooks/useFilter";
import { useUserContext } from "../../hooks/useUser";

export const ListFilterDropdown = ({
  includeOpenInMenu = false,
  includeCancelledInMenu = false,
  onlyMyGamesInMenu = false,
  onlyMyCommunitiesInMenu = false,
  disabled = false,
}) => {
  const { setSelectedFilter } = useFilterContext();
  const { wallet } = useUserContext();
  const [onlyMyGames, setOnlyMyGames] = useState(false);
  const [onlyMyCommunities, setOnlyMyCommunities] = useState(false);
  const [includeOpen, setIncludeOpen] = useState(true);
  const [includeRunning, setIncludeRunning] = useState(true);
  const [includeEnded, setIncludeEnded] = useState(true);
  const [includeCancelled, setIncludeCancelled] = useState(true);

  useEffect(() => {
    setSelectedFilter({
      onlyMyGames: onlyMyGames,
      onlyMyCommunities: onlyMyCommunities,
      includeOpen: includeOpen,
      includeRunning: includeRunning,
      includeEnded: includeEnded,
      includeCancelled: includeCancelled,
    });
  }, [
    onlyMyGames,
    onlyMyCommunities,
    includeOpen,
    includeRunning,
    includeEnded,
    includeCancelled,
  ]);

  return (
    <Box>
      <Box>
        <Menu closeOnSelect={false}>
          <MenuButton
            disabled={disabled}
            size="sm"
            _active={{
              bg: "whiteAlpha.400",
            }}
            as={Button}
            color={"whiteAlpha.600"}
            bg={"whiteAlpha.100"}
            _hover={{ bg: "whiteAlpha.300" }}
          >
            <FaFilter />
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
              {onlyMyGamesInMenu && wallet && (
                <MenuItem
                  _focus={{
                    bg: "whiteAlpha.200",
                  }}
                  color={colors.WHITE900}
                  _hover={{ bg: "whiteAlpha.200" }}
                  autoFocus={false}
                  pt={1}
                  pb={1}
                  key={"1"}
                >
                  {
                    <Checkbox
                      onChange={(e) => setOnlyMyGames(e.target.checked)}
                      colorScheme={"white"}
                      isChecked={onlyMyGames}
                    >
                      <Text fontWeight={"semibold"}>Only my games</Text>
                    </Checkbox>
                  }
                </MenuItem>
              )}
              {onlyMyCommunitiesInMenu && (
                <MenuItem
                  _focus={{
                    bg: "whiteAlpha.200",
                  }}
                  color={colors.WHITE900}
                  _hover={{ bg: "whiteAlpha.200" }}
                  autoFocus={false}
                  pt={1}
                  pb={1}
                  key={"2"}
                >
                  {
                    <Checkbox
                      onChange={(e) => setOnlyMyCommunities(e.target.checked)}
                      isChecked={onlyMyCommunities}
                      colorScheme={"white"}
                    >
                      <Text fontWeight={"semibold"}>Only my communities</Text>
                    </Checkbox>
                  }
                </MenuItem>
              )}
              {includeOpenInMenu && (
                <MenuItem
                  _focus={{
                    bg: "whiteAlpha.200",
                  }}
                  color={colors.WHITE900}
                  _hover={{ bg: "whiteAlpha.200" }}
                  autoFocus={false}
                  pt={1}
                  pb={1}
                  key={"3"}
                >
                  <Checkbox
                    onChange={(e) => setIncludeOpen(e.target.checked)}
                    isChecked={includeOpen}
                    colorScheme={"white"}
                  >
                    <Text fontWeight={"semibold"}>Open</Text>
                  </Checkbox>{" "}
                </MenuItem>
              )}
              <MenuItem
                _focus={{
                  bg: "whiteAlpha.200",
                }}
                color={colors.WHITE900}
                _hover={{ bg: "whiteAlpha.200" }}
                autoFocus={false}
                pt={1}
                pb={1}
                key={"4"}
              >
                <Checkbox
                  onChange={(e) => setIncludeRunning(e.target.checked)}
                  isChecked={includeRunning}
                  colorScheme={"white"}
                  defaultChecked
                >
                  <Text fontWeight={"semibold"}>Running</Text>
                </Checkbox>{" "}
              </MenuItem>
              <MenuItem
                _focus={{
                  bg: "whiteAlpha.200",
                }}
                color={colors.WHITE900}
                _hover={{ bg: "whiteAlpha.200" }}
                autoFocus={false}
                pt={1}
                pb={1}
                key={"5"}
              >
                <Checkbox
                  onChange={(e) => setIncludeEnded(e.target.checked)}
                  isChecked={includeEnded}
                  colorScheme={"white"}
                  defaultChecked
                >
                  <Text fontWeight={"semibold"}>Ended</Text>
                </Checkbox>{" "}
              </MenuItem>
              {includeCancelledInMenu && (
                <MenuItem
                  _focus={{
                    bg: "whiteAlpha.200",
                  }}
                  color={colors.WHITE900}
                  _hover={{ bg: "whiteAlpha.200" }}
                  autoFocus={false}
                  pt={1}
                  pb={1}
                  key={"6"}
                >
                  <Checkbox
                    onChange={(e) => setIncludeCancelled(e.target.checked)}
                    isChecked={includeCancelled}
                    colorScheme={"white"}
                  >
                    <Text fontWeight={"semibold"}>Cancelled</Text>
                  </Checkbox>{" "}
                </MenuItem>
              )}
            </Box>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
