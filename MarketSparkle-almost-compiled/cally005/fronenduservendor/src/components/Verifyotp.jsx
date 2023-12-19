import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import {useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';// Import Bootstrap CSS
import './Verifyotp.css';


function Verifyotp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Assuming you have the user from the user signup response or somewhere else
    const UserId = '...';

    try {
      const response = await axios.post('https://backend-cmrf.onrender.com/api/verify-email-user', { UserId, otp });
      console.log('User OTP verification successful:', response.data);
      toast.success('Email address verified successfully.');

      // After successful OTP verification, navigate to the user login page
      navigate('/verificationsuccessful');
    } catch (error) {
      console.error('User OTP verification error:', error.response.data);
      toast.error('User OTP verification unsuccessful.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post('https://backend-cmrf.onrender.com/api/resend-otp', { /* Add necessary data for resend */ });
      console.log('Resend OTP successful:', response.data);
      toast.success('OTP resent successfully.');
      setCountdown(600); // Reset the countdown after resending OTP
    } catch (error) {
      console.error('Resend OTP error:', error.response.data);
      toast.error('Failed to resend OTP.');
    }
  };

  return (
    <div className="container text-center vh-100 d-flex align-items-center">
      <div className="container bg-white h-35" id="mainbox3">
        <section className="">
          <img src="./assets/seven.jpg" alt="" className="image3" />
        </section>

        <section className="text12">
          <h5 className="text-center text-success">Verify Email</h5>
          <p className="text-center text-dark">
            Please enter the 6 digit code sent to your email to verify
          </p>

          <form onSubmit={verifyOtp}>
            <input
              className="form-control "
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <div className="border border-5 border-light rounded-5 w-25 text-center mx-auto">
              {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
            </div>

            <p className="text-center6 text-warning" onClick={resendOtp} style={{ cursor: 'pointer' }}>
              Resend OTP
            </p>

            <button
              type="submit"
              className="btn6 btn6-warning btn1-lg text-black w-50"
            //   style={{ margin: '0px 25%' }}
              disabled={loading || countdown === 0}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Verifyotp;





































// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate, useLocation } from 'react-router-dom';


// const userEmail = location.state ? location.state.email : '';
// const [otp, setOtp] = useState('');
// const navigate =  useNavigate()

//   const Verifyotp = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', 
//        userEmail, otp
//       );

//       if ((response.status === 200)) {
//         // toast.success('Email verified successfully.');
//         navigate('/verificationsuccessful')
//         // You can redirect the user to a success page or perform any other action
//       } else {
//         throw new Error('Error verifying email');
//       }
//     } catch (error) {
//         if (error.response && error.response.status === 404){
//       toast.error('Email adddress not found in the databasse');
//     }else{
//         toast.error('Error verifying email. Please try again.');
//       }
      
//     }

// // function Verifyotp() {
// //   const location = useLocation();
// //   const userEmail = location.state ? location.state.email : '';
// //   const [otp, setOtp] = useState('');
// //     const navigate =  useNavigate()

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', 
// //       otp, userEmail
     
// //       );

// //       if ((response.status === 200)) {
// //         // toast.success('Email verified successfully.');
// //         navigate('/verificationsuccessful')
// //         // You can redirect the user to a success page or perform any other action
// //       } else {
// //         throw new Error('Error verifying email');
// //       }
// //     } catch (error) {
// //         if (error.response && error.response.status === 404){
// //       toast.error('Email adddress not found in the databasse');
// //     }else{
// //         toast.error('Error verifying email. Please try again.');
// //       }
// //     }
// //     }
  

// //   const handleResendOtp = async () => {
// //     try {
// //       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/resend-otp', {
// //         email: userEmail,
// //       });

// //       if (response.data.message === 'New OTP sent successfully.') {
// //         toast.success('OTP resent successfully.');
// //       } else {
// //         toast.error('Failed to resend OTP.');
// //       }
// //     } catch (error) {
// //       toast.error('Failed to resend OTP.');
// //     }
// //   };

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <p>An OTP has been sent to your email: {userEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Enter OTP:</label>
//         <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <button type="submit">Verify</button>
//       </form>
//       <button onClick={handleResendOtp}>Resend OTP</button>
//     </div>
//   );
//   }

// export default Verifyotp;













// import React, { useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';


// function Verifyotp() {
//  const location = useLocation();

//  const userEmail = location.state ? location.state.email : '';

//  const [otp, setOtp] = useState('');

//  const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Your API call to verify the OTP here...
//  try {
//             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', otp, {email: userEmail});
//             if (response.data.message === 'OTP resent') {
//                 toast.success('OTP resent successful.');
//             } else {
//                 toast.error('OTP resent unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP resent unsuccessful.');
//         }
//     };

//  const handleResendOtp = async () => {
//     try {
//         const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', {email: userEmail});
//         if (response.data.message === 'OTP resent') {
//             toast.success('OTP resent successfully.');
//         } else {
//             toast.error('OTP resent unsuccessful.');
//         }
//     } catch (error) {
//         toast.error('OTP resent unsuccessful.');
//     }
// };

//  return (
//     <div>
//       <h2>Verify OTP</h2>
//       <p>An OTP has been sent to your email: {userEmail}</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="otp">Enter OTP:</label>
//         <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         <button type="submit">Verify</button>
//       </form>
//       <button onClick={handleResendOtp}>Resend OTP</button>
//     </div>
//  );
// }

// export default Verifyotp;

















// const VerifyOTP = () => {
//     const [otp, setOtp] = useState('');
//     const history = useNavigate();

//     const verifyOTPSubmit = async (e) => {
//         e.preventDefault();
//         let userobj = {otp};

//         try {
//             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj);
//             if (response.data.message === 'OTP verified') {
//                 toast.success('OTP verification successful.');
//                 history('/verification-successful');
//             } else {
//                 toast.error('OTP verification unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP verification unsuccessful.');
//         }
//     };

//     const resendOTP = async () => {
//         let userobj = {};

//         try {
//             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', userobj);
//             if (response.data.message === 'OTP resent') {
//                 toast.success('OTP resent successful.');
//             } else {
//                 toast.error('OTP resent unsuccessful.');
//             }
//         } catch (error) {
//             toast.error('OTP resent unsuccessful.');
//         }
//     };

//     return (
//         <div className="verifyOTP">
//             <h2>Verify OTP</h2>
//             <form onSubmit={verifyOTPSubmit}>
//                 <label>Enter OTP:</label>
//                 <input type="text" required onChange={e => setOtp(e.target.value)} />

//                 <button type="submit">Verify OTP</button>
//                 <button onClick={resendOTP}>Resend OTP</button>
//             </form>
//         </div>
//     );
// };

// export default VerifyOTP;




















// How can I ensure that the email address is valid before sending the OTP




// How can I handle the case where the user enters an invalid email address or the OTP is incorrect















// import React, { useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VerifyOTP = () => {
//  const [otp, setOtp] = useState('');
//  const [email, setEmail] = useState('');
//  const [show, setShow] = useState(false);
//  const history = useNavigate();

//  const verifyOTPSubmit = async (e) => {
//     e.preventDefault();
//     let userobj = { otp, email };

//     try {
//       const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj);
//       if (response.data.message === 'OTP verified') {
//         toast.success('OTP verification successful.');
//         history('/verification-successful');
//       } else {
//         toast.error('OTP verification unsuccessful.');
//       }
//     } catch (error) {
//       toast.error('OTP verification unsuccessful.');
//     }
//  };

//  return (
//     <div>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Verify OTP</h2>
//           <Form onSubmit={verifyOTPSubmit}>
//             <Form.Group id="otp">
//               <Form.Label>Enter OTP</Form.Label>
//               <Form.Control type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Label>Enter Email</Form.Label>
//               <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </Form.Group>
//             <Button className="w-100" type="submit">
//               Verify OTP
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <ToastContainer />
//     </div>
//  );
// };

// export default VerifyOTP;





































































// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { toast } from 'react-hot-toast';


// // const VerifyOTP = () => {
// //     const [email, setEmail] = useState('')
// //     const [otp, setOtp] = useState('')
   
// //     const history = useNavigate();

// //     const verifyOTPSubmit = async (e) => {
// //         e.preventDefault();
// //         let userobj = {otp, email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.fetch('https://backends-zgvg.onrender.com/api/verify-email', userobj)
// //             toast.success('OTP verification successful.')
// //             history('/verification-successful');
// //         } catch (error) {
// //             toast.error('OTP verification unsuccessful.')
// //         }
// //     }

// //     const resendOTP = async () => {
// //         let userobj = {email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend-otp', userobj)
// //             toast.success('OTP resent successful.')
// //         } catch (error) {
// //             toast.error('OTP resent unsuccessful.')
// //         }
// //     }

// //     return (
// //         <div className="verifyOTP">
// //             <h2>Verify OTP</h2>
// //             <form onSubmit={verifyOTPSubmit}>
// //                 <label>Enter OTP:</label>
// //                 <input type="text" required onChange={e => setOtp(e.target.value)} />

// //                 <button  type="submit">Verify OTP</button>
// //                 <button onClick={resendOTP}>Resend OTP</button>
// //             </form>

// //             {/* <p>Didn't receive the OTP? <Link to="/resendOTP">Resend OTP</Link></p> */}
// //         </div>
// //     )
// // }

// // export default VerifyOTP;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useHistory } from 'react-router-dom';
// // import toast, { Toaster } from 'react-hot-toast';

// // const VerifyOTP = () => {
// //     const [otp, setOtp] = useState('')
// //     const [email, setEmail] = useState('')
// //     const history = useHistory();

// //     const verifyOTPSubmit = async (e) => {
// //         e.preventDefault();
// //         let userobj = {otp, email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/verify/otp', userobj)
// //             toast.success('OTP verification successful.')
// //             history.push('/verification-successful');
// //         } catch (error) {
// //             toast.error('OTP verification unsuccessful.')
// //         }
// //     }

// //     const resendOTP = async () => {
// //         let userobj = {email}
// //         console.log(userobj)

// //         try {
// //             const response = await axios.post('https://backends-zgvg.onrender.com/api/resend/otp', userobj)
// //             toast.success('OTP resent successful.')
// //         } catch (error) {
// //             toast.error('OTP resent unsuccessful.')
// //         }
// //     }

// //     useEffect(() => {
// //         if (otp.length === 4) {
// //             verifyOTPSubmit();
// //         }
// //     }, [otp]);

// //     return (
// //         <div className="verifyOTP">
// //             <h2>Verify OTP</h2>
// //             <form onSubmit={verifyOTPSubmit}>
// //                 <label>Enter OTP:</label>
// //                 <input type="text" required onChange={e => setOtp(e.target.value)} />

// //                 <button type="submit">Verify OTP</button>
// //                 <button onClick={resendOTP}>Resend OTP</button>
// //             </form>

// //             {/* <p>Didn't receive the OTP? <Link to="/resendOTP">Resend OTP</Link></p> */}
// //         </div>
// //     )
// // }

// // export default VerifyOTP;