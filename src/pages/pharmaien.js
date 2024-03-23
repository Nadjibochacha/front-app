import React from 'react';
import './pharmacy.css';
import shopp from '../images/logo.png';
import { FcStatistics } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Pharmaien = () => {
  return (
    <div id='pharmacy'>
        <div className='menu'>
          <div className='name'>
            <img src={shopp} alt=''/>
            <h3>SalCo pharmacy</h3> 
          </div>
          <ul className=''>
            <li>
              <a href=''><FcStatistics /><span> statistics</span></a> 
            </li>
            <li><a href=''><MdProductionQuantityLimits/><span>products</span></a></li>
            <li><a href=''><FaUserCircle/><span>users</span></a></li>
            <li>
              <a href=''><FcStatistics /><span> statistics</span></a> 
            </li>
            <li><a href=''><MdProductionQuantityLimits/><span>products</span></a></li>
            <li><a href=''><FaUserCircle/><span>users</span></a></li>
          </ul>
        </div>
        <div className='content w-100'>
          <div className='globl-title'>
            <h3 >pharmacy dashboard</h3>
            <p>A quick data overview of the inventory.</p>
          </div>
        </div>
    </div>
  )
}

export default Pharmaien;
