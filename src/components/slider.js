import React from 'react';
import './slider.css';
import Carousel from 'react-bootstrap/Carousel';
import pic1 from '../images/pic1.jpg';
import pic2 from '../images/pic2.jpg';
import pic3 from '../images/pic3.jpg';

const Slider = () => {
  return (
    <Carousel data-bs-theme="dark" id='slide' className='container'>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pic1}
            alt="First slide"
            />
            <Carousel.Caption className='caption'>
                <h3>SalCo Pharmacy</h3>
                <p>Your trusted destination for quality healthcare solutions</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pic2}
            alt="Second slide"
            />
            <Carousel.Caption className='caption'>
                <h3>SalCo Pharmacy</h3>
                <p>Explore our wide range of medications, and health products tailored to meet your wellness needs</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pic3}
            alt="Third slide"
            />
            <Carousel.Caption className='caption'>
                <h3>SalCo Pharmacy</h3>
                <p>
                    Discover convenience, reliability, and compassion today
                </p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}

export default Slider;
