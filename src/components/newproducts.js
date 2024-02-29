import React from 'react';
import './newProducts.css';
import Product from './partes/product';
import product from '../images/product.jpg';
import product1 from '../images/product1.jpg';
import product2 from '../images/product2.jpg';
import product3 from '../images/product4.jpg';
import Button from 'react-bootstrap/esm/Button';

const Newproducts = () => {
    return (
       <div id='new' className='mt-4'>
            <div className='title'>products</div>
            <div className='row mt-3'>
                <Product title='something1' state='new' src ={product} price="20" />
                <Product title='something2' state='new' src ={product1} price="31" />
                <Product title='something3' state='new' src ={product2} price="53" />
                <Product title='something4' state='new' src ={product3} price="26" />
            </div>
            <div className='row mt-3'>
                <Product title='something1' state='-30%' src ={product} price="20" />
                <Product title='something2' state='-30%' src ={product1} price="31" />
                <Product title='something3' state='-30%' src ={product2} price="53" />
                <Product title='something4' state='-30%' src ={product3} price="26" />
            </div>
            <Button variant='' className='btn-orange mt-4' href='/products'>all products</Button>
       </div>
    )
}

export default Newproducts;
