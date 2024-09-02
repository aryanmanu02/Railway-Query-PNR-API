import React from 'react';
import './App.css';
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handlePnrSubmit } from './pnr'; // Import handlePnrSubmit from pnr.js

function App() {
  return (
    <div className="App">
      <header className="test bg-light p-3">
        <div className="container">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <img className="logo1" src="logo.png" alt="logo" />
            <span className="start">
              <b>INDIAN RAILWAYS RESERVATION ENQUIRY</b>
            </span>
            <div className="control">
              <a href="project.html" className="mr-3">Home</a>
              <a href="PnrEnquiry.html" className="mr-3">PNR Enquiry</a>
              <a href="https://irctc.com/contact.html" className="mr-3">Contact us</a>
              <span className="text-muted">Social Media:</span>
              <a href="https://twitter.com/railwayseva?lang=en" className="ml-1"><i className='bx bxl-twitter'></i></a>
            </div>
            <img className="logo2" src="logo 2.png" alt="Irctc" />
          </div>
        </div>
      </header>
      <div className="container mt-5">
        <form onSubmit={handlePnrSubmit} className="pnr"> {}
          <label htmlFor="pnr">Enter your 10 digit PNR number</label>
          <input type="number" id="pnr" placeholder="PNR" name="pnr" className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
