import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [cat, setCat] = useState('');
    const [exp, setExp] = useState('');
    const navigate = useNavigate();
    function handlSubmit (even){
        even.preventDefault();
        axios.post('http://localhost:3006/maçna§g2er°/create10meQd',{name,count,exp,cat})
        .then(res =>{
            console.log(res);
            navigate('/maçna§g2er°');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-blue justify-content-center align-items-center'>
        <form onSubmit={handlSubmit} className='p-4 form bg-light rounded-2'>
            <h2 className='text-center text-uppercase'>add product</h2>
            <div>
                <label className='mb-2 mt-2'>Product Name</label>
                <input className='w-100 ' type='text' placeholder='' required onChange={e=> setName(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Countity</label>
                <input className='w-100 ' type='text' placeholder='' required onChange={e=> setCount(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Expiration</label>
                <input className='w-100 ' type='date' placeholder='' required onChange={e=> setExp(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Catigory</label>
                <input className='w-100 ' type='text' placeholder='' required onChange={e=> setCat(e.target.value)}/>
            </div>
            <div className='mt-3'>
                <button className='btn btn-success p-1 me-2 ps-2 pe-2' type='submit'>Add</button>
                <button className='btn btn-danger p-1 ps-2 pe-2' type='reset'>Reset</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct;