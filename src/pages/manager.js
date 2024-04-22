import shopp from '../images/logo.png';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { TbLogout } from "react-icons/tb";

const Manager = () => {
  return (
    <div id='manager'>
      <div className='globl-title row justify-content-between w-100 align-items-center ps-4 pe-4'>
        <div className='col-3'>
          <img src={shopp} alt='logo'/>
          <h5 >SalCo pharmacy</h5>
        </div>
        <div className='col-6'>
          <h3 >manager dashboard</h3>
        </div>
        <div className='col-2'><a href='/' className='btn btn-danger'><TbLogout/>logout</a></div>
      </div>
      <div className='content container pt-2 pb-2'>
        
      </div>
    </div>
  )
}

export default Manager;