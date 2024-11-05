import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import card1 from '../../img/cards/card1.jpeg';
import card2 from '../../img/cards/card2.jpeg';
import card3 from '../../img/cards/card3.jpeg';
import card4 from '../../img/cards/card4.jpeg';
import card5 from '../../img/cards/card5.jpeg';
import card6 from '../../img/cards/card6.jpeg';
import card7 from '../../img/cards/card7.jpeg';
import card8 from '../../img/cards/card8.jpeg';
import card9 from '../../img/cards/card9.jpeg';
import vinhetaMusic from "../../Mp3/music.mp3";
import Cards from '../Cards/Cards';
import Header from '../Header/Header';


const playMusic = new Audio(vinhetaMusic);
playMusic.loop = true;

const GameLogic = () => {
  const cardImages = [
    { src: card1, id: 1, visible: true },
    { src: card2, id: 2, visible: true },
    { src: card3, id: 3, visible: true },
    { src: card4, id: 4, visible: true },
    { src: card5, id: 5, visible: true },
    { src: card6, id: 6, visible: true },
    { src: card7, id: 7, visible: true },
    { src: card8, id: 8, visible: true },
    { src: card9, id: 9, visible: true },
  ];

  const duplicatedCardImages = cardImages.flatMap(card => [
    { ...card, uniqueId: Math.random() },
    { ...card, uniqueId: Math.random() }
  ]);

  const [cards, setCards] = useState(duplicatedCardImages.sort(() => Math.random() - 0.5));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const timerInterval = useRef(null);

  const handleStart = () => {
    setCards(prevCards => prevCards.map(card => ({ ...card, visible: false })));
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setTimer(60); 
    setGameStarted(true); 
    playMusic.play();
  };



  useEffect(() => {
    if (gameStarted) {
      timerInterval.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 1) {
            return prevTimer - 1; 
          } else {
            clearInterval(timerInterval.current); 
            handleGameEnd(false); 
            return 0;
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(timerInterval.current); 
  }, [gameStarted]);
  
  const resetSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const handleCardClick = (clickedCard) => {
    if (disabled || clickedCard.visible) return;

    setCards(prevCards => prevCards.map(card =>
      card.uniqueId === clickedCard.uniqueId ? { ...card, visible: true } : card
    ));

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else if (!secondCard) {
      setSecondCard(clickedCard);
      setDisabled(true);

      if (firstCard.id === clickedCard.id) {
        resetSelection();
      } else {
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => {
            if (card.uniqueId === firstCard.uniqueId || card.uniqueId === clickedCard.uniqueId) {
              return { ...card, visible: false };
            }
            return card;
          }));
          resetSelection();
        }, 1000);
      }
    }
  };

  const checkWinCondition = () => cards.every(card => card.visible === true);

  const handleGameEnd = (hasWon) => {
    setGameStarted(false);
    playMusic.pause();
    playMusic.currentTime = 0;
    
    
    setTimeout(() => {
      navigate(hasWon ? "/Success" : "/Failed");
    }, 2000);
  };
  
  useEffect(() => {
    if (gameStarted && checkWinCondition()) {
      handleGameEnd(true); 
    }
  }, [cards, gameStarted, navigate]);

  return (
    <>
      <Header
        handleStart={handleStart}
        timer={timer}
      />
      <Cards cards={cards} onCardClick={handleCardClick} />
    </>
  );
};

export default GameLogic;


