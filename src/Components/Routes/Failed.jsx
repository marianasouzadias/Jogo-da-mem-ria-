import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import triste from '../../img/triste.jpeg';
import Button from '../Button/Button';
import gameOver from '../../Mp3/gameOver.mp3';

import './ResultStyles.css';


const Failed = () => {

    const navigate = useNavigate();
    const handleRestartClick = () => {
        navigate("/")
    };

    useEffect(() => {
        const audioOver = new Audio(gameOver);
        audioOver.play();

        return() => {
          
            audioOver.currentTime = 0;
};    
    },[])
    

    return (
        <section className='container'>
            <h1>TEMPO ESGOTADO! VOCÊ PERDEU!</h1>
            <img src={triste} alt="Padrinhos magicos triste" />
            <Button onRestart={handleRestartClick} buttonType="restart"/>
        </section>
    );
}

export default Failed;

