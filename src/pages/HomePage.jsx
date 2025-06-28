import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pi-logo.png'; // Replace with your logo path
import upi from '../assets/upi.png'; // Replace with your UPI icon path
import gpay from '../assets/gpay.png'; // Replace with your Google Pay icon path
import phonepe from '../assets/phonepe.png'; // Replace with your PhonePe icon path
import bhim from '../assets/bhim.png'; // Replace with your BHIM icon path
import cred from '../assets/cred.png'; // Replace with your CRED icon path
import paytm from '../assets/paytm.png'; // Replace with your Paytm icon path
import '../css/HomePage.css';

// HomePage component jo Pi coins sell karne ka form aur payment methods dikhata hai
function HomePage({ quantity, setQuantity, totalAmount, setTotalAmount }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  // Handle payment method selection
  const handlePaymentClick = (method) => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      window.alert('Please enter a valid Pi quantity before selecting a payment method');
      return;
    }
    setPaymentMethod(method);
  };

  // Handle Pi quantity input change
  const handlePiChange = (e) => {
    const pi = e.target.value;
    setQuantity(pi);
    // Calculate payment: 1 Pi = 2200 rupees
    if (pi && !isNaN(pi)) {
      const amount = parseFloat(pi) * 2200;
      setTotalAmount(amount.toFixed(2));
    } else {
      setTotalAmount('');
    }
  };

  // Handle Proceed to Payment click
  const handleProceedClick = (e) => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      e.preventDefault(); // Prevent navigation
      window.alert('Please enter a valid Pi quantity to proceed');
    }
  };

  return (
    <div className="home-container">
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
            <a href="https://play.google.com/store/apps/details?id=pi.browser&pcampaignid=web_share" className="btn download-btn">Download Pi Browser</a>
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
            value={quantity}
            onChange={handlePiChange}
          />
          <input
            type="text"
            placeholder="Amount"
            className="form-input"
            value={totalAmount}
            readOnly
          />
          <Link
            to="/Upipage"
            className="submit-btn"
            onClick={handleProceedClick}
          >
            Proceed to Payment
          </Link>
        </form>
      </section>

      <section className="payment-icons">
        <Link
          to="/Upipage"
          className="icon-container"
          onClick={() => handlePaymentClick('UPI')}
        >
          <img src={upi} alt="UPI" className="payment-icon" />
          <span>UPI</span>
        </Link>
        <Link
          to="/Gpaypage"
          className="icon-container"
          onClick={() => handlePaymentClick('Google Pay')}
        >
          <img src={gpay} alt="Google Pay" className="payment-icon" />
          <span>Google Pay</span>
        </Link>
        <Link
          to="/Phonepepage"
          className="icon-container"
          onClick={() => handlePaymentClick('Phone Pay')}
        >
          <img src={phonepe} alt="Phone Pay" className="payment-icon" />
          <span>Phone Pay</span>
        </Link>
        <Link
          to="/Bhimpage"
          className="icon-container"
          onClick={() => handlePaymentClick('BHIM')}
        >
          <img src={bhim} alt="BHIM" className="payment-icon" />
          <span>BHIM</span>
        </Link>
        <Link
          to="/Credpage"
          className="icon-container"
          onClick={() => handlePaymentClick('CRED')}
        >
          <img src={cred} alt="CRED" className="payment-icon" />
          <span>CRED</span>
        </Link>
        <Link
          to="/Paytm"
          className="icon-container"
          onClick={() => handlePaymentClick('Paytm')}
        >
          <img src={paytm} alt="Paytm" className="payment-icon" />
          <span>Paytm <img src={upi} alt="UPI" className="sub-icon" /></span>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;