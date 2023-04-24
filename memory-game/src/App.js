import { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import Card from './components/Card';
import './App.css';

const images = [
  'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1268129/pexels-photo-1268129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3509971/pexels-photo-3509971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1064162/pexels-photo-1064162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2055389/pexels-photo-2055389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

function App() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const shuffledImages = shuffle([...images, ...images]);
    const initialCards = shuffledImages.map((image, index) => ({
      id: index,
      image,
      matched: false,
    }));
    setCards(initialCards);
  }, []);

  const handleCardClick = (card) => {
    if (selected.length === 0) {
      setSelected([card]);
    } else if (selected.length === 1) {
      if (selected[0].id === card.id) {
        return;
      }
      setSelected([...selected, card]);
      if (selected[0].image === card.image) {
        setCards(cards.map(c => c.id === selected[0].id || c.id === card.id ? { ...c, matched: true } : c));
        setSelected([]);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
  };

  const matchedCards = cards.filter(card => card.matched);

  return (
    <div className="app">
      <h1>Memory Matching Game</h1>
      <div className="board">
        {cards.map(card => (
          <Card
            key={card.id}
            image={card.matched ? null : card.image}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      {matchedCards.length === cards.length && (
        <div className="win-message">Congratulations! You matched all the cards!</div>
      )}
    </div>
  );
}

export default App;