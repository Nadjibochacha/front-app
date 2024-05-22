import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import { TbLogout } from 'react-icons/tb';
import shopp from '../images/logo.png'; // Import your image

const Fournisseur = () => {
    const { id } = useParams();
    const [cmd, setCmd] = useState([]);
    const [facture, setFacture] = useState([]);
    const [showFactureTable, setShowFactureTable] = useState(false);
    const [command, setCommand] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3006/delivery/commands/${id}`)
            .then((res) => {
                setCommand(res.data);
                updateCmd(res.data);
            })
            .catch(error => {
                console.error('There was an error fetching the commands!', error);
            });
    }, [id]);

    const updateCmd = (allsalles) => {
        if (Array.isArray(allsalles)) {
            const salesSet = new Set();
            allsalles.forEach((sale) => salesSet.add(sale.num_cmd));
            setCmd(Array.from(salesSet));
        } else {
            console.error('Expected an array but got:', allsalles);
        }
    };

    const showCommand = (i) => {
        const newFacture = command.filter(element => element.num_cmd === i);
        setFacture(newFacture);
        setShowFactureTable(true);
        setPrices(new Array(newFacture.length).fill(0));
    };

    const handlePriceChange = (index, value) => {
        const updatedPrices = [...prices];
        updatedPrices[index] = value;
        setPrices(updatedPrices);
    };

    const sendBill = async(fac) => {
        let prix=0;
        try {
            await Promise.all(fac.map((element,i)=>{
                prix = prices[i];
                axios.post('http://localhost:3006/delivery/facture_achat',{element,prix})
            }))
            .then(res=>{
                console.log(res.data);
                alert('Bill sent :)');
                window.location.reload();
            })
        } catch (err) {
            console.log(err)
        }
        console.log(fac);
    };

    return (
        <div id='four'>
            <div className='globl-title row justify-content-between w-100 align-items-center ps-4 pe-4'>
                <div className='col-3'>
                    <img src={shopp} alt='logo'/>
                    <h5>SalCo pharmacy</h5>
                </div>
                <div className='col-6'>
                    <h3>Welcome {id}</h3>
                </div>
                <div className='col-2'>
                    <a href='/login' className='btn btn-danger text-uppercase'>logout <TbLogout/></a>
                </div>
            </div>
            <div className='content container pt-2 pb-2'>
                <h2 className=''>purchase order</h2>
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
                        <div>
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
                                <div className="row justify-content-around m-1 pb-1" style={{borderBottom:'1px solid gray'}}>
                                    <span className="col-2">status: {facture[0].status}</span>
                                    <span className="col-2">payment: {facture[0].mode_pay}</span>
                                    <span className="col-3">Date: {facture[0].date_cmd}</span>
                                    <span className="col-3">delivery: {facture[0].email}</span>
                                </div>
                            )}
                            <form>
                                <h2 className='text-center text-capitalize'>bill</h2>
                                <div className='mb-2 mt-1 row justify-content-between'>
                                    <span className='col-4 text-uppercase'>produit</span>
                                    <span className='col-2 text-uppercase'>count</span>
                                    <span className='col-4 text-uppercase'>Price</span>
                                </div>
                                {facture.map((data, i) => (
                                    <div className='mb-2 mt-1 row justify-content-between' key={i}>
                                        <span className='col-4'>{data.produit}</span>
                                        <span className='col-2'>{data.qte}</span>
                                        <span className='col-4'>
                                            Price: <input type='number' min={1} value={prices[i]} onChange={e => handlePriceChange(i, e.target.value)} /> DA
                                        </span>
                                    </div>
                                ))}
                                <Button variant='success' className='me-4' onClick={e=>sendBill(facture)}>Send Bill</Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
};

export default Fournisseur;
