import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BirthdayRemainder } from "./components/BirthdayRemainder/BirthdayRemainder";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Birthday Remainder */}
      <div className="sections">
        <h1>Birthday Remainder</h1>
        <BirthdayRemainder />
      </div>
      <div className="sections"></div>
      <div className="sections"></div>
      <div className="sections"></div>
      <div className="sections"></div>
    </div>
  );
}

export default App;
