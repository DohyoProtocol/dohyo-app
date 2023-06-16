// example.spec.js
import Chance from "chance";
import { GamePage } from "../components/GamePage";

import { CreateLuffyGame } from "../components/GameModals/CreateLuffyGame";
import { LuffyGameCard } from "../components/GameCards/LuffyGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import scale from "../assets/scale.png";

const chance = new Chance(); // instantiate
import gradient from "../assets/gradient.png";
import { ExplainBonsaiGame } from "../components/GameModals/ExplainBonsaiGame";

export const Luffy = () => {
  return (
    <>
      <GamePage
        gameName={"LUFFY"}
        headerBg={gradient}
        headerImage={scale}
        GameCard={LuffyGameCard}
        CreateGame={CreateLuffyGame}
        ExplainGame={ExplainBonsaiGame}
        openGames={chance.integer({ min: 1, max: 10 })}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
