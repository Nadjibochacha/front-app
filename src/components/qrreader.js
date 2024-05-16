import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./qrreader.css";
function Qrreader() {
  const [result, setResult] = useState("");
  useEffect(() => {
    const handleScan = (data) => {
      if (data) {
        scanner.clear();
        setResult(data);
      }
    };

    const handleError = (err) => {
      console.error(err);
    };
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });
    scanner.render(handleScan, handleError);
  }, []);
  const cancel = ()=>{
    setResult('');
    window.location.reload();
  }
  return (
    <div id="qr">
      <div className="container">
        <h1>qr scanner</h1>
        <div id="reader" className="h-50"></div>
        <p>{result}</p>
        <div className="row justify-content-between mb-3 mt-5">
          <button className="btn btn-success col-6 col-md-2">
            as a CHIFA card
          </button>
          <button className="btn btn-success col-6 col-md-2">
            as a prescription
          </button>
          <button className="btn btn-danger col-6 col-md-2" onClick={cancel}>cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Qrreader;
