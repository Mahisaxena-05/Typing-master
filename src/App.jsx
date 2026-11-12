
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const text =
    "The quick brown fox jumps over the lazy dog. Practice makes perfect. Keep learning and improve your typing speed every day.";

  const [typed, setTyped] = useState("");
  const [time, setTime] = useState(60);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, time]);

  const handleChange = (e) => {
    if (time === 0) return;
    setTyped(e.target.value.slice(0, text.length));
    setStarted(true);
  };

  const restart = () => {
    setTyped("");
    setTime(60);
    setStarted(false);
  };

  const correct = typed
    .split("")
    .filter((char, i) => char === text[i]).length;

  const wrong = typed.length - correct;

  const accuracy = typed.length
    ? Math.round((correct / typed.length) * 100)
    : 100;

  const elapsed = 60 - time;
  const wpm = elapsed > 0
    ? Math.round(correct / 5 / (elapsed / 60))
    : 0;

  return (
    <div className="app">
      <header>
        <h1>⌨ Typing Master</h1>
        <p>Practice your typing and improve your speed!</p>
      </header>

      <main className="container">
        <div className="stats">
          <div className="stat">
            <h2>{time}s</h2>
            <p>Time Left</p>
          </div>

          <div className="stat">
            <h2>{wpm}</h2>
            <p>WPM</p>
          </div>

          <div className="stat">
            <h2>{accuracy}%</h2>
            <p>Accuracy</p>
          </div>
        </div>

        <div className="extra-stats">
          <p>Correct: <span>{correct}</span></p>
          <p>Incorrect: <span>{wrong}</span></p>
        </div>

        <h3>Type the following text:</h3>

        <div className="sample">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={
                i < typed.length
                  ? typed[i] === char
                    ? "correct"
                    : "wrong"
                  : ""
              }
            >
              {char}
            </span>
          ))}
        </div>

        <textarea
          placeholder="Start typing here..."
          value={typed}
          onChange={handleChange}
          disabled={time === 0}
        />

        <button onClick={restart}>↻ Restart Test</button>

        {time === 0 && (
          <div className="result">
            <h2>Test Completed! 🎉</h2>
            <p>Your Typing Speed: {wpm} WPM</p>
            <p>Your Accuracy: {accuracy}%</p>
          </div>
        )}
      </main>

      <footer>
        <p>Typing Master | Keep Practicing, Keep Improving!</p>
      </footer>
    </div>
  );
}

export default App;
