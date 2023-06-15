//EXTENSION
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Center, Circle } from "@chakra-ui/react";
import { borders, sizes } from "../assets/constants";

//ASSETS

export const JazziconIcon = ({ address, size = "xl" }) => {
  const weight = size === sizes.XL ? "120px" : "60px";
  const dia = size === sizes.XL ? 100 : 50;
  const border = size === sizes.XL ? borders.JAZZICONXL : borders.JAZZICONMD;

  return (
    <>
      {address && (
        <Circle width={weight} height={weight} border={border} mt={1}>
          <Center>
            <Jazzicon diameter={dia} seed={jsNumberForAddress(address)} />
          </Center>
        </Circle>
      )}
    </>
  );
};
