import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/cred.png';
import '../css/Upipage.css';

function Credpage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quantity, totalAmount, paymentMethod } = state || {};

  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateDetails = () => {
    if (method === 'upi') {
      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
      if (!upiId || !upiRegex.test(upiId)) {
        return 'Invalid UPI ID. Use format like example@upi';
      }
      return '';
    } else {
      const accountNoRegex = /^\d{10,16}$/;
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!accountNo || !accountNoRegex.test(accountNo)) {
        return 'Invalid Account Number. Must be 10-16 digits.';
      }
      if (!ifsc || !ifscRegex.test(ifsc)) {
        return 'Invalid IFSC Code. Must be like SBIN0001234.';
      }
      return '';
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');
    setAccountHolder('');

    const validationError = validateDetails();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const mockAccountHolder = method === 'upi' ? `User (${upiId})` : `User (${accountNo})`;
    setAccountHolder(mockAccountHolder);

    const mockPayoutId = `payout_${Math.random().toString(36).substr(2, 9)}`;

    setTimeout(() => {
      navigate('/CoinKey', {
        state: {
          quantity,
          totalAmount,
          method,
          upiId: method === 'upi' ? upiId : undefined,
          accountNo: method === 'bank' ? accountNo : undefined,
          ifsc: method === 'bank' ? ifsc : undefined,
          accountHolder: mockAccountHolder,
          payoutId: mockPayoutId,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="withdrawal-container">
          <div className="withdrawal-header">
            <img src={logo} alt="PiNet Logo" className="logo" />
            <h1 className="withdrawal-title">Withdrawal Details</h1>
          </div>
          <p className="withdrawal-info">
            Quantity: {quantity} | Total Amount: ₹{totalAmount} | Payment Method: {paymentMethod}
          </p>
          <div className="input-group">
            <label className="input-label">Withdrawal Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="method-select"
            >
              <option value="upi">UPI ID</option>
              <option value="bank">Bank Account</option>
            </select>
          </div>
          {method === 'upi' ? (
            <div className="input-group">
              <label className="input-label">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="upi-input"
                placeholder="example@upi"
              />
            </div>
          ) : (
            <>
              <div className="input-group">
                <label className="input-label">Account Number</label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="account-input"
                  placeholder="Enter account number"
                />
              </div>
              <div className="input-group">
                <label className="input-label">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="ifsc-input"
                  placeholder="Enter IFSC code"
                />
              </div>
            </>
          )}
          {accountHolder && <p className="success-text">Account Holder: {accountHolder}</p>}
          {error && <p className="error-text">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || (method === 'upi' ? !upiId : !accountNo || !ifsc)}
            className="verify-button"
          >
            {loading ? 'Processing...' : 'Verify & Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Credpage;