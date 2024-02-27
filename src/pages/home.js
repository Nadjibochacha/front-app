import React from 'react'
import Header from '../components/header';
import Slider from '../components/slider';
import About from '../components/about';
import Newproducts from '../components/newproducts';

const Home = () => {
  return (
    <div>
        <Header/>
        <Slider/>
        <About/>
        <Newproducts/>
    </div>
  )
}

export default Home;
