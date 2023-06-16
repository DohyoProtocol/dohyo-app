//EXTENSION
import { Button, Box, VStack } from "@chakra-ui/react";

//HOOKS
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useFilterContext } from "../../hooks/useFilter";

export const ListSortDropdown = ({ disabled = false }) => {
  const { selectedSortNewest, setSelectedSortNewest } = useFilterContext();

  return (
    <Box>
      <Box>
        <Button
          disabled={disabled}
          size="md"
          as={Button}
          color={"whiteAlpha.600"}
          bg={"whiteAlpha.100"}
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={() => setSelectedSortNewest(!selectedSortNewest)}
        >
          <VStack spacing={-3}>
            <ChevronUpIcon color={!selectedSortNewest ? "red.400" : null} boxSize={6} />
            <ChevronDownIcon
              color={selectedSortNewest ? "red.400" : null}
              p={0}
              m={0}
              boxSize={6}
            />
          </VStack>
        </Button>
      </Box>
    </Box>
  );
};
