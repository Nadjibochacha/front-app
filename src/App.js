import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Pharmaien from './pages/pharmaien';
import Venteur from './pages/venteur';
import Login from './pages/login';
import Products from './pages/products';
import Sign from './pages/sign';
import CreateMedic from './components/CreateMedic';
import ModifyMed from './components/ModifyMed';
import Manager from './pages/manager';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element ={<Home/>} />
        <Route path='/pharmacien' element ={<Pharmaien/>} />
        <Route path='/vendeur' element ={<Venteur/>} />
        <Route path='/login' element ={<Login/>} />
        <Route path='/sign' element ={<Sign/>} />
        <Route path='/products' element ={<Products/>} />
        <Route path='/create10meQd' element={<CreateMedic/>}/>
        <Route path='/upda12te-med/:id' element={<ModifyMed/>}/>
        <Route path='/maçna§g2er°' element={<Manager/>}/>
      </Routes>
    </div>
  );
}

export default App;
