import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import shopp from '../images/logo.png';
import Fade from 'react-bootstrap/Fade';
import ReactToPrint from 'react-to-print';

const Client = () => {
    const [products, setProducts] = useState([]);
    const [bill, setBill] = useState([]);
    const [counts, setCounts] = useState({});
    const [address, setAdd] = useState('');
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState({ccp: '',cvv:''});
    let total;

    useEffect(() => {
        axios.get('http://localhost:3006/seller/storage/free')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleCountChange = (i, value) => {
        setCounts(prevCounts => ({ ...prevCounts, [i]: value }));
    };

    const addToBill = (i) => {
        const count = counts[i] || 1;
        const item = {
            id: products[i].id_s,
            name: products[i].nom,
            count: count,
            price: products[i].price * count,
            totalCount: products[i].qte_stock
        };
        setBill(prevBill => [...prevBill, item]);
    };
    const generateUniqueCommandNumber = () => {
        const randomNumber = Math.floor(Math.random() * 9000);
        const timestamp = new Date();
        return timestamp.getDay().toString() + randomNumber.toString();
    };
    const calculTotal = ()=>{
        total =0;
        bill.forEach(element => {
            total += element.price;
        });
        document.getElementById('total').value = total;
        setOpen(!open);
        console.log(total);
    }
    const resetBill = () => {
        setBill([]);
        total =0;
    };
    const sendFac= async()=>{
        const NumberBill = generateUniqueCommandNumber();
        if (address!='' && account.ccp!='' && account.cvv!='') {
            try {
                await Promise.all(bill.map(Element=>{
                    axios.post('http://localhost:3006/seller/fac_dist',{bill:Element , address , NumberBill});
                    console.log('bill sent :)');  
                }))
                window.alert('Thank you for buying from us :)');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div id='client' className='mb-2 pb-3'>
            <div className='globl-title row justify-content-between w-100 align-items-center ps-4 pe-4 '>
                <div className='col-3'>
                    <img src={shopp} alt='logo' />
                    <h5>SalCo pharmacy</h5>
                </div>
                <div className='col-6'>
                    <h3>Welcome TO Our Pharmacy</h3>
                </div>
                <div className='col-2'>
                    <a href='/' className='btn btn-danger text-uppercase'>Home</a>
                </div>
            </div>
            <div className='row justify-content-between bg-white content mt-2 me-3 p-1'>
                <div className='col-sm-6'>
                    <h4 className='title-client text-uppercase'>Products & Medications</h4>
                    {products.length > 0 ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Count</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    <tr key={i}>
                                        <td>{product.nom}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <input
                                                type='number'
                                                min={1}
                                                max={product.qte_stock}
                                                value={counts[i] || 1}
                                                onChange={e => handleCountChange(i, Number(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => addToBill(i)}>Buy</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='p-2'>No products data available</p>
                    )}
                </div>
                <div className='col-sm-4'>
                    <h4 className='title-client text-uppercase'>Bill</h4>
                    {bill.length > 0 ? (
                        <div>
                            <table className='table mb-2' id='facture'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Count</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.count}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <div>
                                <div className='mt-2 mb-2'>
                                    <label>Address</label>
                                    <input type='text' placeholder='Address' className='mt-2 ms-4 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} onChange={e=>setAdd(e.target.value)}/>
                                </div>
                                <button className='btn btn-success me-3' onClick={calculTotal} aria-controls="fadetext" aria-expanded={open} >Buy Now</button>
                                <button type='button' className='btn btn-danger' onClick={resetBill}>Reset</button>
                                <ReactToPrint
                                    trigger={
                                        ()=>(<div className="btn btn-success p-1 w-25 m-2 w-50">Print</div>)
                                    }
                                    documentTitle="Facture"
                                    content={() => document.getElementById("facture")}
                                    pageStyle="print"
                                />
                            </div>
                        </div>
                    ) : (
                        <p>No items in the bill</p>
                    )}
                </div>
            </div>
            <Fade in={open}>
                <div id="fadetext" className='mt-4 bg-white me-3 p-1'>
                    <h3 >Pay Online</h3>
                    <div className='row justify-content-center'>
                        <div className='row justify-content-center'>
                            <label className='col-3'>CCP Number</label>
                            <input type='number' placeholder='CCP Number' onChange={e=>account.ccp = e.target.value} className='mt-2 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} />
                        </div>
                        <div className='row justify-content-center'>
                            <label className='col-3'>CVV</label>
                            <input type='number' max={999} placeholder='CVV' onChange={e=>account.cvv = e.target.value} className='mt-2 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} />
                        </div>
                        <div className='row justify-content-center'>
                            <label className='col-3'>Total Price</label>
                            <input type='text' id='total' disabled className='mt-2 col-4 rounded-2 p-1' style={{outline:'none',border:'1px solid gray'}} />
                        </div>
                        <button className='btn btn-success w-25 mt-3' onClick={sendFac}>Buy</button>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Client;
