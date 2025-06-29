import './App.css';
import Card from './components/Card';
import { useState, useEffect } from 'react';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const values = ["🐶", "🐱", "🐼", "🦊", "🐵", "🐸", "🐷", "🐥"];
  const [cards, setCards] = useState(() => shuffleArray([...values, ...values]));
  const [flipped, setFlipped] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);
  const [movesCount, setMovesCount] = useState(0);
  const [pairFound, setPairFound] = useState(0);
  const [victory, setVictory] = useState(false);

  const handleClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matchedCard.includes(index)) {
      setFlipped(prev => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      const firstValue = cards[firstIndex];
      const secondValue = cards[secondIndex];

      setMovesCount(prev => prev + 1);

      if (firstValue === secondValue) {
        setMatchedCard(prev => [...prev, firstIndex, secondIndex]);
        setPairFound(prev => prev + 1);
        setFlipped([]); 
      } else {
        const timeout = setTimeout(() => {
          setFlipped([]);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [flipped,matchedCard,cards]);

  useEffect(() => {
  if (pairFound === values.length) {
    alert("Victory!");
    setVictory(true);
  }
  }, [pairFound, values.length]);


  const restartGame = () => {
    setVictory(false);
    setMatchedCard([]);
    setMovesCount(0);
    setPairFound(0);
    setCards(() => shuffleArray([...values, ...values]));
  }

  const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '12px',
  maxWidth: '400px', // was 600px before
  margin: '0 auto',
  padding: '10px',
  };

  return (
    <div>
      <div className="moves-counter">
        <p>Moves Done: {movesCount}</p>
      </div>

      {victory && (
        <div className="victory-screen">
          <h1 className="victory-title">Congratulations! 🎉</h1>
          <p className="victory-subtitle">You completed the game in <strong>{movesCount}</strong> moves.</p>
          <button className="victory-button" onClick={restartGame}>
            🔁 Play Again
        </button>
        </div>
    )}


      <div className='card-container' style={gridStyle}>
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={flipped.includes(index) || matchedCard.includes(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
