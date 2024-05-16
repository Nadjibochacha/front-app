import shopp from "../images/logo.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbLogout } from "react-icons/tb";
import "./manager.css";

const Venteur = () => {
  function showTabs(i) {
    let tabV = document.getElementsByClassName("tabV");
    for (let index = 0; index < 4; index++) {
      tabV[index].classList.add("d-none");
    }
    tabV[i].classList.remove("d-none");
  }
  const [products, setProducts] = useState([]);
  let probill = [];
  let prescription = [];
  let item = {
    id:0,
    name:'',
    price: 0,
    count : 1
  }
  let order = document.getElementById('order');
  const [Allproducts, setAllProducts] = useState([]);
  const [Allsalles, setAllSalles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3006/manager/storage")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
    axios.get("http://localhost:3006/seller/storage/free")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    axios.get("http://localhost:3006/sales")
      .then((res) =>{
        setAllSalles(res.data);
        console.log(Allsalles);
      } )
      .catch((err) => console.log(err));
  }, []);
  const AddPro = (i) => {
    item.id =products[i].id_s ;
    item.name = products[i].nom;
    item.price = products[i].price * item.count;
    probill.push(item);
    item = {id:0,name:'',price: 0,count : 1};
    fullOrderBill()
    console.log(probill);
  };
  const Addprescription = (i)=>{
    item.id =Allproducts[i].id_s ;
    item.name = Allproducts[i].nom;
    item.price = Allproducts[i].price * item.count;
    prescription.push(item);
    item = {id:0,name:'',price: 0,count : 1};
    console.log(prescription);
  }
  function fullOrderBill(){
    order.innerHTML =``;
    probill.forEach(element => {
      order.innerHTML += `
      <tr>
        <td>${element.name} </td>
        <td>${element.count}</td>
        <td>${element.price}</td>
      </tr>`
    });
  }
  function generateUniqueCommandNumber() {
    var randomNumber = Math.floor(Math.random() * 9000);
    var timestamp = new Date; 
    var uniqueNumber = timestamp.getDay().toString() + randomNumber.toString();

    return uniqueNumber;
  }
  let num =''; 
  const reset = () => {
    probill = [];
    order.innerHTML =` `;
    num = '';
    prescription = [];
  };
  const handelSend = async ()=>{
    num = (generateUniqueCommandNumber());
    console.log(num);
    try {
      await Promise.all(probill.map(element =>
          axios.post("http://localhost:3006/seller/add-freeOrder", {element,num})
      )).then(res=>{
        console.log(num);
        console.log('inserted :)');
        reset();
      })
    } catch (err) {
        console.error("An error occurred:", err);
    }
  }
  return (
    <div id="vendeur" className="row justify-content-between">
      <div className="globl-title col-lg-2 col-3">
        <div className="logo">
          <img src={shopp} alt="logo" />
          <h5>SalCo pharmacy</h5>
        </div>
        <ul className="mt-3">
          <li onClick={() => showTabs(0)}>
            <span>free sale</span>
          </li>
          <li onClick={() => showTabs(1)}>
            <span>sale with prescription</span>
          </li>
          <li onClick={() => showTabs(2)}>
            <span>sale using CHIFA card</span>
          </li>
          <li onClick={() => showTabs(3)}>
            <span>consult the sales</span>
          </li>
          <li>
            <span>
              <a href="/login" className="btn btn-danger w-100 text-uppercase">
                logout <TbLogout />
              </a>
            </span>
          </li>
        </ul>
      </div>
      <div className="content col-9 p-0">
        <div className="title">
          <h1>seller dashboard</h1>
        </div>
        {/* vente libre  */}
        <div className="d-none tabV">
          <h2 className="text-uppercase">free sale</h2>
          <div className="bg-white p-2 m-1 row">
            <div className="col-sm-8">
              <div className="title mb-4">Add Order</div>
              <div className="">
                {Array.isArray(products) && products.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}>product name</th>
                        <th>price</th>
                        <th>qt_stock</th>
                        <th>Expiration</th>
                        <th>count</th>
                        <th>add to card</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((data, i) => (
                        <tr key={i}>
                          <td colSpan={2}>{data.nom}</td>
                          <td>{data.price}</td>
                          <td>{data.qte_stock}</td>
                          <td>{data.date_per}</td>
                          <td>
                            <input min={1} type="number" className="w-50" max={data.qte_stock}
                              onChange={(e) => (item.count = e.target.value)}
                            />
                          </td>
                          <td>
                            <div
                              className="btn btn-success"
                              onClick={e=>AddPro(i)}
                            >
                              Add +
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="p-2">No product data available </p>
                )}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="bill">
                <div className=" title">bill</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>count</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody id="order">
                    {
                        probill.map((data,i)=>(
                          <tr key={i}>
                            <td>{data.name} </td>
                            <td>{data.count}</td>
                            <td>{data.price}</td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
                <div className="row justify-content-around bg-white p-3 m-0">
                  <div className="btn btn-success text-uppercase w-25" onClick={handelSend}>
                    send
                  </div>
                  <div
                    className="btn btn-danger text-uppercase w-25"
                    onClick={reset}
                  >
                    reset
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-none tabV">
          <h2 className="text-uppercase">sale with prescription</h2>
          <div className="bg-white p-3 m-1 row justify-content-center">
            <a href="/qr-reader" className='btn btn-success w-50' >Scan prescription</a>
          </div>
          <div className="bg-white p-2 m-1 row">
            <div className="col-sm-8">
              <div className="title mb-4">Add Order</div>
              <div className="">
                {Array.isArray(Allproducts) && Allproducts.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}>product name</th>
                        <th>price</th>
                        <th>qt_stock</th>
                        <th>Expiration</th>
                        <th>count</th>
                        <th>add to card</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Allproducts.map((data, i) => (
                        <tr key={i}>
                          <td colSpan={2}>{data.nom}</td>
                          <td>{data.price}</td>
                          <td>{data.qte_stock}</td>
                          <td>{data.date_per}</td>
                          <td>
                            <input min={1} type="number" className="w-50" max={data.qte_stock}
                              onChange={(e) => (item.count = e.target.value)}
                            />
                          </td>
                          <td>
                            <div
                              className="btn btn-success"
                              onClick={e=>AddPro(i)}
                            >
                              Add +
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="p-2">No product data available </p>
                )}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="title mb-4">Bill</div>
              <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>count</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody id="order">
                    {
                        prescription.map((data,i)=>(
                          <tr key={i}>
                            <td>{data.name} </td>
                            <td>{data.count}</td>
                            <td>{data.price}</td>
                          </tr>
                        ))
                    }
                  </tbody>
              </table>
              <div className="row justify-content-around bg-white p-3 m-0">
                  <div className="btn btn-success text-uppercase w-25" onClick={handelSend}>
                    send
                  </div>
                  <div
                    className="btn btn-danger text-uppercase w-25"
                    onClick={reset}
                  >
                    reset
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-none tabV">
          <h2 className="text-uppercase">manage storage</h2>
          <div className="bg-white p-2 m-1"></div>
        </div>
        <div className="d-none tabV">
          <h2 className="text-uppercase">consult the sales</h2>
          <div className="bg-white p-2 m-1">
            {/* {Array.isArray(Allsalles) && Allsalles.length > 0 ? (
              Allsalles.map((element,i)=>(
                <div key={i}>
                  <div className="mb-2">
                    <ListGroup>
                      <ListGroup.Item variant="info">
                      <div onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} className="btn-collapse">
                        {element.num_fuc} 
                      </div>
                        <Collapse in={open}>
                          <div id="example-collapse-text">
                            <table className='table'>
                              <thead>
                                <tr>
                                    <th>name</th>
                                    <th>count</th>
                                </tr>
                              </thead>
                              <tbody id='commnd'>
                                <tr key={i}>
                                  <td>{data.name}</td>
                                  <td>{data.count}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Collapse>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-2">No product data available </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venteur;
