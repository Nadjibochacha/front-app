import React, { useEffect, useState } from 'react';
import './addCommnd.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCommdM() {
    const [product, setProduct] = useState([]);
    const [fourn, setFourn] = useState([])
    const values = {
        paiment: '',
        fournisseur: ''
    }   
    const navigate = useNavigate();
    let billprod = [];
    let command = document.getElementById('cmd');
    let item = {
        name:'',
        count : 1
    }
    function generateUniqueCommand() {
        var randomNumber = Math.floor(Math.random() * 9000);
        var timestamp = new Date; 
        var uniqueNumber = timestamp.getDay().toString() + randomNumber.toString();
    
        return uniqueNumber;
    }
    useEffect(() => {
        axios.get("http://localhost:3006/pharmacien")
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));

        axios.get("http://localhost:3006/manager/delivery")
            .then((res) => setFourn(res.data))
            .catch((err) => console.log(err));
    }, [])
    let num ='';
    const reset = () => {
        billprod = [];
        command.innerHTML =` `;
        num = '';
    }

    const addItem = (i) => {
        item.name = product[i].name;
        billprod.push(item);
        item = {name:'',count : 1};
        command.innerHTML =``;
        billprod.forEach(element => {
           command.innerHTML += `
            <tr>
              <td>${element.name} </td>
              <td>${element.count}</td>
            </tr>`
          });
    }

    const handleAddBill = async (event) => {
        event.preventDefault();
        num = (generateUniqueCommand());
        try {
        await Promise.all(billprod.map(element =>
            axios.post("http://localhost:3006/manager/create-command", {element,num,values})
        )).then(res=>{
            // console.log(num);
            window.alert('inserted :)');
            navigate('/manager');
            reset();
        })
        } catch (err) {
            console.error("An error occurred:", err);
        }
    }

  return (
    <div className='command'>
        <div className='row ps-1 pe-1' >
            <div className='col-8'>
                <div className='title'>
                    Add Order 
                </div>
                <div className='bg-white'>
                    {
                        Array.isArray(product) && product.length > 0 ? (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th colSpan={3}>product name</th>
                                        <th>count</th>
                                        <th>add to card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((element,i) => (
                                            <tr key={i}>
                                                <td colSpan={3}>{element.name}</td>
                                                <td><input className='input w-25' min={1} onChange={e => item.count= e.target.value} type='number'/></td>
                                                <td><button className='btn btn-success' onClick={() => addItem(i)}>Add to Cart</button></td>
                                            </tr>
                                        ))
                                        
                                    }
                                    
                                </tbody>
                            </table>
                        ):(
                            <p className='p-2'>No product data available </p>
                        )
                    }
                </div>
            </div>
            <div className='col-4'>
                <div className='bill'>
                    <div className=' title'>bill</div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>count</th>
                            </tr>
                        </thead>
                        <tbody id='cmd'>
                        </tbody>
                    </table>
                    <div className='row  bg-white p-3 m-0'>
                        <form onSubmit={handleAddBill}>
                            <div className='form-group mt-1'>
                                <label>delivery</label>
                                <select className='form-control' onChange={e=> values.fournisseur = e.target.value}>
                                    <option>Select</option>
                                    {
                                        Array.isArray(fourn) && fourn.length > 0? (
                                            fourn.map((data,i)=>(
                                                <option key={i} value={data.id_ut}>{data.email}</option>
                                            ))
                                        ):(
                                            <option>No data available</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='date'>paiment mode</label>
                                <select className='form-control mt-1' onChange={e=> values.paiment = e.target.value} >
                                    <option>Select</option>
                                    <option value="online">online</option>
                                    <option value="offline">offline</option>
                                </select>
                            </div>
                            <div className='row justify-content-around bg-white p-1 m-0'>
                                <button className='btn btn-success text-uppercase col-4' type='submit'>send</button>
                                <div className='btn btn-danger text-uppercase col-4' onClick={reset}>reset</div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default AddCommdM;