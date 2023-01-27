import { Fragment, useState } from "react";
import { calculateExpression } from "../helper";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const calcOperators = ["+", "-", "×", "÷"];
const equalSign = "=";
const clear = "C";

const Calculator = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculate = () => {
    if (!value) {
      setError("Please enter a value first");
    } else {
      setError("");
      const results = calculateExpression(value);
      setValue(results);
    }
  };

  const clearValue = () => setValue("");

  return (
    <div>
      <h1>Calculator App</h1>
      <p>{error}</p>
      <input
        type="text"
        defaultValue={value}
        placeholder="type in your values"
        disabled
      />
      <div role="grid">
        {rows.map((row, i) => {
          return (
            <Fragment key={row.toString()}>
              <div role="row">
                {i === 3 && <button onClick={clearValue}>{clear}</button>}
                {row.map((n) => {
                  return (
                    <button
                      key={n}
                      onClick={() => setValue(value.concat(n.toString()))}
                    >
                      {n}
                    </button>
                  );
                })}
                {i === 3 && <button onClick={calculate}>{equalSign}</button>}
              </div>
            </Fragment>
          );
        })}
        {calcOperators.map((c) => {
          return (
            <button key={c} onClick={() => setValue(value.concat(c))}>
              {c.toString()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
