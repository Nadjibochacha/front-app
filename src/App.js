import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Buy from './pages/buy';
import Pharmaien from './pages/pharmaien';
import Venteur from './pages/venteur';
import Login from './pages/login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>} />
        <Route path='/buy' element ={<Buy/>} />
        <Route path='/pharmacien' element ={<Pharmaien/>} />
        <Route path='/venteur' element ={<Venteur/>} />
        <Route path='/login' element ={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
