import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateKatanaGame } from "../components/GameModals/CreateKatanaGame";
import { KatanaGameCard } from "../components/GameCards/KatanaGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import gradient from "../assets/gradient.png";
import katana from "../assets/katana.png";
import { ExplainBonsaiGame } from "../components/GameModals/ExplainBonsaiGame";

const chance = new Chance(); // instantiate

export const Katana = () => {
  return (
    <>
      <GamePage
        gameName={"KATANA"}
        headerBg={gradient}
        headerImage={katana}
        GameCard={KatanaGameCard}
        CreateGame={CreateKatanaGame}
        ExplainGame={ExplainBonsaiGame}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
