import { GamePage } from "../components/GamePage";
import { CreateSumoGame } from "../components/GameModals/CreateSumoGame";
import { SumoGameCard } from "../components/GameCards/SumoGameCard";
import { BonsaiBetSlip } from "../components/BetSlips/BonsaiBetSlip";
import gradient from "../assets/gradient.png";
import whale from "../assets/whale.png";

const chance = new Chance(); // instantiate

export const Sumo = () => {
  return (
    <GamePage
      gameName={"SUMŌ"}
      // gameSlogan={"Biggest whale wins."}
      gameSlogan={"‎"}
      gameDescription={
        null
        // "Whoever deposits the most funds before the timer runs out, wins the pot."
      }
      headerBg={gradient}
      headerImage={whale}
      GameCard={SumoGameCard}
      CreateGame={CreateSumoGame}
      openGames={chance.integer({ min: 1, max: 10 })}
      runningGames={chance.integer({ min: 10, max: 20 })}
      endedGames={chance.integer({ min: 20, max: 100 })}
      BetSlip={BonsaiBetSlip}
      commingSoon={true}
    />
  );
};
