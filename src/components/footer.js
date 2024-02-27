import React from 'react';
import './footer.css';
import logo1 from '../images/salco.png';
import { FaLocationArrow } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <div id='footer'>
        <div className='row justify-content-between'>
            <div className='col-md-4'>
                <img src={logo1} alt='logo' />
                <div className='desc'>
                    Welcome to SALCO PHARMACY,
                    your trusted destination for quality 
                    healthcare solutions.
                </div>
                <div className='loc'>
                    <FaLocationArrow />
                    ali mendjli 4, ali mendjli, constantine.
                </div>
                <div className='phone'>
                    <FaPhoneAlt/>
                    +213663503661
                </div>
                <div className='links'>
                    <a href=''><TiSocialFacebookCircular/></a>
                    <a href=''><SlSocialInstagram/></a>
                    <a href=''><SlSocialTwitter/></a>
                    <a href=''><SlSocialLinkedin/></a>
                </div>
            </div>
            <div className='col-md-2'>
                <h3>Catigories</h3>
                <ul>
                    <li><a href='/'>home</a></li>
                    <li><a href='/products'>drugs & products</a></li>
                    <li><a href='/products'>cat1</a></li>
                    <li><a href='/products'>cat2</a></li>
                    <li><a href='/products'>cat3</a></li>
                    <li><a href='/products'>cat4</a></li>
                </ul>
            </div>
            <div className='col-md-5'>
                <h3>leave to us a comment</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </div>
            <div className="foot-bar text-center mt-5">
                Copyright © 2024: <a href='https://drive.google.com/file/d/1Kcbe2snM_8twjmnw9EJzPWdpm7OV9HTi/view?usp=sharing'>MED DEV</a>
            </div>
        </div>
    </div>
  )
}

export default Footer;
