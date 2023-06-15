//HOOKS
import { useMediaQuery } from "@chakra-ui/react";

export const useMobileHook = () => {
  //The mobile hook is used to determine if the screen is mobile or not
  const [isLargerThan750] = useMediaQuery("(max-width: 750px)");
  return isLargerThan750;
};
