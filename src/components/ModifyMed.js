import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './form.css';
const ModifyMed = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    function handlUpdate (even){
        even.preventDefault();
        axios.put('http://localhost:3006/pharmacien/update-medication/'+id,{name,type})
        .then(res =>{
            console.log(res);
            navigate('/pharmacien');
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-blue justify-content-center align-items-center'>
        <form onSubmit={handlUpdate} className='p-4 form bg-light rounded-2'>
            <h2 className='text-center text-uppercase'>Update medication</h2>
            <div>
                <label className='mb-2 mt-2'>Medication Name</label>
                <input className='w-100 ' required type='text' placeholder='Medication Name' onChange={e=> setName(e.target.value)}/>
            </div>
            <div>
                <label className='mb-2 mt-2'>Type</label>
                <select className="input w-100 p-1" onChange={e=> setType(e.target.value)} required>
                    <option >Select Type</option>
                    <option value="with">By prescription</option>
                    <option value="without">Without prescription</option>
                </select>
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