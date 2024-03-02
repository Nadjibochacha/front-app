import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Pharmaien from './pages/pharmaien';
import Venteur from './pages/venteur';
import Login from './pages/login';
import Products from './pages/products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>} />
        <Route path='/pharmacien' element ={<Pharmaien/>} />
        <Route path='/venteur' element ={<Venteur/>} />
        <Route path='/login' element ={<Login/>} />
        <Route path='/products' element ={<Products/>} />
      </Routes>
    </div>
  );
}

export default App;
