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
import AddCommdM from './components/AddCommdM';
import Qrreader from './components/qrreader';

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
        <Route path='/pharmacien/create-medication' element={<CreateMedic/>}/>
        <Route path='/pharmacien/update-medication/:id' element={<ModifyMed/>}/>
        <Route path='/manager' element={<Manager/>}/>
        <Route path='/manager/create-product' element={<AddProduct/>}/>
        <Route path='/manager/update-product/:id' element={<UpdateProd/>}/>
        <Route path='/manager/create-seller' element={<AddVend/>}/>
        <Route path='/manager/update-seller/:id' element={<UpdateUser/>}/>
        <Route path='/manager/create-command' element={<AddCommdM/>}/>
        <Route path='/qr-reader' element={<Qrreader/>}/>
      </Routes>
    </div>
  );
}

export default App;
