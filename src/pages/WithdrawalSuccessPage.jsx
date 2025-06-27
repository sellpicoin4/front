import { useLocation } from 'react-router-dom';
import '../css/WithdrawalSuccessPage.css';

// Withdrawal Success Page component
function WithdrawalSuccessPage() {
  const { state } = useLocation();
  const { payoutId, amount } = state || {};

  return (
    <div className="success-container">
      <h1 className="success-title">Withdrawal Successful!</h1>
      <p className="success-info">Your withdrawal of ₹{amount} has been processed.</p>
      <p className="success-info">Transaction ID: {payoutId}</p>
      <a href="/" className="home-button">Back to Home</a>
    </div>
  );
}

export default WithdrawalSuccessPage;