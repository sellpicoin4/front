import { useLocation } from 'react-router-dom';
import '../css/WithdrawalSuccessPage.css';

// Withdrawal Success Page component
function WithdrawalSuccessPage() {
  const { state } = useLocation();
  const { payoutId, amount } = state || {};

  return (
    <div className="failed-container">
      <div className="failed-box">
        <h1 className="failed-title">Payment Failed!</h1>
        <p className="failed-info">Your withdrawal of ₹{amount || 'N/A'} could not be processed.</p>
        <p className="failed-info">Transaction ID: {payoutId || 'N/A'}</p>
        <p className="failed-info">Please try again or contact support.</p>
        <a href="/" className="home-button">Back to Home</a>
      </div>
    </div>
  );
}

export default WithdrawalSuccessPage;