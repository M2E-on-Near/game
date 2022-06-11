import React, {useState} from "react";
import './App.css';
import Game from "./game";
import GameBot from "./gameBot";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [jumpTrigger, setJumpTrigger] = useState(false);
    return (
    <div className="App" onClick={() => setJumpTrigger(t => !t)}>
      <header className="App-header">
        <h1>Dino 🦕</h1>
          <h3>Score: {score}</h3>
          {!isGameStarted && <button onClick={()=>setIsGameStarted(true)}>Start</button> }
          <Game isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} setScore={setScore} jumpTrigger={jumpTrigger} />
          <GameBot isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} setScore={setScore} jumpTrigger={jumpTrigger} />
      </header>
    </div>
  );
}

export default App;
