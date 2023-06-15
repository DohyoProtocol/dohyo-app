//EXTENSION
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, HStack, Spinner, TagLeftIcon, Text, VStack } from "@chakra-ui/react";

//ASSETS
import { colors, positions, toastTypes, weights } from "../assets/constants";

//HOOKS
import { useToast } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export const useToastHook = () => {
  //This hook is used to create a toast notification

  const [state, setState] = useState(null);
  const toast = useToast();
  const toastIdRef = useRef();

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  useEffect(() => {
    if (state) {
      const { message, status, duration } = state;

      const accentColor =
        status === toastTypes.ERROR || status === toastTypes.RELOADING
          ? colors.RED200
          : status === toastTypes.SUCCESS
          ? colors.GREEN200
          : colors.BLUE200;

      toastIdRef.current = toast({
        duration: duration,
        position: positions.TOP,
        render: () => (
          <Box
            onClick={() => {
              closeToast();
            }}
            rounded={"10px"}
            color={colors.BLACK900}
            border={`2px solid`}
            borderColor={accentColor}
            p={3}
            bg={colors.BLACK900}
          >
            <HStack alignItems={positions.FLEXSTART}>
              {status === toastTypes.CONFIRMING || status === toastTypes.RELOADING ? (
                <Spinner color={accentColor} />
              ) : (
                <TagLeftIcon
                  color={accentColor}
                  boxSize="20px"
                  mt={2}
                  as={status === toastTypes.ERROR ? WarningIcon : CheckCircleIcon}
                />
              )}
              <VStack alignItems={positions.FLEXSTART}>
                <Text color={colors.WHITE900} fontWeight={weights.BOLD}>
                  {status}
                </Text>
                <Text color={colors.WHITE900}>{message}</Text>
              </VStack>
            </HStack>
          </Box>
        ),
      });
    }
    // eslint-disable-next-line
  }, [state, toast]);

  const newToast = (message, status, duration = 3000) => {
    setState({ message, status, duration });
  };

  return { newToast, closeToast };
};
