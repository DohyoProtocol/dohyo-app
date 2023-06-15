import Chance from "chance";

import { GamePage } from "../components/GamePage";

import { CreateShimoGame } from "../components/GameModals/CreateShimoGame";
import { ShimoGameCard } from "../components/GameCards/ShimoGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import { Spacer } from "@chakra-ui/react";
import gradient from "../assets/gradient.png";
import snipe from "../assets/snipe.png";

const chance = new Chance(); // instantiate

export const Shimo = () => {
  return (
    <>
      <GamePage
        gameName={"SHIMŌ"}
        // gameSlogan={"Snipe the airdrop."}
        gameSlogan={"‎"}
        gameDescription={
          null
          // "Anyone can start a round by providing funds. After the timer runs out, anyone can simply withdraw these funds. Whoever manages to withdraw first, wins."
        }
        headerBg={gradient}
        headerImage={snipe}
        GameCard={ShimoGameCard}
        CreateGame={CreateShimoGame}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
