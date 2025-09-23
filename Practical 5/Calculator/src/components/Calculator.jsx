import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const result = Function('"use strict";return (' + input + ")")();
      setInput(result.toString());
    } catch (err) {
      setInput("Error", err);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />

      <div className="buttons">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) =>
          btn === "=" ? (
            <button key={btn} onClick={handleCalculate}>
              {btn}
            </button>
          ) : (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          )
        )}
        <button className="clear" onClick={handleClear}>
          C
        </button>
      </div>
    </div>
  );
}

export default Calculator;
