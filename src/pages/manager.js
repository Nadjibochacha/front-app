import shopp from "../images/logo.png";
import React, { useEffect, useState} from "react";
import axios from "axios";
import { TbLogout } from "react-icons/tb";
import ListGroup from 'react-bootstrap/ListGroup';
import ReactToPrint from 'react-to-print';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import "./manager.css";

const Manager = () => {
  const [command, setCommand] = useState([]);
  const [forn, setForn] = useState([]);
  const [vendeur, setVendeur] = useState([]);
  const [prod, setProd] = useState([]);
  const [cmd, setCmd] = useState([]);
  const [factureNum, setFacNum] = useState([]);
  const [facture, setFacture] = useState([]);
  const [factureA, setFactureA] = useState([]);
  const [factureAchat,setFactureAchat] = useState([]);
  const [showFactureTable, setShowFactureTable] = useState(false);
  const [showFactureAchat, setShowFactureAchat] = useState(false);
  const [Allsalle, setAllSalle] = useState([]);
  const [salle, setSalle] = useState([]);
  const [total, setTotal] = useState(0);
  let dail_pro=0;
  const showTab = (i) => {
    let tabs = document.getElementsByClassName("tab");
    for (let index = 0; index < tabs.length; index++) {
      tabs[index].classList.add("d-none");
    }
    tabs[i].classList.remove("d-none");
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:3006/manager/storage")
      .then((res) => setProd(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/commands")
      .then((res) => {
        setCommand(res.data);
        updateCmd(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/sellers")
      .then((res) => setVendeur(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/delivery")
      .then((res) => setForn(res.data))
      .catch((err) => console.log(err));
    axios.get("http://localhost:3006/sales")
      .then((res) => {
        setAllSalle(res.data);
        updateSale(res.data);
      })
      .catch((err) => console.log(err));
    axios.get('http://localhost:3006/facture_achat')
      .then(res=>{
        setFactureAchat(res.data);
        updateFacNum(factureAchat);
        console.log(factureAchat);
      })
      .catch(error=>console.log(error));
  }, []);
  const updateSale = (allsalles) => {
    const salesSet = new Set();
    allsalles.forEach(sale => salesSet.add(sale.num_fac));
    setSalle(Array.from(salesSet));
  };
  const handelDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/manager/delete-product/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommand = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/manager/delete-command/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/manager/delete-user/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const calcul_daily_pro = ()=>{
    Allsalle.forEach(element => {
      if (element.date === currentDate) {
        dail_pro += element.prix;
      }
    });
    return dail_pro;
  }
  const updateCmd = (allsalles) => {
    const salesSet = new Set();
    allsalles.forEach((sale) => salesSet.add(sale.num_cmd));
    setCmd(Array.from(salesSet));
  };

  const updateFacNum = (allsalles) => {
    const salesSet = new Set();
    allsalles.forEach((sale) => salesSet.add(sale.num_cmd));
    setFacNum(Array.from(salesSet));
  };

  const showCommand = (i) => {
    const newFacture = command.filter(element => element.num_cmd === i);
    setFacture(newFacture);
    setShowFactureTable(true);
  };
  const showFacture = (i) => {
    const newFacture = [];
    let newTotal = 0;
    Allsalle.forEach(element => {
      if (element.num_fac === i) {
        newFacture.push(element);
        newTotal += element.prix;
      }
    });
    setFacture(newFacture);
    setTotal(newTotal);
    setShowFactureTable(!showFactureTable);
  };
  const showFactureA = (i) => {
    const newFacture = [];
    let newTotal = 0;
    factureAchat.forEach(element => {
      if (element.num_cmd === i) {
        newFacture.push(element);
        newTotal += element.prix;
      }
    });
    setFactureA(newFacture);
    setTotal(newTotal);
    setShowFactureAchat(!showFactureAchat);
    console.log(factureA);
  };
  const date =  new Date()
  const currentDate =date.toDateString();

  return (
    <div id="manager" className="row justify-content-between">
      <div className="globl-title col-lg-2 col-3">
        <div className="logo">
          <img src={shopp} alt="logo" />
          <h5>SalCo pharmacy</h5>
        </div>
        <ul className="mt-3">
          <li onClick={() => showTab(0)}>
            <span>manage storage</span>
          </li>
          <li onClick={() => showTab(1)}>
            <span>establish purchase order</span>
          </li>
          <li onClick={() => showTab(2)}>
            <span>Colsult order bill</span>
          </li>
          <li onClick={() => showTab(3)}>
            <span>consult sale</span>
          </li>
          <li onClick={() => showTab(4)}>
            <span>manage sellers</span>
          </li>
          <li onClick={() => showTab(5)}>
            <span>manage deliveries</span>
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
          <h1>manager dashboard</h1>
        </div>
        <div id="" className="tab storage d-none">
          <h2 className="text-uppercase">manage storage</h2>
          <div className="bg-white p-2 m-1">
            <a href="/manager/create-product" className="btn btn-success w-25">
              Add +
            </a>
            {Array.isArray(prod) && prod.length > 0 ? (
              <table className="table">
                <thead>
                  <tr className="text-capitalize">
                    <th>id</th>
                    <th>name</th>
                    <th>countity</th>
                    <th>expiration</th>
                    <th>prescription</th>
                    <th colSpan={2}>operation</th>
                  </tr>
                </thead>
                <tbody>
                  {prod.map((data, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{data.nom}</td>
                      <td>{data.qte_stock}</td>
                      <td className="">{data.date_per}</td>
                      <td>{data.type}</td>
                      <td>
                        <a href={`/manager/update-product/${data.id_s}`} className="btn btn-primary me-2 ms-2">
                          modify
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handelDelete(data.id_s)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No product data available</p>
            )}
          </div>
        </div>
        <div id="" className="tab order d-none">
          <h2 className="text-uppercase">establish purchase order</h2>
          <div className="bg-white p-2 m-1">
            <a href="/manager/create-command" className="btn btn-success w-25 mb-4">
              Add Order +
            </a>
          </div>
          <div className="bg-white p-2 m-1 showfacnum">
            {cmd.map((element, i) => (
              <ListGroup key={i}>
                <ListGroup.Item variant="info" style={{ cursor: "pointer" }} className="mb-2" onClick={() => showCommand(element)}>
                  Number of receipt: {element}
                </ListGroup.Item>
              </ListGroup>
            ))}
          </div>
          <div className="bg-white m-2 p-1">
            {showFactureTable && (
              <div id="showcmd" >
                <h3>Command</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facture.map((data, i) => (
                      <tr key={i}>
                        <td>{data.produit}</td>
                        <td>{data.qte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {facture.length > 0 && (
                  <div className="row justify-content-around">
                    <span className="col-2">status: {facture[0].status}</span>
                    <span className="col-2">paiment : {facture[0].mode_pay}</span>
                    <span className="col-3">Date : {facture[0].date_cmd}</span>
                    <span className="col-3">delivery : {facture[0].email}</span>
                  </div>
                )}
                <ReactToPrint
                  trigger={() => <div className="btn btn-success p-1 m-2 w-50">Print</div>}
                  documentTitle="Facture"
                  content={() => document.getElementById('showcmd')}
                  pageStyle="print"
                />
              </div>
            )}
          </div>
        </div>
        <div id="" className="tab seller d-none">
          <h2 className="text-uppercase">Consult order bill</h2>
          <div className="bg-white p-2 m-1">
             <div className="showfacnum">
                {factureNum.map((element, i) => (
                  <ListGroup key={i} >
                    <ListGroup.Item variant="info" style={{cursor:"pointer"}} className="mb-2" onClick={() => showFactureA(element)}>
                      Number of receipt: {element}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
             </div>
             <div className="bg-white m-2 p-1 ">
            {showFactureAchat && (
              <div id="showfacAch">
                <h3>Facture</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factureA.map((data, i) => (
                      <tr key={i}>
                        <td>{data.produit}</td>
                        <td>{data.prix} DA</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row justify-content-around">
                  <span className="col-4">Total: {total} DA</span>
                  <span className="col-4">Date : {factureA[0].date_liv}</span>
                  <span className="col-4">Delivery : {factureA[0].email}</span>
                </div>
                {/* <ReactToPrint
                  trigger={
                    ()=>(<div className="btn btn-success p-1 m-2 w-50">Print</div>)
                  }
                  documentTitle="Facture"
                  content={() => document.getElementById("showfacAch")}
                  pageStyle="print"
                /> */}
                <div  className='mt-4 bg-white me-3 p-1'>
                    <h3 >Pay Online</h3>
                    <div className='row justify-content-center'>
                        <div className='row justify-content-center'>
                            <label className='col-3'>CCP Number</label>
                            <input type='number' placeholder='CCP Number' required className='mt-2 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} />
                        </div>
                        <div className='row justify-content-center'>
                            <label className='col-3'>CVV</label>
                            <input type='number' placeholder='CVV' required className='mt-2 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} />
                        </div>
                        <button className='btn btn-success w-25 mt-3' onClick={e=>window.alert('money sent !')}>Buy</button>
                    </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
        <div id="" className="tab sale d-none">
          <h2 className="text-uppercase">consult sale</h2>
          <div className="p-2 m-1">
            <div className="row justify-content-around">
              <Card className="col-3 text-white" border="info" style={{ width: '12rem',background:'#253852a3' }}>
                <Card.Header>Medications</Card.Header>
                <Card.Body>
                <Card.Title>{prod.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card className="col-3 text-white" border="warning" style={{ width: '12rem',background:'#253852a3' }}>
                <Card.Header>Sales</Card.Header>
                <Card.Body>
                <Card.Title>{Allsalle.length}</Card.Title>
                </Card.Body>
              </Card>
              <Card className="col-3 text-white" border="success" style={{ width: '12rem',background:'#253852a3' }}>
                <Card.Header>Daily profits</Card.Header>
                <Card.Body>
                <Card.Title>{calcul_daily_pro()} DA</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="bg-white p-2 m-2 showfacnum" > 
              {salle.map((element, i) => (
                <ListGroup key={i} >
                  <ListGroup.Item variant="info" style={{cursor:"pointer"}} className="mb-2" onClick={() => showFacture(element)}>
                  Number of receipt: {element}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>
            <div className="bg-white m-2 p-1 ">
            {showFactureTable && (
              <div id="showfac">
                <h3>Facture</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>count</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facture.map((data, i) => (
                      <tr key={i}>
                        <td>{data.nom}</td>
                        <td>{data.qte}</td>
                        <td>{data.prix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row justify-content-around">
                  <span className="col-4">Total: {total} DA</span>
                  <span className="col-4">Date : {facture[0].date}</span>
                </div>
                <ReactToPrint
                  trigger={
                    ()=>(<div className="btn btn-success p-1 m-2 w-50">Print</div>)
                  }
                  documentTitle="Facture"
                  content={() => document.getElementById("showfac")}
                  pageStyle="print"
                />
              </div>
            )}
            </div>
          </div>
        </div>
        <div id="" className="tab seller d-none">
          <h2 className="text-uppercase">manage sellers</h2>
          <div className="bg-white p-2 m-1">
            <a href="/manager/create-seller" className="btn btn-success w-25">
              Add +
            </a>
            {Array.isArray(vendeur) && vendeur.length > 0 ? (
              <table className="table">
                <thead>
                  <tr className="text-capitalize">
                    <th>id</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th colSpan={2}>operation</th>
                  </tr>
                </thead>
                <tbody>
                  {vendeur.map((data, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{data.email}</td>
                      <td>{data.num_tel}</td>
                      <td>
                        <a
                          href={`/manager/update-seller/${i}`}
                          className="btn btn-primary text-capitalize"
                        >
                          Update
                        </a>
                      </td>
                      <td>
                        <div className="btn btn-danger" onClick={() => deleteUser(i)}>delete</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user data available</p>
            )}
          </div>
        </div>
        <div id="" className="tab d-none">
          <h2 className="text-uppercase">manage deliveries</h2>
          <div className="bg-white p-2 m-1">
            <a href="/manager/create-seller" className="btn btn-success w-25">
              Add +
            </a>
            {Array.isArray(forn) && forn.length > 0 ? (
              <table className="table">
                <thead>
                  <tr className="text-capitalize">
                    <th>id</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th colSpan={2}>operation</th>
                  </tr>
                </thead>
                <tbody>
                  {forn.map((data, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{data.email}</td>
                      <td>{data.num_tel}</td>
                      <td>
                        <a
                          href={`/manager/update-seller/${i}`}
                          className="btn btn-primary text-capitalize"
                        >
                          Update
                        </a>
                      </td>
                      <td>
                        <div className="btn btn-danger" onClick={() => deleteUser(i)}>delete</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
