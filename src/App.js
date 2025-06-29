import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

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
  let cards = [...values, ...values];
  cards = shuffleArray(cards);
  
  console.log(cards);
  return (
    <div className='card-container'>
      {cards.map(card => <Card value={card} isFlipped={true} />)}  
    </div>
    );
}

export default App;
