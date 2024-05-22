import shopp from "../images/logo.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbLogout } from "react-icons/tb";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import ReactToPrint from "react-to-print";
import "./manager.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Venteur = () => {
  const [products, setProducts] = useState([]);
  const [Allproducts, setAllProducts] = useState([]);
  const [Allsalles, setAllSalles] = useState([]);
  const [probill, setProbill] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [chifa, setChifa] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersNum, setOrdersNum] = useState([]);
  const [facture, setFacture] = useState([]);
  const [factureOrd, setFactureOrd] = useState([]);
  const [total, setTotal] = useState(0);
  const [showFactureTable, setShowFactureTable] = useState(false);
  const [showFactureTbOrd, setShowFactureTbOrd] = useState(false);
  const [open, setOpen] = useState(false);
  let qte_bill = 1;
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from various endpoints on component mount
    axios
      .get("http://localhost:3006/manager/storage")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3006/seller/storage/free")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3006/sales")
      .then((res) => {
        setAllSalles(res.data);
        updateSales(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/selles/orders")
      .then((res) => {
        setOrders(res.data);
        updateOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateSales = (allsalles) => {
    // Extract unique sales numbers
    const salesSet = new Set();
    allsalles.forEach((sale) => salesSet.add(sale.num_fac));
    setSales(Array.from(salesSet));
  };

  const updateOrders = (allsalles) => {
    // Extract unique sales numbers
    const salesSet = new Set();
    allsalles.forEach((sale) => salesSet.add(sale.num_fac));
    setOrdersNum(Array.from(salesSet));
  };

  const addItemToBill = (itemListSetter, productList, index) => {
    // Add selected item to the bill list
    const product = productList[index];
    const newItem = {
      id: product.id_s,
      name: product.nom,
      price: product.price * qte_bill,
      count: qte_bill,
      totcount: product.qte_stock,
    };
    itemListSetter((prevItems) => [...prevItems, newItem]);
  };

  const handleSend = async (list) => {
    const num = generateUniqueCommandNumber();
    try {
      await Promise.all(
        list.map((element) =>
          axios.post("http://localhost:3006/seller/add-freeOrder", {
            element,
            num,
          })
        )
      );
      alert("inserted :)");
      reset();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const reset = () => {
    setProbill([]);
    setPrescription([]);
    setChifa([]);
    setFacture([]);
    setTotal(0);
    setShowFactureTable(false);
  };

  const generateUniqueCommandNumber = () => {
    const randomNumber = Math.floor(Math.random() * 9000);
    const timestamp = new Date();
    return timestamp.getDay().toString() + randomNumber.toString();
  };

  const showTabs = (i) => {
    // Show the selected tab and hide others
    const tabV = document.getElementsByClassName("tabV");
    for (let index = 0; index < 5; index++) {
      tabV[index].classList.add("d-none");
    }
    tabV[i].classList.remove("d-none");
  };

  const showFacture = (i) => {
    // Show facture details for the selected sale
    const newFacture = [];
    let newTotal = 0;
    Allsalles.forEach((element) => {
      if (element.num_fac === i) {
        newFacture.push(element);
        newTotal += element.prix;
      }
    });
    if (localStorage.getItem("pous_suc")) {
      newTotal = (newTotal * Number(localStorage.getItem("pous_suc"))) / 100;
      localStorage.removeItem("pous_suc");
    }
    setFacture(newFacture);
    setTotal(newTotal);
    setShowFactureTable(true);
  };

  const showFactureOrd = (i) => {
    const newFacture = [];
    let newTotal = 0;

    orders.forEach((element) => {
      if (element.num_fac === i) {
        newFacture.push(element);
        newTotal += element.prix;
      }
    });

    if (localStorage.getItem("pous_suc")) {
      newTotal = (newTotal * Number(localStorage.getItem("pous_suc"))) / 100;
      localStorage.removeItem("pous_suc");
    }

    setFactureOrd(newFacture);

    setTotal(newTotal);
    setShowFactureTbOrd(!showFactureTbOrd);
  };

  const removeOrder = async (i) => {
    // console.log(i);
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    const id = i;
    if (confirmed) {
      await axios.delete("http://localhost:3006/selles/delete-order/" + id)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };
  const logout = ()=>{
    Cookies.remove('token');
    navigate('/login');
  }
  const token = !Cookies.get('token');
  if (!token) {
    return(
        <div>
          <h4 className="text-center mt-3 text-uppercase">log in agian please!</h4>
          <a className="btn btn-success" href="/login">
            login
          </a>
        </div>
      )
  }else{
  return (
    <div id="vendeur" className="row justify-content-between pe-1">
      <div className="globl-title col-lg-2 col-3">
            <div className="logo">
              <img src={shopp} alt="logo" />
              <h5>SalCo pharmacy</h5>
            </div>
            <ul className="mt-3">
              <li onClick={() => showTabs(0)}>
                <span>Free Sale</span>
              </li>
              <li onClick={() => showTabs(1)}>
                <span>Sale with Prescription</span>
              </li>
              <li onClick={() => showTabs(2)}>
                <span>Sale using CHIFA Card</span>
              </li>
              <li onClick={() => showTabs(3)}>
                <span>Consult Sales</span>
              </li>
              <li onClick={() => showTabs(4)}>
                <span>Consult Order Requests</span>
                <span className="bg-danger rounded-4 ms-2 pt-1 pb-1 ps-3 pe-3">
                  {ordersNum.length}
                </span>
              </li>
              <li>
                <span>
                  <div
                    onClick={logout}
                    className="btn btn-danger w-100 text-uppercase"
                  >
                    Logout <TbLogout />
                  </div>
                </span>
              </li>
            </ul>
          </div>
          <div className="content col-9 p-0 me-1">
            <div className="title">
              <h1>Seller Dashboard</h1>
            </div>

            {/* Free Sale Tab */}
            <div className="d-none tabV">
              <h2 className="text-uppercase">Free Sale</h2>
              <div className="bg-white p-2 m-1 row">
                <div className="col-sm-8">
                  <div className="title mb-4">Add Order</div>
                  <div className="">
                    {Array.isArray(products) && products.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Product Name</th>
                            <th>Price</th>
                            <th>Qt Stock</th>
                            <th>Expiration</th>
                            <th>Count</th>
                            <th>Add to Card</th>
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
                                <input
                                  min={1}
                                  type="number"
                                  className="w-50"
                                  max={data.qte_stock}
                                  onChange={(e) => (qte_bill = e.target.value)}
                                />
                              </td>
                              <td>
                                <div
                                  className="btn btn-success"
                                  onClick={() =>
                                    addItemToBill(setProbill, products, i)
                                  }
                                >
                                  Add +
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="p-2">No product data available</p>
                    )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="bill">
                    <div className="title">Bill</div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Count</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {probill.map((data, i) => (
                          <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.count}</td>
                            <td>{data.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row justify-content-around bg-white p-3 m-0">
                      <div
                        className="btn btn-success text-uppercase w-25"
                        onClick={() => handleSend(probill)}
                      >
                        Send
                      </div>
                      <div
                        className="btn btn-danger text-uppercase w-25"
                        onClick={reset}
                      >
                        Reset
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sale with Prescription Tab */}
            <div className="d-none tabV">
              <h2 className="text-uppercase">Sale with Prescription</h2>
              <div className="bg-white p-3 m-1 row justify-content-center">
                <a href="/qr-reader" className="btn btn-success w-50">
                  Scan Prescription
                </a>
              </div>
              <div className="bg-white p-2 m-1 row">
                <div className="col-sm-8">
                  <div className="title mb-4">Add Order</div>
                  <div className="">
                    {Array.isArray(Allproducts) && Allproducts.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Product Name</th>
                            <th>Price</th>
                            <th>Qt Stock</th>
                            <th>Expiration</th>
                            <th>Count</th>
                            <th>Add to Card</th>
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
                                <input
                                  min={1}
                                  type="number"
                                  className="w-50"
                                  max={data.qte_stock}
                                  onChange={(e) => (qte_bill = e.target.value)}
                                />
                              </td>
                              <td>
                                <div
                                  className="btn btn-success"
                                  onClick={() =>
                                    addItemToBill(
                                      setPrescription,
                                      Allproducts,
                                      i
                                    )
                                  }
                                >
                                  Add +
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="p-2">No product data available</p>
                    )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="title mb-4">Bill</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.map((data, i) => (
                        <tr key={i}>
                          <td>{data.name}</td>
                          <td>{data.count}</td>
                          <td>{data.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row justify-content-around bg-white p-3 m-0">
                    <div
                      className="btn btn-success text-uppercase w-25"
                      onClick={() => handleSend(prescription)}
                    >
                      Send
                    </div>
                    <div
                      className="btn btn-danger text-uppercase w-25"
                      onClick={reset}
                    >
                      Reset
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHIFA Card Tab */}
            <div className="d-none tabV">
              <h2 className="text-uppercase">Sale using CHIFA Card</h2>
              <div className="bg-white p-3 m-1 row justify-content-center">
                <a href="/qr-reader" className="btn btn-success w-50">
                  Scan Prescription
                </a>
              </div>
              <div className="bg-white p-2 m-1 row">
                <div className="col-sm-8">
                  <div className="title mb-4">Add Order</div>
                  <div className="">
                    {Array.isArray(Allproducts) && Allproducts.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Product Name</th>
                            <th>Price</th>
                            <th>Qt Stock</th>
                            <th>Expiration</th>
                            <th>Count</th>
                            <th>Add to Card</th>
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
                                <input
                                  min={1}
                                  type="number"
                                  className="w-50"
                                  max={data.qte_stock}
                                  onChange={(e) => (qte_bill = e.target.value)}
                                />
                              </td>
                              <td>
                                <div
                                  className="btn btn-success"
                                  onClick={() =>
                                    addItemToBill(setChifa, Allproducts, i)
                                  }
                                >
                                  Add +
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="p-2">No product data available</p>
                    )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="title mb-4">Bill</div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chifa.map((data, i) => (
                        <tr key={i}>
                          <td>{data.name}</td>
                          <td>{data.count}</td>
                          <td>{data.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row justify-content-around bg-white p-3 m-0">
                    <div
                      className="btn btn-success text-uppercase w-25"
                      onClick={() => handleSend(chifa)}
                    >
                      Send
                    </div>
                    <div
                      className="btn btn-danger text-uppercase w-25"
                      onClick={reset}
                    >
                      Reset
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consult Sales Tab */}
            <div className="d-none tabV">
              <h2 className="text-uppercase">Consult the Sales</h2>
              <div className="bg-white p-2 m-1 showfacnum">
                {sales.map((element, i) => (
                  <ListGroup key={i}>
                    <ListGroup.Item
                      variant="info"
                      style={{ cursor: "pointer" }}
                      className="mb-2"
                      onClick={() => showFacture(element)}
                    >
                      Number of Receipt: {element}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </div>
              <div className="bg-white m-2 p-1">
                {showFactureTable && (
                  <div>
                    <div id="showfac">
                      <h3>Facture</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Count</th>
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
                        <span className="col-4">Date: {facture[0].date}</span>
                      </div>
                    </div>
                    <ReactToPrint
                      trigger={() => (
                        <div className="btn btn-success p-1 m-2 w-50">
                          Print
                        </div>
                      )}
                      documentTitle="Facture"
                      content={() => document.getElementById("showfac")}
                      pageStyle="print"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Consult order requests Tab */}
            <div className="d-none tabV">
              <h2 className="text-uppercase">Consult Order Requests</h2>
              <div className="bg-white p-2 m-1 showfacnum">
                {ordersNum.map((element, i) => (
                  <ListGroup key={i}>
                    <ListGroup.Item
                      variant="info"
                      style={{ cursor: "pointer" }}
                      className="mb-2"
                      onClick={() => showFactureOrd(element)}
                    >
                      Number of Receipt: {element}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </div>
              <div className="bg-white m-2 p-1">
                {showFactureTbOrd && (
                  <div>
                    <div id="showfac_dis">
                      <h3>Facture</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {factureOrd.map((data, i) => (
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
                        <span className="col-4">
                          Date: {factureOrd[0].date}
                        </span>
                        <span className="col-4">
                          Address: {factureOrd[0].address_fac}
                        </span>
                      </div>
                      <div
                        className="btn btn-success mt-2"
                        onClick={(e) => removeOrder(factureOrd[0].num_fac)}
                      >
                        Mark it as Accepted
                      </div>
                    </div>
                    {/* <ReactToPrint
                  trigger={() => (<div className="btn btn-success p-1 m-2 w-50">Print</div>)}
                  documentTitle="Facture"
                  content={() => document.getElementById("showfac_dis")}
                  pageStyle="print"
                /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
    </div>
  );}
};

export default Venteur;
