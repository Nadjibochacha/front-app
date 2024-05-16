import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const AddVend = () => {
    const [num, setNum] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("vendeur");
    const navigate = useNavigate();
    function handlSubmit (even){
        even.preventDefault();
        axios.post('http://localhost:3006/manager/create-seller',{num, email, password, role})
        .then(res =>{
            console.log(res);
            navigate('/manager');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-blue justify-content-center align-items-center'>
        <form onSubmit={handlSubmit} className='p-4 form bg-light rounded-2'>
            <h2 className='text-center text-uppercase'>add User</h2>
            <div>
                <label className='mb-2 mt-2'>Email</label>
                <input className='w-100 ' required type='email' placeholder='Email' onChange={e=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Password</label>
                <input className='w-100 ' required type='password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Phone number</label>
                <input className='w-100 ' required type='number' min={500000000} max={799999999}  onChange={e=> setNum(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Role</label>
                <select className='w-100' onChange={e => setRole(e.target.value)}>
                    <option value="vendeur">Seller</option>
                    <option value="fournisseur">Delivery</option>
                </select>
            </div>

            <div className='mt-3'>
                <button className='btn btn-success p-1 me-2 ps-2 pe-2' type='submit'>Add</button>
                <button className='btn btn-danger p-1 ps-2 pe-2' type='reset'>Reset</button>
            </div>
        </form>
    </div>
  )
}

export default AddVend;