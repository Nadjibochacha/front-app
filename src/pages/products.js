import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Product from '../components/productpage';
import product from '../images/product.jpg';
import product1 from '../images/product1.jpg';
import product2 from '../images/product2.jpg';
import product3 from '../images/product4.jpg';
import './products.css';

const Products = () => {
  return (
    <div>
      <Header/>
      <div id='products' className='container'>      
        <div id='dietary' className='m-4 title'>Dietary supplements</div>
        <div className='row'>
                <Product title='something1' src ={product} price="20" />
                <Product title='something2' src ={product1} price="31" />
                <Product title='something3' src ={product2} price="53" />
                <Product title='something4' src ={product3} price="26" />
        </div>
        <div id='paraph' className='m-4 title'>Parapharmaceuticals</div>
        <div className='row'>
                <Product title='something1' src ={product} price="20" />
                <Product title='something2' src ={product1} price="31" />
                <Product title='something3' src ={product2} price="53" />
                <Product title='something4' src ={product3} price="26" />
        </div>
        <div id='pharma' className='m-4 title'>Pharmaceuticals</div>
        <div className='row'>
                <Product title='something1' src ={product} price="20" />
                <Product title='something2' src ={product1} price="31" />
                <Product title='something3' src ={product2} price="53" />
                <Product title='something4' src ={product3} price="26" />
        </div>
        <div id='pain' className='m-4 title'>Pain and fever relievers</div>
        <div className='row'>
                <Product title='something1' src ={product} price="20" />
                <Product title='something2' src ={product1} price="31" />
                <Product title='something3' src ={product2} price="53" />
                <Product title='something4' src ={product3} price="26" />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Products;
