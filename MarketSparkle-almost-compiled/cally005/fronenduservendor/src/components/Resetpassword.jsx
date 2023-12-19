import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './passwordverified.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSavePassword = async () => {
    try {
      setLoading(true);

      // Send a request to your backend's resetPassword endpoint
      const response = await axios.post('https://backend-cmrf.onrender.com/api/reset-password', {
        token,
        newPassword,
        confirmPassword,
      });

      // Display success message using toast
      toast.success(response.data.message);

      // Navigate to the login page
      navigate('/passwordchanged');
    } catch (error) {
      // Display error message using toast
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }

      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-light">
      <div className="py-3 w-sm-100 w-md5" id="mainbox">
        <section className="h-50 w-50 mx-auto my-0 text-center">
          <img src="./images/Computer security with login and password padlock.png" alt="" className="img-fluid" />
        </section>

        <section className="divs">
          <h3 className="text-center">Change Password</h3>
          <form>
            <input
              className="form-control"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Re-type new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Display password mismatch error message */}
            {newPassword !== confirmPassword && (
              <p className="text-danger text-center">Passwords do not match</p>
            )}

            {/* Button with loader */}
            <button
              type="button"
              className="btn text-center btn-outline-warning btn-lg text-center w-50"
              style={{ margin: '0px 25%' }}
              onClick={handleSavePassword}
              disabled={loading || newPassword !== confirmPassword}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
