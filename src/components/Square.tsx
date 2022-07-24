import { VscChromeClose } from "react-icons/vsc";
import { BsCircle } from "react-icons/bs";

const Square: React.FC<any> = ({ allSquares, endGame, handleChoiceSquare }) => {
  return (
    <div className={endGame ? "area blocked" : "area"}>
      {allSquares.map((square: any) => {
        const { id, clicked, player } = square;
        return (
          <div
            className={clicked ? "square blocked" : "square"}
            data-id={id}
            key={id}
            onClick={handleChoiceSquare}
          >
            {clicked ? (
              player === "human" ? (
                <VscChromeClose className="square__x" />
              ) : (
                <BsCircle className="square__o" />
              )
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Square;
