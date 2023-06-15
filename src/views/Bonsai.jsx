import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateBonsaiGame } from "../components/GameModals/CreateBonsaiGame";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import { BonsaiGameCard } from "../components/GameCards/BonsaiGameCard";
import gradient from "../assets/gradient.png";
import bonsai from "../assets/bonsai.png";

export const Bonsai = () => {
  return (
    <>
      <GamePage
        gameName={"BŌNSAI"}
        gameDescription={
          "2 Players take turns in extending the game. When extending, a 24 hours deadline starts for the other player. If they dont't manage to extend in time, they lose the game."
        }
        gameSlogan={"Last man standing."}
        headerBg={gradient}
        headerImage={bonsai}
        GameCard={BonsaiGameCard}
        BetSlip={BonsaiBetSlip}
        CreateGame={CreateBonsaiGame}
      />
    </>
  );
};
