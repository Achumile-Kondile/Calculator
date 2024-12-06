import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");
      setResult("");
    } else if (value === "DEL") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = eval(display.replace("√", "Math.sqrt"));
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "√") {
      setDisplay((prev) => `${prev}√`);
    } else if (value === "%") {
      try {
        const percentResult = parseFloat(display) / 100;
        setResult(percentResult);
        setDisplay(percentResult.toString());
      } catch {
        setResult("Error");
      }
    } else if (["sin", "cos", "tan", "log"].includes(value)) {
      try {
        const funcResult = {
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          log: Math.log10,
        }[value](parseFloat(display) * (value === "log" ? 1 : Math.PI / 180));
        setResult(funcResult);
        setDisplay(funcResult.toString());
      } catch {
        setResult("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`calculator ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="calculator-display">
        <div className="input">{display || "0"}</div>
        <div className="output">{result}</div>
      </div>
      <div className="calculator-buttons">
        {/* Standard Buttons */}
        <div className="button-row">
          {["C", "DEL", "%", "/"].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
        <div className="button-row">
          {["7", "8", "9", "*"].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
        <div className="button-row">
          {["4", "5", "6", "-"].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
        <div className="button-row">
          {["1", "2", "3", "+"].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
        <div className="button-row">
          {["0", ".", "√", "="].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
        {/* Advanced Buttons */}
        <div className="button-row">
          {["sin", "cos", "tan", "log"].map((btn) => (
            <button onClick={() => handleClick(btn)} key={btn}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
