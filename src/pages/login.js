import React from 'react';
import Form from 'react-bootstrap/Form';
import './login.css';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaFacebookSquare } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";

const Login = () => {
  return (
    <div className='' id='login'>
      <div className='container m-5'>
        <div className='row'>
          <div className='col-lg-5 align-self-center'>
            <div className='title mb-3 text-light'>Welcome to SalCo Pharmacy</div>
            <p>
              As you journey through our virtual doors, 
              vibrant hues of health and vitality greet you, 
              inviting you to access a wealth of healthcare resources with just a click.
            </p>
            <Button variant='' className='btn-outline-light w-25 mt-2' href='/'>home</Button>
          </div>
          <div className='col-lg-7'>
            <div className='title mb-3' style={{color: "rgb(255, 153, 0)"}}>login</div>
            <div className='row justify-content-center mb-5 mt-4'>
                    <a className='col-1 text-secondary' style={{fontSize:"25px"}} href=''><FaFacebookSquare/></a>
                    <a className='col-1 text-secondary' style={{fontSize:"25px"}} href=''><SlSocialInstagram/></a>
                    <a className='col-1 text-secondary' style={{fontSize:"25px"}} href=''><SlSocialTwitter/></a>
            </div>
            <Form>
              <Form.Group as={Row} className="mb-3 justify-content-center text-secondary" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control className='input' type='email' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 justify-content-center text-secondary" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control className='input' type="password" placeholder="Password" />
                </Col>
              </Form.Group>
              <Button variant='' className='btn-orange w-25 mt-5' href='/'>login</Button>
            </Form>
          </div>
        </div>
      </div> 
      <div className='circle'></div>
      <div className='rectengle'></div>
    </div>
  )
}

export default Login;
