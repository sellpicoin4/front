import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import logo from './assets/pi-logo.png';
import upi from './assets/upi.png';
import gpay from './assets/gpay.png';
import phonepe from './assets/phonepe.png';
import bhim from './assets/bhim.png';
import cred from './assets/cred.png';
import paytm from './assets/paytm.png';
import UpiPayment from './components/UpiPayment';
import Gpay from './components/Gpaay';
import Ppay from './components/Ppay';
import Bpay from './components/Bpay';
import Cpay from './components/Cpay';
import Papay from './components/Papay';
import Wallet from './components/Wallet';

function App() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [piQuantity, setPiQuantity] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePaymentClick = (method) => {
    setPaymentMethod(method);
  };

  const handlePiChange = (e) => {
    const pi = e.target.value;
    setPiQuantity(pi);
    // Calculate payment: 1 Pi = 2200 rupees
    if (pi && !isNaN(pi)) {
      const amount = parseFloat(pi) * 2200;
      setPaymentAmount(amount.toFixed(2));
    } else {
      setPaymentAmount('');
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <nav className="navbar">
              <div className="navbar-content">
                <div className="nav-left">
                  <img src={logo} alt="PiNet Logo" className="logo" />
                  <span className="nav-title">PiNet</span>
                </div>
                <div className="nav-center">
                  <a href="#" className="nav-link">Market π</a>
                </div>
                <div className="nav-right">
                  <Link to="/wallet" className="btn download-btn">Download Pi Browser</Link>
                </div>
              </div>
            </nav>

            <section className="form-section">
              <h1 className="form-heading">
                <img src={logo} alt="Pi Logo" className="form-logo" />
                Sell Your Pi Coins
              </h1>
              <form className="sell-form">
                <input
                  type="text"
                  placeholder="Enter Pi"
                  className="form-input"
                  value={piQuantity}
                  onChange={handlePiChange}
                />
                <input
                  type="text"
                  placeholder="Amount"
                  className="form-input"
                  value={paymentAmount}
                  readOnly
                />
                <Link to="/wallet" className="submit-btn">Payment received through</Link>
              </form>
            </section>

            <section className="payment-icons">
              <Link to="/upi-payment" className="icon-container" onClick={() => handlePaymentClick('UPI')}>
                <img src={upi} alt="UPI" className="payment-icon" />
                <span>UPI</span>
              </Link>
              <Link to="/Gpay" className="icon-container" onClick={() => handlePaymentClick('Google Pay')}>
                <img src={gpay} alt="Google Pay" className="payment-icon" />
                <span>Google Pay</span>
              </Link>
              <Link to="/Ppay" className="icon-container" onClick={() => handlePaymentClick('Phone Pay')}>
                <img src={phonepe} alt="Phone Pay" className="payment-icon" />
                <span>Phone Pay</span>
              </Link>
              <Link to="/Bpay" className="icon-container" onClick={() => handlePaymentClick('BHIM')}>
                <img src={bhim} alt="BHIM" className="payment-icon" />
                <span>BHIM</span>
              </Link>
              <Link to="/Cpay" className="icon-container" onClick={() => handlePaymentClick('CRED')}>
                <img src={cred} alt="CRED" className="payment-icon" />
                <span>CRED</span>
              </Link>
              <Link to="/Papay" className="icon-container" onClick={() => handlePaymentClick('Paytm')}>
                <img src={paytm} alt="Paytm" className="payment-icon" />
                <span>Paytm <img src={upi} alt="UPI" className="sub-icon" /></span>
              </Link>
            </section>
          </>
        } />
        <Route path="/upi-payment" element={<UpiPayment />} />
        <Route path="/Gpay" element={<Gpay />} />
        <Route path="/Ppay" element={<Ppay />} />
        <Route path="/Bpay" element={<Bpay />} />
        <Route path="/Cpay" element={<Cpay />} />
        <Route path="/Papay" element={<Papay />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;