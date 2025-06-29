import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WithdrawalPage from './pages/WithdrawalPage';
import CoinKey from './pages/CoinKeyPage';
import Phonepepage from './pages/Phonepe';
import Gpaypage from './pages/gpay';
import Bhimpage from './pages/bhim';
import Credpage from './pages/cred';
import Paytm from './pages/paytm';

import UpiPage from './pages/Upipage';
import WithdrawalSuccessPage from './pages/WithdrawalSuccessPage';
import './App.css';

// Main App component jo routing aur state manage karta hai
function App() {
  const [quantity, setQuantity] = useState(''); // Pi quantity state
  const [totalAmount, setTotalAmount] = useState(''); // Total amount state

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                quantity={quantity}
                setQuantity={setQuantity}
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
              />
            }
          />
          <Route
            path="/withdraw"
            element={<WithdrawalPage quantity={quantity} totalAmount={totalAmount} />}
          />
          <Route
            path="/withdrawal-success"
            element={<WithdrawalSuccessPage />}
          />
          <Route
            path="/UpiPage"
            element={<UpiPage />}
          />
          <Route
            path="/Gpaypage"
            element={<Gpaypage />}
          />
          <Route
            path="/Bhimpage"
            element={<Bhimpage />}
          />
          <Route
            path="/Credpage"
            element={<Credpage />}
          />
          <Route
            path="/Phonepepage"
            element={<Phonepepage />}
          />
                    <Route
            path="/Paytm"
            element={<Paytm />}
          />
          <Route
            path="/CoinKey"
            element={<CoinKey />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;