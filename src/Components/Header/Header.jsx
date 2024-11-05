import logo from '../../img/logo/icon-logo.png';
import Button from '../Button/Button';
import './Header.scss';

const Header = ({ timer, handleStart}) => {
    return (
        <header className="app-header">
            <img src={logo} alt="Logo do jogo" className="logo" />
            <nav>
                <div className="title-timer-container">
                    <h1>Jogo da Memória</h1>
                    <section className="timer-container">
                        <div className="timer-box">
                            <div className="timer">
                                {timer !== null ? `00:${timer < 10 ? '0' + timer : timer}` : '00:60'}
                            </div>
                        </div>
                    </section>
                    <Button onStart={handleStart} buttonType="start"/>
                </div>
            </nav>
        </header>
    );
};

export default Header;
