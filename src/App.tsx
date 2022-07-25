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

  const refAllSquares = useRef<any>(squares)
  const refComputerChoices = useRef<any>(null)

  // useEffect(() => {
  //   if(!myTurn) computerMovement()
  // },[myTurn])


  // Function responsible for choising a square by a human.
  const handleChoiceSquare = (e: any) => {
    const idElement = parseInt(e.target.dataset.id);
    if (idElement) setMyTurn(true);
    const changeClickedElement = refAllSquares.current.map((square: any) => {
      const { id, clicked } = square;
      if (id === idElement && !clicked) {
        return { ...square, clicked: true, player: "human" };
      }
      return square;
    });
    setAllsquares(changeClickedElement);
    refAllSquares.current = changeClickedElement
    const checkNumberInSquare = refAllSquares.current.filter((el: any) => el.clicked === false);
    refComputerChoices.current = checkNumberInSquare
    console.log(refComputerChoices.current)
  };

  // Function responsible for choosing a square by a computer.
  const computerMovement = () => {
    const random = Math.floor(Math.random() * refComputerChoices.current.length);
      const randomNumber = refComputerChoices.current[random].id;
      const changeClickedElementComp = refAllSquares.current.map((square: any) => {
        const { id, clicked } = square;
        if (id === randomNumber && !clicked) {
          return { ...square, clicked: true, player: "computer" };
        }
        return square;
      });
      setAllsquares(changeClickedElementComp);
      refAllSquares.current = changeClickedElementComp;
  };

  return (
    <div className="container">
      <Square
        allSquares={allSquares}
        endGame={endGame}
        handleChoiceSquare={handleChoiceSquare}
        refAllSquares={refAllSquares}
      />
      {/* <Results
        matchResults={matchResults}
        endGame={endGame}
      /> */}
      <button onClick={computerMovement}>klik</button>
    </div>
  );
}

export default App;
