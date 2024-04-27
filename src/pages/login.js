import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaFacebookSquare } from 'react-icons/fa';
import { SlSocialInstagram } from 'react-icons/sl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaX } from 'react-icons/fa6';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3006/login", values);
        switch (response.data.status) {
          case "manager":
            navigate('/maçna§g2er°');
          break;
          case "pharmacien":
            navigate('/pharmacien');
          break;
          case "vendeur":
            navigate('/vendeur');
          break;
          default:
            window.alert(response.data.msg); 
          break;
        }
    } catch (error) {
      console.error('An error occurred:', error);
      window.alert('An error occurred. Please try again.');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className='' id='login'>
      <div className='container m-5'>
        <div className='row'>
          <div className='col-lg-5 align-self-center'>
            <div className='title mb-3 text-light'>Welcome to SalCo Pharmacy</div>
            <p>
              As you journey through our virtual doors, vibrant hues of health and vitality greet you, inviting you to access a wealth of healthcare resources with just a click.
            </p>
            <Button variant='' className='btn-outline-light w-25 mt-2' href='/'>home</Button>
          </div>
          <div className='col-lg-7'>
            <div className='title mb-3' style={{ color: "rgb(255, 153, 0)" }}>login</div>
            <div className='row justify-content-center mb-5 mt-4'>
              <a className='col-1 text-secondary' style={{ fontSize: "25px" }} href='https://www.facebook.com/'><FaFacebookSquare /></a>
              <a className='col-1 text-secondary' style={{ fontSize: "25px" }} href='https://www.instagram.com/'><SlSocialInstagram /></a>
              <a className='col-1 text-secondary' style={{ fontSize: "25px" }} href='https://twitter.com/'><FaX /></a>
            </div>
            <Form onSubmit={handleSubmit} >
              <Form.Group as={Row} className="mb-3 justify-content-center text-secondary" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control className='input' name='email' placeholder='Email' type='email' value={values.email} onChange={handleChange} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 justify-content-center text-secondary" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control className='input' name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                </Col>
              </Form.Group>
              <Button variant='' type='submit' className='btn btn-orange w-25 mt-3'>Login</Button>
            </Form>
            <div className='mt-2'>
              <a href='/sign' className='text-center'>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <div className='circle'></div>
      <div className='rectengle'></div>
    </div>
  );
};

export default Login;

