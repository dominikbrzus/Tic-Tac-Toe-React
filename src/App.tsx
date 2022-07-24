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

  const [myTurn, setMyTurn] = useState<boolean>(false);

  const [computerChoices, setComputerChoices] =
    useState<TypingSquares["squares"]>(squares);

  const [matchResults, setMatchResults] = useState<ResultMatch>(resultsGame);

  const [endGame, setEndGame] = useState<boolean>(false);
  
  useEffect(() => {
    checkResult();
  }, [allSquares]);
  
  useEffect(() => {
    if (!myTurn) return;
    else if (myTurn) {
      computerMovement();
    }
  }, [computerChoices]);

  useEffect(() => {
    const checkNumberInSquare = allSquares.filter((el) => el.clicked === false);
    setComputerChoices(checkNumberInSquare);
    if (computerChoices.length === 1) setComputerChoices(allSquares);
  }, [allSquares]);


  // useEffect(() => {
  //   // const modulo = matchResults.round
    // if(matchResults.round % 2) setMyTurn(false)
    // else if (matchResults.round % 3) setMyTurn(true)
  // },[endGame])

  // Function responsible for choising a square by a human.
  const handleChoiceSquare = (e: any) => {
    const idElement = parseInt(e.target.dataset.id);
    if (idElement) setMyTurn(true);
    const changeClickedElement = allSquares.map((square) => {
      const { id, clicked } = square;
      if (id === idElement && !clicked) {
        return { ...square, clicked: true, player: "human" };
      }
      return square;
    });
    setAllsquares(changeClickedElement);
  };

  // Function responsible for choosing a square by a computer.
  const computerMovement = () => {
      const random = Math.floor(Math.random() * computerChoices.length);
      const randomNumber = computerChoices[random].id;
      const changeClickedElementComp = allSquares.map((square) => {
        const { id, clicked } = square;
        if (id === randomNumber && !clicked) {
          return { ...square, clicked: true, player: "computer" };
        }
        return square;
      });
      setAllsquares(changeClickedElementComp);

    setMyTurn(false);
  };

  const nextRound = () => {
    setAllsquares(squares);
    setComputerChoices(allSquares);
    setMatchResults({ ...matchResults, round: matchResults.round + 1 });
    setEndGame(false);
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
        allSquares[a].player === "human" &&
        allSquares[b].player === "human" &&
        allSquares[c].player === "human"
      ) {
        setMatchResults({
          ...matchResults,
          humanScore: matchResults.humanScore + 1,
        });
        setEndGame(true);
      } else if (
        allSquares[a].player === "computer" &&
        allSquares[b].player === "computer" &&
        allSquares[c].player === "computer"
      ) {
        setMatchResults({
          ...matchResults,
          computerScore: matchResults.computerScore + 1,
        });
        setEndGame(true);
      } 
      
      else if (computerChoices.length <= 1) {
        // setMatchResults({ ...matchResults });
        setEndGame(true);
      }
    }
  };

  return (
    <div className="container">
      <Square
        allSquares={allSquares}
        endGame={endGame}
        handleChoiceSquare={handleChoiceSquare}
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
