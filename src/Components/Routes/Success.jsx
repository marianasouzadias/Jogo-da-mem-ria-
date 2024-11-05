import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import feliz from '../../img/feliz.jpeg'; 
import Button from '../Button/Button';
import success from '../../Mp3/success.mp3';

import './ResultStyles.css';

const Success = () => {

    const navigate = useNavigate();
    const handleRestartClick = () => {
        navigate("/")
    };

    useEffect(() => {
        const audioVictory = new Audio(success);
        audioVictory.play();

        return() => {
            audioVictory.currentTime = 0;
};    
    },[])

    return (
        <section className='container'>
            <h1>PARABÉNS! VOCÊ VENCEU!</h1>
            <img src={feliz} alt="Padrinhos magicos feliz" />
            <Button onRestart={handleRestartClick} buttonType="restart"/>
        </section>
    );
}

export default Success;
