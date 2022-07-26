import { VscChromeClose } from "react-icons/vsc";
import { BsCircle } from "react-icons/bs";

const Square: React.FC<any> = ({
  endGame,
  handleChoiceSquare,
  refAllSquares,
}) => {
  return (
    <>
      <h2 className="text-score">{endGame? `Click the button and go to the next round.` : 'The round now in progress ...'}</h2>
      <div className={endGame ? "area blocked" : "area"}>
        {refAllSquares.current.map((square: any) => {
          const { id, clicked, player } = square;
          return (
            <div
              className={clicked ? "square blocked" : "square"}
              data-id={clicked ? `${id}-clicked` : id}
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
    </>
  );
};

export default Square;
