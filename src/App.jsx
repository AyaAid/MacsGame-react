import { useState, useEffect, useMemo } from 'react';
import './App.css';
import useMQTT from './hooks/useMQTT';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {isPlaying ? (
        <Game />
      ) : (
        <Menu onStart={() => setIsPlaying(true)} />
      )}
    </>
  );
}

function Game() {
  const icons = {
    same: '😇',
    different: '😈',
  };

  const messages = useMQTT();
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [differentIndex, setDifferentIndex] = useState(0);
  const positions = useMemo(() => [0, 1, 2], []);

  const targetMap = useMemo(() => ({
    RCV1: 0,
    RCV2: 1,
    RCV3: 2,
  }), []);

  const gameMessage = messages['macs/game'];

useEffect(() => {
  if (!gameMessage) return;

  try {
    const gameMsg = JSON.parse(gameMessage);

    const newIndex = targetMap[gameMsg.target];
    if (newIndex === undefined) return;

    setDifferentIndex(newIndex);

    if (gameMsg.isCorrect) {
      const playerKey = gameMsg.player?.toLowerCase();
      const score = parseInt(gameMsg.score);

      if (playerKey && !isNaN(score)) {
        setScores((prev) => ({
          ...prev,
          [playerKey]: prev[playerKey] + score,
        }));
      }
    }
  } catch (err) {
    console.error('Error parsing macs/game message:', gameMessage, err);
  }
}, [gameMessage, targetMap]);

  return (
    <div className="game-container">
      <div className="scoreboard left">P1: {scores.p1} pts</div>

      <div className="screen">
        {positions.map((pos) => (
          <div key={pos} className="column">
            <span className="icon">
              {pos === differentIndex ? icons.different : icons.same}
            </span>
          </div>
        ))}
      </div>

      <div className="scoreboard right">P2: {scores.p2} pts</div>
    </div>
  );
}

function Menu({ onStart }) {
  return (
    <div className="menu-screen">
      <h1 className="title">MAC'S GAME</h1>
      <button className="start-button" onClick={onStart}>
        Commencer
      </button>
    </div>
  );
}

export default App;