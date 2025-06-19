import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import upi1 from '../assets/upi-1.png';
import upiPin from '../assets/upi-pin.png';
import wallet from '../assets/Wallet1.png';

function UpiPayment() {
  useEffect(() => {
    // Countdown Timer
    function startCountdown(duration) {
      let timer = duration, minutes, seconds;
      const countdownElement = document.getElementById('countdown-timer');

      const interval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        countdownElement.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(interval);
          countdownElement.textContent = "00:00";
        }
      }, 1000);
    }

    // Start countdown from 14:58
    const startMinutes = 14;
    const startSeconds = 58;
    startCountdown(startMinutes * 60 + startSeconds);

    // Disable developer tools and right-click
    const disableDevTools = (e) => {
      if (
        (e.ctrlKey && e.key.toLowerCase() === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
        (e.key === 'F12')
      ) {
        e.preventDefault();
        alert("Developer tools are disabled!");
      }
    };

    const disableRightClick = (e) => {
      e.preventDefault();
      alert("Right-click is disabled!");
    };

    document.addEventListener('keydown', disableDevTools);
    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('keydown', disableDevTools);
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8 mb-4">
          <h3 className="text-center mb-4">Follow These Steps to Complete Your UPI Payment</h3>

          {/* Step 1 */}
          <div className="step-box row align-items-center text-center text-md-start">
            <div className="col-md-3 col-3">
              <img src={upi1} alt="Google Pay" className="img-fluid" width="200" />
            </div>
            <div className="col-md-9 col-9">
              <div className="step">
                <h5>Step 1</h5>
                <p>Open your <strong>UPI payment app</strong> (Google Pay, PhonePe, Paytm, etc.).</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-box row align-items-center text-center text-md-start mt-4">
            <div className="col-md-3 col-3">
              <img src={upiPin} alt="UPI PIN" className="img-fluid" width="200" />
            </div>
            <div className="col-md-9 col-9">
              <div className="step">
                <h5>Step 2</h5>
                <p>Check pending requests and approve payment by entering <strong>UPI PIN</strong>.</p>
              </div>
            </div>
          </div>

          {/* Step 3: Transaction Timeout */}
          <div className="step-box row align-items-center text-center mt-4">
            <div className="col-md-12">
              <div className="step text-center">
                <h5>Transaction Timeout</h5>
                <p>Transaction expires in <strong id="countdown-timer" className="countdown-timer">14:58</strong>.</p>
              </div>
            </div>
          </div>

          {/* Step 4: Connect Wallet */}
          <div className="step-box row align-items-center text-center text-md-start mt-4">
            <div className="col-md-3 col-3">
              <img src={wallet} alt="Connect Wallet" className="img-fluid" width="200" />
            </div>
            <div className="col-md-9 col-9">
              <div className="step">
                <h5>Connect Wallet</h5>
                <p>Ensure your wallet is connected to proceed with the transaction.</p>
                <Link to="/wallet" className="btn btn-primary btn-sm mt-2">Connect Wallet</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpiPayment;