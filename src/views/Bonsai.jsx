import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateBonsaiGame } from "../components/GameModals/CreateBonsaiGame";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import { BonsaiGameCard } from "../components/GameCards/BonsaiGameCard";
import { ExplainBonsaiGame } from "../components/GameModals/ExplainBonsaiGame";
import gradient from "../assets/gradient.png";
import bonsai from "../assets/bonsai.png";

export const Bonsai = () => {
  return (
    <>
      <GamePage
        gameName={"BŌNSAI"}
        headerBg={gradient}
        headerImage={bonsai}
        GameCard={BonsaiGameCard}
        BetSlip={BonsaiBetSlip}
        CreateGame={CreateBonsaiGame}
        ExplainGame={ExplainBonsaiGame}
      />
    </>
  );
};
