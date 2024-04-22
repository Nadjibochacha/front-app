import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyMed = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [disease, setDisease] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    function handlUpdate (even){
        even.preventDefault();
        axios.put('http://localhost:3006/upda12te-med/'+id,{name,type,disease})
        .then(res =>{
            console.log(res);
            navigate('/pharmacien');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <form onSubmit={handlUpdate} className='p-4 form bg-light rounded-2'>
            <h2 className='text-center text-uppercase'>Update medication</h2>
            <div>
                <label className='mb-2 mt-2'>Medication Name</label>
                <input className='w-100 ' type='text' placeholder='Medication Name' onChange={e=> setName(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Type</label>
                <input className='w-100 ' type='text' placeholder='Type' onChange={e=> setType(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Disease</label>
                <input className='w-100 ' type='text' placeholder='Disease' onChange={e=> setDisease(e.target.value)}/>
            </div>
            <div className='mt-3'>
                <button className='btn btn-success p-1 me-2 ps-2 pe-2' type='submit'>Update</button>
                <button className='btn btn-danger p-1 ps-2 pe-2' type='reset'>Reset</button>
            </div>
        </form>
    </div>
  )
}

export default ModifyMed