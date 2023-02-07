import { Calculator } from "./components";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [storedVal, setStoredVal] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleMemoryRecall = () => {
    if (storedVal) {
      setValue(storedVal);
    }
  };

  const handleMemoryStore = () => {
    if (value) {
      setStoredVal(value);
      setValue("");
    }
  };

  return (
    <div className="App">
      <Calculator
        handleMemoryStore={handleMemoryStore}
        handleMemoryRecall={handleMemoryRecall}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default App;
