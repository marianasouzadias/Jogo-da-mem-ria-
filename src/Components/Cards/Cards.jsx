import { useState, useEffect } from 'react';
import './Cards.scss';
import verseCard from '../../img/cards/verseCard.jpeg';

const Cards = ({ cards, shouldShuffle, onCardClick}) => {
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    if (shouldShuffle) {
      setShuffling(true);
      const timer = setTimeout(() => setShuffling(false), 1200); // Duração da animação
      return () => clearTimeout(timer);
    }
  }, [shouldShuffle]);

  return (
    <section className="cards-container">
      {cards.map((card, index) => {
        const isLeftGroup = Math.floor(index / 6) % 2 === 0; // Define se a linha é par ou ímpar
        return (
          <div
            className={`card ${shuffling ? (isLeftGroup ? 'shuffle-left' : 'shuffle-right') : ''}`}
            key={index}
            style={{
              animationDelay: `${index * 100}ms`, // Adiciona atraso para cada carta
            }}
          >
            <img
              src={card.visible ? card.src : verseCard}
              alt={`Card ${index + 1}`}
              className="card-img"
              onClick={() => onCardClick(card)}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Cards;





