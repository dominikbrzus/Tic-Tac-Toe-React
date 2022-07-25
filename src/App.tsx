import "./App.css";
import { useState, useEffect, useRef } from "react";
import { squares } from "./data/Data";
import Square from "./components/Square";
import Results from "./components/Results";
import { TypingSquares, ResultMatch } from "./data/Interfaces";

const resultsGame = {
  humanScore: 0,
  computerScore: 0,
  round: 1,
};

function App() {
  const [allSquares, setAllsquares] =
    useState<TypingSquares["squares"]>(squares);

  const [myTurn, setMyTurn] = useState<boolean>(true);

  const [computerChoices, setComputerChoices] =
    useState<TypingSquares["squares"]>(squares);

  const [matchResults, setMatchResults] = useState<ResultMatch>(resultsGame);

  const [endGame, setEndGame] = useState<boolean>(false);

  const refAllSquares = useRef<any>(squares);
  const refComputerChoices = useRef<any>(squares);

  useEffect(() => {
    if (!myTurn && !endGame) {
      computerMovement();
      setMyTurn(true);
    }
  }, [myTurn]);

  // Function responsible for choising a square by a human.
  const handleChoiceSquare = (e: any) => {
    const idElement = parseInt(e.target.dataset.id);
    const changeClickedElement = refAllSquares.current.map((square: any) => {
      const { id, clicked } = square;
      if (id === idElement && !clicked) {
        return { ...square, clicked: true, player: "human" };
      }
      return square;
    });
    setAllsquares(changeClickedElement);
    refAllSquares.current = changeClickedElement;
    const checkNumberInSquare = refAllSquares.current.filter(
      (el: any) => el.clicked === false
      );
      refComputerChoices.current = checkNumberInSquare;
      setMyTurn(false);
      checkResult();
  };

  // Function responsible for choosing a square by a computer.
  const computerMovement = () => {
    if (refComputerChoices.current.length !== 0) {
      const random = Math.floor(
        Math.random() * refComputerChoices.current.length
      );
      const randomNumber = refComputerChoices.current[random].id;
      const changeClickedElementComp = refAllSquares.current.map(
        (square: any) => {
          const { id, clicked } = square;
          if (id === randomNumber && !clicked) {
            return { ...square, clicked: true, player: "computer" };
          }
          return square;
        }
      );
      setAllsquares(changeClickedElementComp);
      refAllSquares.current = changeClickedElementComp;
    }
    checkResult();
  };

  const checkResult = () => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winner.length; i++) {
      const [a, b, c] = winner[i];
      if (
        refAllSquares.current[a].player === "human" &&
        refAllSquares.current[b].player === "human" &&
        refAllSquares.current[c].player === "human"
      ) {
        setMatchResults({
          ...matchResults,
          humanScore: matchResults.humanScore + 1,
        });
        setEndGame(true);
      } else if (
        refAllSquares.current[a].player === "computer" &&
        refAllSquares.current[b].player === "computer" &&
        refAllSquares.current[c].player === "computer"
      ) {
        setMatchResults({
          ...matchResults,
          computerScore: matchResults.computerScore + 1,
        });
        setEndGame(true);
      } else if (refComputerChoices.current.length === 0) {
        setMatchResults({ ...matchResults });
        setEndGame(true);
      }
    }
  };

  const nextRound = () => {
    refAllSquares.current = squares
    refComputerChoices.current = squares
    setMatchResults({ ...matchResults, round: matchResults.round + 1 });
    setEndGame(false);
    setMyTurn(true)
  };

  return (
    <div className="container">
      <Square
        allSquares={allSquares}
        endGame={endGame}
        nextRound={nextRound}
        handleChoiceSquare={handleChoiceSquare}
        refAllSquares={refAllSquares}
      />
      <Results
        matchResults={matchResults}
        endGame={endGame}
        nextRound={nextRound}
      />
    </div>
  );
}

export default App;
