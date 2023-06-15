// example.spec.js
import Chance from "chance";
import { GamePage } from "../components/GamePage";

import { CreateLuffyGame } from "../components/GameModals/CreateLuffyGame";
import { LuffyGameCard } from "../components/GameCards/LuffyGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import scale from "../assets/scale.png";

const chance = new Chance(); // instantiate
import gradient from "../assets/gradient.png";

export const Luffy = () => {
  return (
    <>
      <GamePage
        gameName={"LUFFY"}
        gameSlogan={"2 tokens compete. 1 token wins."}
        gameDescription={
          null
          // "Bet on 1 of 2 tokens. After a game was started there is a 24 hours betting period. After 7 days, the token which has performed better gets calculated. Pot gets shared between winners proportionally to their bet size."
        }
        headerBg={gradient}
        headerImage={scale}
        GameCard={LuffyGameCard}
        CreateGame={CreateLuffyGame}
        openGames={chance.integer({ min: 1, max: 10 })}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
