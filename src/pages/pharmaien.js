import './pharmacy.css';
import shopp from '../images/logo.png';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { TbLogout } from "react-icons/tb";
const Pharmaien = () => {
    const [med, setMed] = useState([]); // Initialize with an empty array
    useEffect(() => {
        axios.get("http://localhost:3006/")
            .then(res => setMed(res.data))
            .catch(err => console.log(err));
    }, []);
    const handelDelete = async (id)=> {
        try{
            await axios.delete("http://localhost:3006/delete/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div id='pharmacy'>
      <div className='globl-title row justify-content-between w-100 align-items-center ps-4 pe-4'>
        <div className='col-3'>
          <img src={shopp} alt='logo'/>
          <h5 >SalCo pharmacy</h5>
        </div>
        <div className='col-6'>
          <h3 >pharmacien dashboard</h3>
        </div>
        <div className='col-2'><a href='/' className='btn btn-danger'><TbLogout/>logout</a></div>
      </div>
        <div className='content container pt-2 pb-2'>
          <h2 className='text-uppercase'>establish the list of approved medications</h2>
          <div className='bg-white p-2 rounded-2'>
            <a href='/create10meQd' className='btn btn-success w-25 mb-4'>Add +</a>
            {Array.isArray(med) && med.length > 0 ? ( 
                    <table className='table mt-2'>
                        <thead>
                            <tr>
                              <th>id</th>
                              <th>medication</th>
                              <th>type</th>
                              <th>disease</th>
                              <th colSpan={2}>operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {med.map((data, i) => (
                                <tr key={i}>
                                    <td className='ms-2'>{i}</td>
                                    <td className='ms-4'>{data.name}</td>
                                    <td className='ms-4'>{data.type}</td>
                                    <td className='ms-4'>{data.disease}</td>
                                    <td><a href={`/upda12te-med/${data.id}`} className='btn btn-primary me-2 ms-2'>modify</a></td>
                                    <td><button onClick={e=>handelDelete(data.id)} className='btn btn-danger'>delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No medication data available</p>
                )}
          </div>
        </div>
    </div>
  )
}

export default Pharmaien;
