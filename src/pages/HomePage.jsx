import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pi-logo.png';
import upi from '../assets/upi.png';
import gpay from '../assets/gpay.png';
import phonepe from '../assets/phonepe.png';
import bhim from '../assets/bhim.png';
import cred from '../assets/cred.png';
import paytm from '../assets/paytm.png';
import '../css/HomePage.css';

function HomePage({ quantity, setQuantity, totalAmount, setTotalAmount }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePiChange = (e) => {
    const pi = e.target.value;
    setQuantity(pi);
    if (pi && !isNaN(pi)) {
      const amount = parseFloat(pi) * 3300;
      setTotalAmount(amount.toFixed(2));
    } else {
      setTotalAmount('');
    }
  };

  const handleProceedClick = (e) => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      e.preventDefault();
      window.alert('Please enter a valid Pi quantity to proceed');
    }
  };

  const isQuantityValid = quantity && !isNaN(quantity) && quantity > 0;

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
            state={{ quantity, totalAmount, paymentMethod }}
            onClick={handleProceedClick}
          >
            Proceed to Payment
          </Link>
        </form>
      </section>

      <section className="payment-icons">
        {[
          { name: 'UPI', icon: upi, route: '/Upipage' },
          { name: 'Google Pay', icon: gpay, route: '/Gpaypage' },
          { name: 'Phone Pay', icon: phonepe, route: '/Phonepepage' },
          { name: 'BHIM', icon: bhim, route: '/Bhimpage' },
          { name: 'CRED', icon: cred, route: '/Credpage' },
          { name: 'Paytm', icon: paytm, route: '/Paytm' },
        ].map(({ name, icon, route }) => (
          <Link
            key={name}
            to={isQuantityValid ? route : "#"}
            state={{ quantity, totalAmount, paymentMethod: name }}
            className={`icon-container ${!isQuantityValid ? 'disabled' : ''}`}
            onClick={(e) => {
              if (!isQuantityValid) {
                e.preventDefault();
                window.alert("Please enter Pi quantity before selecting a payment method");
                return;
              }
              setPaymentMethod(name);
            }}
          >
            <img src={icon} alt={name} className="payment-icon" />
            <span>
              {name}
              {name === 'Paytm' && <img src={upi} alt="UPI" className="sub-icon" />}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
