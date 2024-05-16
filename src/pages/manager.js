import shopp from "../images/logo.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TbLogout } from "react-icons/tb";
import "./manager.css";
const Manager = () => {
  function showTab(i) {
    let tabs = document.getElementsByClassName("tab");
    for (let index = 0; index < 5; index++) {
      tabs[index].classList.add("d-none");
    }
    tabs[i].classList.remove("d-none");
  }
  const [command, setCommand] = useState([]);
  const [forn, setForn] = useState([]);
  const [vendeur, setVendeur] = useState([]);
  const [prod, setProd] = useState([]); // Initialize with an empty array
  const [open, setOpen] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3006/manager/storage")
      .then((res) => setProd(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/commands")
      .then((res) => setCommand(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/sellers")
      .then((res) => setVendeur(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3006/manager/delivery")
      .then((res) => setForn(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handelDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3006/manager/delete-product/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const deletCommnd = async (id)=>{
    try {
      await axios.delete("http://localhost:3006/manager/delete-user/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  const deleteUser = async (id)=>{
    try {
      await axios.delete("http://localhost:3006/manager/delete-user/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  const today = new Date();
  // const fullDate = today.toDateString();
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
            <span>consult sale</span>
          </li>
          <li onClick={() => showTab(3)}>
            <span>manage sellers</span>
          </li>
          <li onClick={() => showTab(4)}>
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
                  {
                    prod.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{i}</td>
                          <td>{data.nom}</td>
                          <td>{data.qte_stock}</td>
                          <td className="">{data.date_per}</td>
                          <td>{data.type}</td>
                          <td><a href={`/manager/update-product/${data.id_s}`} className='btn btn-primary me-2 ms-2'>modify</a></td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handelDelete(data.id_s)}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  }
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
            {/* {Array.isArray(command) && command.length > 0 ? (
                command.map((data,i)=>{
                  <div key={i}>
                                <div className="mb-2">
            <ListGroup>
      
              <ListGroup.Item variant="info">
              <div
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                      className="btn-collapse"
                    >
                      command 
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
                        <div className='row justify-content-around bg-white p-3 m-0'>
                            <div className='btn btn-success text-uppercase w-25'>print</div>
                            <div className='btn btn-danger text-uppercase w-25' onClick={()=>deletCommnd(command.id)}>delete</div>
                        </div>
                      </div>
                    </Collapse>
              </ListGroup.Item>
      
            </ListGroup>
                    
                  </div>
                })
            ) : (
              <p>No command data available </p>
            )} */}

          </div>
          
        </div>
        <div id="" className="tab sale d-none">
          <h2 className="text-uppercase">consult sale</h2>
          <div className="bg-white p-2 m-1"></div>
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
                    <th colSpan={2}>operation</th>
                  </tr>
                </thead>
                <tbody>
                  {vendeur.map((data, i) => (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{data.email}</td>
                      <td>
                        <a
                          href={`/manager/update-seller/${i}`}
                          className="btn btn-primary text-capitalize"
                        >
                          Update
                        </a>
                      </td>
                      <td>
                        <div className="btn btn-danger" onClick={e=>deleteUser(i)}>delete</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p> No user data available</p>
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
                    <th colSpan={2}>operation</th>
                  </tr>
                </thead>
                <tbody>
                  {forn.map((data, i) => (
                    <tr key={i}>
                      {" "}
                      {/* Added key attribute for each row */}
                      <td>{i}</td>
                      <td>{data.email}</td>
                      <td>
                        <a
                          href={`/manager/update-seller/${i}`}
                          className="btn btn-primary text-capitalize"
                        >
                          Update
                        </a>
                      </td>
                      <td>
                        <div className="btn btn-danger" onClick={e=>deleteUser(i)}>delete</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p> No user data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
