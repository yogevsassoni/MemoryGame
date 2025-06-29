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
  const [cards] = useState(() => shuffleArray([...values, ...values]));
  const [flipped, setFlipped] = useState([]);
  const [matchedCard, setMatchedCard] = useState([]);

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

      if (firstValue === secondValue) {
        setMatchedCard(prev => [...prev, firstIndex, secondIndex]);
        setFlipped([]); 
      } else {
        setFlipped([]);
      }
    }
  }, [flipped, cards]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  };

  return (
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
  );
}

export default App;
