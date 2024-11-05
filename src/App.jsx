import { Routes, Route } from 'react-router-dom';
import GameLogic from './Components/GameLogic/GameLogic';
import Success from './Components/Routes/Success'
import Failed from './Components/Routes/Failed'
import './App.scss';


const App = () => {
    return (
        <div className="app-container">
           <Routes>
            <Route path='/' element={<GameLogic/>}/>
            <Route  path="/Success" element={<Success/>}/>
            <Route path="/Failed" element={<Failed/>}/>
           </Routes>
           
        </div>
    );
};

export default App;


 
    
  


