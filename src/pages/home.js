import React from 'react'
import Header from '../components/header';
import Slider from '../components/slider';
import About from '../components/about';
import Newproducts from '../components/newproducts';
import Comments from '../components/commentSection';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
        <Header/>
        <Slider/>
        <About/>
        <Newproducts/>
        <Comments/>
        <Footer/>
    </div>
  )
}

export default Home;
