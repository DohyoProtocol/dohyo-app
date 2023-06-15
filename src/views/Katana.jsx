import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateKatanaGame } from "../components/GameModals/CreateKatanaGame";
import { KatanaGameCard } from "../components/GameCards/KatanaGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import gradient from "../assets/gradient.png";
import katana from "../assets/katana.png";

const chance = new Chance(); // instantiate

export const Katana = () => {
  return (
    <>
      <GamePage
        gameName={"KATANA"}
        // gameSlogan={"Last bid wins."}
        gameSlogan={"‎"}
        gameDescription={
          null
          // "Place a bid to extend the timer by 20 minutes. If the timer runs out, the last bidder wins the pot."
        }
        headerBg={gradient}
        headerImage={katana}
        GameCard={KatanaGameCard}
        CreateGame={CreateKatanaGame}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
