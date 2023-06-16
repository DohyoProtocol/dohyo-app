import Chance from "chance";

import { GamePage } from "../components/GamePage";

import { CreateShimoGame } from "../components/GameModals/CreateShimoGame";
import { ShimoGameCard } from "../components/GameCards/ShimoGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import { Spacer } from "@chakra-ui/react";
import gradient from "../assets/gradient.png";
import snipe from "../assets/snipe.png";
import { ExplainBonsaiGame } from "../components/GameModals/ExplainBonsaiGame";

const chance = new Chance(); // instantiate

export const Shimo = () => {
  return (
    <>
      <GamePage
        gameName={"SHIMŌ"}
        headerBg={gradient}
        headerImage={snipe}
        GameCard={ShimoGameCard}
        CreateGame={CreateShimoGame}
        ExplainGame={ExplainBonsaiGame}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
