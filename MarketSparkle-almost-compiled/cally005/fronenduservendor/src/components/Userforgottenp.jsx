import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './userforgotten.css'

const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      // Send a request to your backend's forgotPassword endpoint
      await axios.post('https://backend-cmrf.onrender.com/api/forgot-password/user', { email });

      // Display success message using toast
      toast.success('Password reset instructions sent. Check your email.');

      // Navigate to the password-link-sent page
      navigate('/Resetlink');
    } catch (error) {
      // Display error message using toast
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send password reset instructions. Please try again.');
      }

      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <html lang="en">
      {/* ... (head section) */}
      <body className="containers bg-light">
        <div className="bg-white h-75" id="mainbox9">
          <section className="w-50 mx-auto">
            <img src="./assets/nine.jpg" alt="" className="h-100 w-100 px-auto" />
          </section>
          <h5 className="text-center7 text-success7">Password Reset</h5>
          <section className="mx-auto">
            <p className="text-center text-dark">
              Oops, seems like you’ve forgotten your password. No worries! Enter your email address below, and we’ll guide you through the steps to reset your password securely. Your information is safe with us; protecting your data is our priority.
            </p>
            <form>
              <input
                className="form-control w-50 mx-auto my-3"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn7 text-center btn7-warning btn-lg text-center w-50 text-black"
                style={{ margin: '0px 25%' }}
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Link'}
              </button>
            </form>
          </section>
        </div>
      </body>
    </html>
  );
};

export default ForgottenPassword;
