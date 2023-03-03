import React from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  function generaterandom() {
    let random = Math.ceil(Math.random() * 6);
    return (random = {
      value: random,
      isHeld: false,
      id: nanoid(),
    });
  }

  function allNewDice() {
    let randomarr = [];
    for (let i = 0; i < 10; i++) {
      randomarr.push(generaterandom());
    }
    return randomarr;
  }

  const [dice, setDice] = React.useState(allNewDice);
  let diceElement = dice.map((element) => (
    <Die
      key={element.id}
      value={element.value}
      isHeld={element.isHeld}
      handleClick={() => holdDice(element.id)}
    />
  ));

  let [count, setCount] = React.useState(0);

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice);
      setTenzies(false);
      setCount(-1);
    } else {
      setDice((prev) =>
        prev.map((ele) => {
          return ele.isHeld ? ele : generaterandom();
        })
      );
    }
    setCount((prevcount) => prevcount + 1);
  }

  function holdDice(id) {
    setDice((prev) => {
      return prev.map((ele) => {
        if (ele.id == id) ele.isHeld = !ele.isHeld;
        return ele;
      });
    });
  }

  let [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const held = dice.every((die) => (die.isHeld ? true : false));
    let checkvalue = dice[9].value;
    const valuecheck = dice.every((die) =>
      die.value == checkvalue ? true : false
    );

    if (held == true && valuecheck == true) {
      console.log("You Won!!!");
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dicecontainer">{diceElement}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti width={550} />}
      <p className="count">
        {tenzies ? `You won in ${count} rolls!!!` : `Roll Count:${count}`}
      </p>
    </main>
  );
}
