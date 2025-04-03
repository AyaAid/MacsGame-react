import { useState } from 'react';
import './App.css';

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
    same: '🍎',
    different: '🍌',
  };

  const [differentIndex, setDifferentIndex] = useState(Math.floor(Math.random() * 3));
  const [positions, setPositions] = useState([0, 1, 2]);

  const handleClick = () => {
    let newDifferentIndex;
    do {
      newDifferentIndex = Math.floor(Math.random() * 3);
    } while (newDifferentIndex === differentIndex);

    setDifferentIndex(newDifferentIndex);

    const shuffled = [...positions].sort(() => Math.random() - 0.5);
    setPositions(shuffled);
  };

  return (
    <div className="screen" onClick={handleClick}>
      {positions.map((pos, i) => (
        <div key={i} className="column">
          <span className="icon">
            {pos === differentIndex ? icons.different : icons.same}
          </span>
        </div>
      ))}
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