import React, { useState } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    tc: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic here
    userService.registerUser(formData)
    .then((response) => {
      // Handle successful registration here
      toast.success('Registration Successful', {
        position: 'bottom-center', // You can customize the position
        autoClose: 3000, // Time in milliseconds after which the toast will auto-close (e.g., 3000ms = 3 seconds)
      });

      console.log(response.data);
    })
    .catch((error) => {
      // Handle registration error here
      console.log()
      toast.error(error.response.data.message,{
        position : 'top-center',
        autoClose : 3000
      })
      console.error(error);
    });
    
  };


  return (
    <>
      <Header />
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                <h2 className="mt-5">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        name="tc"
                        className="form-check-input"
                        id="termsCheck"
                        checked={formData.tc}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="termsCheck">
                        I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                </div>
            </div>
        </div>
      <Footer />
    </>
  );
}

export default Registration;
