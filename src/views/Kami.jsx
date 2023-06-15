import Chance from "chance";

import { GamePage } from "../components/GamePage";
import { CreateKamiGame } from "../components/GameModals/CreateKamiGame";
import { KamiGameCard } from "../components/GameCards/KamiGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";

const chance = new Chance(); // instantiate
import gradient from "../assets/gradient.png";
import computer from "../assets/computer.png";

export const Kami = () => {
  return (
    <>
      <GamePage
        gameName={"KAMI"}
        gameSlogan={"Bid on price movement."}
        gameDescription={
          "Kami is a decentralized prediction market. There are 5 movement ranges you can bet on. After a game was started there is a 24 hours betting period. After 1 week the result is calculated and the pot gets shared between winners proportionally to their bet size."
        }
        headerBg={gradient}
        headerImage={computer}
        GameCard={KamiGameCard}
        CreateGame={CreateKamiGame}
        openGames={chance.integer({ min: 1, max: 10 })}
        runningGames={chance.integer({ min: 10, max: 20 })}
        endedGames={chance.integer({ min: 20, max: 100 })}
        BetSlip={BonsaiBetSlip}
        commingSoon={true}
      />
    </>
  );
};
