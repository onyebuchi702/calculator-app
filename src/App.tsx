import Logo from "./logo.svg";
import { Calculator } from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <img src={Logo} alt="logo" className={"App-logo"} />
      <Calculator />
    </div>
  );
};

export default App;
