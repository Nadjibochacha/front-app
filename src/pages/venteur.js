import shopp from '../images/logo.png';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { TbLogout } from "react-icons/tb";
import './manager.css';

const Venteur = () => {
  function showTab(i) {
    let tabs = document.getElementsByClassName('tab');
    for (let index = 0; index < 5; index++) {
      tabs[index].classList.add('d-none');
    }
    tabs[i].classList.remove('d-none');
  }
  return (
    <div id='vendeur' className='row justify-content-between'>
      <div className='globl-title col-lg-2 col-3'>
        <div className='logo'>
          <img src={shopp} alt='logo'/>
          <h5 >SalCo pharmacy</h5>
        </div>
        <ul className='mt-3'>
          <li onClick={()=>showTab(0)}><span>free sale</span></li>
          <li onClick={()=>showTab(1)}><span>sale with prescription</span></li>
          <li onClick={()=>showTab(2)}><span>sale using CHIFA card</span></li>
          <li><span><a href='/login' className='btn btn-danger w-100 text-uppercase'>logout <TbLogout/></a></span></li>
        </ul>
      </div>
      <div className='content col-9 p-0'>
        <div className='title'>
          <h1 >seller dashboard</h1>
        </div>
      </div>
    </div>
  )
}

export default Venteur;
