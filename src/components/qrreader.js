import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "./qrreader.css";
// import { useNavigate } from 'react-router-dom';

function Qrreader() {
  const [result, setResult] = useState();
  useEffect(() => {
    const handleScan = (data) => {
      if (data) {
        scanner.clear();
        setResult(data);
      }
    };
    // const navigate = useNavigate();
    const handleError = (err) => {
      console.error(err);
    };
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });
    scanner.render(handleScan, handleError);
  }, []);
  const [open, setOpen] = useState(false);
  const cancel = ()=>{
    setResult('');
    setOpen(false);
  }
  const [client , setClient] = useState({
    name:'',
    address:'',
    phone:''
  })
  const handleSubmit = async()=>{
    // console.log(client, result);
    await axios.post("http://localhost:3006/seller/add-client",{client,result})
      .then(res=>{
        window.alert(res.data)
        // navigate('/vendeur');
      })
      .catch(err=>console.log(err))
  } 
  const handleSubmitChifa = async()=>{
    const value = JSON.parse(result.replace(/(\w+)\s*:/g, '"$1":').replace(/:\s*'([^']*)'/g, ':"$1"'));
    // console.log(value);
    localStorage.setItem('pous_suc', value.pous_suc);
    await axios.post("http://localhost:3006/seller/add-chifa",{value})
      .then(res=>{
        window.alert(res.data.msg);
        // navigate('/vendeur');
      })
      .catch(err=>console.log(err))
  }
  return (
    <div id="qr">
      <div className="container">
        <h1>qr scanner</h1>
        <div id="reader" className="h-25"></div>
        <p>The result of scan:  {result}</p>
        <div className="row justify-content-between mb-3 mt-5">
          <button className="btn btn-success col-6 col-md-2" aria-controls="chifa-card" onClick={handleSubmitChifa}>
            as a CHIFA card
          </button>
          <button className="btn btn-success col-6 col-md-2" aria-controls="ordonance" onClick={() => setOpen(!open)} aria-expanded={open}>
            as a prescription
          </button>
          <button className="btn btn-danger col-6 col-md-2" onClick={cancel}>cancel</button>
        </div>
        <div className="row p-2">
          <Collapse in={open} className="bg-secondary p-3 text-start text-capitalize w-75">
            <Form  id="chifa-card" > 
              <Form.Group  md="4">
                  <Form.Label >name</Form.Label>
                  <Form.Control required type="text" onChange={e=>client.name=e.target.value} placeholder="name"/>
              </Form.Group>
              <Form.Group  md="4">
                  <Form.Label>address</Form.Label>
                  <Form.Control required type="text" onChange={e=>client.address=e.target.value} placeholder="Address"/>
              </Form.Group>
              <Form.Group  md="4">
                  <Form.Label>phone number</Form.Label>
                  <Form.Control required type="number" max='0799999999' onChange={e=>client.phone=e.target.value}/>
              </Form.Group>
              <Button className="mt-2 w-25"  onClick={handleSubmit} >Add </Button>
            </Form>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Qrreader;
