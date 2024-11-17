
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './routes/Home';
import Nav from './components/Nav';
import Signup from './routes/Signup';
import Total from './routes/Total';
import Login from './routes/Login';
import axios from 'axios';
import {createContext,useState} from 'react';
import Info from './components/Info';
import Note from './components/Note';
import Total2 from './routes/Total2';



export const MyContext = createContext();

function App() {
  const dbselect=()=>{
    axios.get("")
  }
  const [value,setValue] = useState('로그인');
  

  
  
  return (
    <MyContext.Provider value={{value,setValue}}> 
      <Router>
        <Nav />
        
        <hr/>
        {value==='로그인'?null:<Note/>}
          <Routes>
            {/* <Route exact path="/" element={<Home/>} /> */}
            
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/' element={<Total/>}/>
            <Route exact path='/total2' element={<Total2/>}/>
          </Routes>
        
      </Router>
    </MyContext.Provider>
  );
}



export default App;
