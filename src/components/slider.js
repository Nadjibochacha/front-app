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
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pic2}
            alt="Second slide"
            />
            <Carousel.Caption className='caption'>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pic3}
            alt="Third slide"
            />
            <Carousel.Caption className='caption'>
                <h5>Third slide label</h5>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}

export default Slider;
