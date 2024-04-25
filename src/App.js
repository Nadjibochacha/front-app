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
import AddProduct from './components/addProduct';
import UpdateProd from './components/updateProd';
import AddVend from './components/AddVend';
import UpdateUser from './components/UpdateUser';

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
        <Route path='/maçna§g2er°/create10meQd' element={<AddProduct/>}/>
        <Route path='/maçna§g2er°/upda12teProd/:id' element={<UpdateProd/>}/>
        <Route path='/maçna§g2er°/create10SallER' element={<AddVend/>}/>
        <Route path='/maçna§g2er°/upda12te10SallER/:id' element={<UpdateUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
