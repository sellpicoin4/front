import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Coin Auth Page component
function CoinAuthPage({ quantity, totalPrice }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [coinKey, setCoinKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle withdrawal submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit-withdrawal', {
        quantity,
        totalPrice,
        method: state.method,
        upiId: state.upiId,
        accountNo: state.accountNo,
        ifsc: state.ifsc,
        accountHolder: state.accountHolder,
        coinKey,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/'), 2000); // Redirect to home after success
    } catch (err) {
      setError('Withdrawal failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Confirm Withdrawal</h1>
      <p className="mb-4">Quantity: {quantity} | Total Price: ₹{totalPrice}</p>
      <p className="mb-4">Account Holder: {state.accountHolder}</p>
      <div className="mb-4">
        <label className="block text-gray-700">Coin Key / Passphrase</label>
        <input
          type="text"
          value={coinKey}
          onChange={(e) => setCoinKey(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter coin key"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Confirm Withdraw
      </button>
    </div>
  );
}

export default CoinAuthPage;