import React from 'react';
import './newProducts.css';
import Product from './partes/product';
import product from '../images/product.jpg';
import product1 from '../images/product1.jpg';
import product2 from '../images/product2.jpg';
import product3 from '../images/product4.jpg';

const Newproducts = () => {
    return (
       <div id='new' className='mt-4'>
            <div className='title'>new products</div>
            <div className='row mt-3'>
                <Product title='something1' src ={product} price="20" />
                <Product title='something2' src ={product1} price="31" />
                <Product title='something3' src ={product2} price="53" />
                <Product title='something4' src ={product3} price="26" />
            </div>
       </div>
    )
}

export default Newproducts;
