import React, { useState } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    userService.loginUser(formData)
    .then((Response)=>{
      localStorage.setItem('token',Response.data.token);

      toast.success('Login Successful', {
        position: 'bottom-center', 
        autoClose: 3000, 
      });

      console.log(Response.data);
    })
    .catch((error)=>{
      toast.error(error.response.data.message,{
        position : 'top-center',
        autoClose : 3000
      })
      console.log(error);
    })
  };

  return (
    <>
        <Header />
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                <h2 className="mt-5">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Username or Email"
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
}

export default Login;
