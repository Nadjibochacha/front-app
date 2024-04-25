import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const AddVend = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    function handlSubmit (even){
        even.preventDefault();
        axios.post('http://localhost:3006/maçna§g2er°/create10SallER',{name,email,role})
        .then(res =>{
            console.log(res);
            navigate('/maçna§g2er°');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-blue justify-content-center align-items-center'>
        <form onSubmit={handlSubmit} className='p-4 form bg-light rounded-2'>
            <h2 className='text-center text-uppercase'>add User</h2>
            <div>
                <label className='mb-2 mt-2'>Name</label>
                <input className='w-100 ' required type='text' placeholder='Medication Name' onChange={e=> setName(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Email</label>
                <input className='w-100 ' required type='email' placeholder='Type' onChange={e=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Role</label>
                <select className='w-100' onChange={e=> setRole(e.target.value)}>
                    <option value="vendeur">Seller</option>
                    <option value="fornisseur">delivery</option>
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