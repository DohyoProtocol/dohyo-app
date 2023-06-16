import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateKamiGame } from "../components/GameModals/CreateKamiGame";
import { KamiGameCard } from "../components/GameCards/KamiGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";

const chance = new Chance(); // instantiate
import gradient from "../assets/gradient.png";
import computer from "../assets/computer.png";
import { ExplainBonsaiGame } from "../components/GameModals/ExplainBonsaiGame";

export const Kami = () => {
  return (
    <>
      <GamePage
        gameName={"KAMI"}
        headerBg={gradient}
        headerImage={computer}
        GameCard={KamiGameCard}
        CreateGame={CreateKamiGame}
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
