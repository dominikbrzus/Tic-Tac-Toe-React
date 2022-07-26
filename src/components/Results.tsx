import { BsFillPersonFill } from "react-icons/bs";
import { GrGamepad } from "react-icons/gr";
import { AiFillRobot } from "react-icons/ai";

const Results: React.FC<any> = ({ matchResults, endGame, nextRound}) => {
  return (
    <>
      <div className="results">
        <div className="results__human flex">
          <BsFillPersonFill className="results__icon" />
          <p className="results__text">Wins: {matchResults.humanScore}</p>
        </div>

        <div className="results__round flex">
          <GrGamepad className="results__icon" />
          <p className="results__text">Round: {matchResults.round}</p>
        </div>

        <div className="results__computer flex">
          <AiFillRobot className="results__icon" />
          <p className="results__text">Wins: {matchResults.computerScore}</p>
        </div>
      </div>
      {endGame ? <button className="btn"onClick={nextRound}>Next Round</button> : null}
    </>
  );
};

export default Results;
