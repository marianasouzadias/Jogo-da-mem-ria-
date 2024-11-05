import './Button.scss'

const Button = ({onStart, onRestart, buttonType}) => {

   
  return(
        <section className="container-button">
          {buttonType === 'start' && (
        <button onClick={onStart} className='button'>INICIAR</button>
      )} 
      {buttonType === 'restart' && (
        <button  onClick={onRestart}  className='button-restart'>TENTAR NOVAMENTE</button>
      )}
        </section>
    )
}

export default Button;