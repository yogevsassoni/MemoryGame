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
  }
  }, [pairFound, values.length]);


  const restartGame = () => {
    setMatchedCard([]);
    setMovesCount(0);
    setPairFound(0);
    setCards(() => shuffleArray([...values, ...values]));
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  };



  return (
    <div>
      <p style={{textAlign:'center'}}>
        moves done: {movesCount}
      </p>
      {pairFound === values.length && <button onClick={restartGame} style={{textAlign:'center'}}>
        restart game!
      </button>
      }
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
