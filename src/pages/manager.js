import shopp from '../images/logo.png';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { TbLogout } from "react-icons/tb";
import './manager.css';
const Manager = () => {
  function showTab(i) {
    let tabs = document.getElementsByClassName('tab');
    for (let index = 0; index < 5; index++) {
      tabs[index].classList.add('d-none');
    }
    tabs[i].classList.remove('d-none');
  }
  const [command, setCommand] = useState([]);
  const [forn, setForn] = useState([]);
  const [vendeur, setVendeur] = useState([]);
  const [prod, setProd] = useState([]); // Initialize with an empty array
  useEffect(() => {
      axios.get("http://localhost:3006/maçna§g2er°/stor-§age")
        .then(res => setProd(res.data))
        .catch(err => console.log(err));
      axios.get("http://localhost:3006/maçna§g2er°/com§and§d")
        .then(res => setCommand(res.data))
        .catch(err => console.log(err));
      axios.get("http://localhost:3006/maçna§g2er°/S§all§Er")
        .then(res => setVendeur(res.data))
        .catch(err => console.log(err));
  }, []);
  const handelDelete = async (id)=> {
    try{
      await axios.delete("http://localhost:3006/maçna§g2er°/d§el§et§eProd/"+id);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  
  let dateNow = new Date();
  
  return (
    <div id='manager' className='row justify-content-between'>
      <div className='globl-title col-lg-2 col-3'>
        <div className='logo'>
          <img src={shopp} alt='logo'/>
          <h5 >SalCo pharmacy</h5>
        </div>
        <ul className='mt-3'>
          <li onClick={()=>showTab(0)}><span>manage storage</span></li>
          <li onClick={()=>showTab(1)}><span>establish purchase order</span></li>
          <li onClick={()=>showTab(2)}><span>consult sale</span></li>
          <li onClick={()=>showTab(3)}><span>manage sellers</span></li>
          <li onClick={()=>showTab(4)}><span>manage deliveries</span></li>
          <li><span><a href='/login' className='btn btn-danger w-100 text-uppercase'>logout <TbLogout/></a></span></li>
        </ul>
      </div>
      <div className='content col-9 p-0'>
        <div className='title'>
          <h1 >manager dashboard</h1>
        </div>
        <div id='' className='tab storage d-none'>
          <h2 className='text-uppercase'>manage storage</h2>
          <div className='bg-white p-2 m-1'>
            <a href='/maçna§g2er°/create10meQd' className='btn btn-success w-25'>Add +</a>
            {
              Array.isArray(prod) && prod.length >0 ? (
                <table className='table'>
                  <thead>
                    <tr className='text-capitalize'>
                      <th>id</th>
                      <th>name</th>
                      <th>countity</th>
                      <th>expiration</th>
                      <th>catigory</th>
                      <th colSpan={2}>operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      prod.map((data,i)=>{
                        <tr key={i}>
                          <td>{i}</td>
                          <td>{data.name}</td>
                          <td>{data.count}</td>
                          {(dateNow.getFullYear - Number(data.exp)) > 20 ? (
                            <td className=''>{data.exp}</td>
                          ):(
                            <td className='text-danger'>{data.exp}</td>
                          )
                          }
                          
                          <td>{data.cat}</td>
                          <td><a href={`/maçna§g2er°/upda12teProd/${data.id}`} className='btn btn-primary'>Update</a></td>
                          <td><button className='btn btn-danger' onClick={e=>handelDelete(data.id)}>Delete</button></td>
                        </tr>
                      })
                    } 
                  </tbody>
                </table>
              ):(
                <p>No product data available</p>
              )
            }
          </div>
        </div>
        <div id='' className='tab order d-none'>
          <h2 className='text-uppercase'>establish purchase order</h2>
          <div className='bg-white p-2 m-1'>
            <a href='/maçna§g2er°/create10meQd' className='btn btn-success w-25'>Add Order +</a>
            {
              Array.isArray(command) && command.length >0 ?(
                <table className='table'>
                  <thead>
                    <tr className='text-capitalize'>
                      <th>id</th>
                      <th>name</th>
                      <th>countity</th>
                      <th>expiration</th>
                      <th>catigory</th>
                      <th colSpan={2}>operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      command.map((data , i)=>{

                      })
                    }
                  </tbody>
                </table>
              ):(
                <p>No command data available </p>
              )
            }
          </div>
        </div>
        <div id='' className='tab sale d-none'>
          <h2 className='text-uppercase'>consult sale</h2>
          <div className='bg-white p-2 m-1'>

          </div>
        </div>
        <div id='' className='tab seller d-none'>
          <h2 className='text-uppercase'>manage sellers</h2>
          <div className='bg-white p-2 m-1'>
            <a href='/maçna§g2er°/create10SallER' className='btn btn-success w-25'>Add +</a>
            {
              Array.isArray(vendeur) && vendeur.length > 0 ? (
                <table className='table'>
                  <thead>
                    <tr className='text-capitalize'>
                      <th>id</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      vendeur.map((data, i)=>{
                        <tr>
                          <td>{i}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>
                            <a href={`/maçna§g2er°/upda12te10SallER/${i}`} className='btn btn-primary text-capitalize'>Update</a>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              ):(
                <p> No user data available</p>
              )
            }
            
          </div>
        </div>
        <div id='' className='tab seller d-none'>
          <h2 className='text-uppercase'>manage deliveries</h2>
          <div className='bg-white p-2 m-1'>
            <a href='/maçna§g2er°/create10meQd' className='btn btn-success w-25'>Add +</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager;