import React, { useState } from 'react';
import axios from 'axios';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");  
    setLoading(true);  
    console.log("Attempting login...");

    try {
      const response = await axios.post(
        "http://localhost:4200/vendor/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Login response:", response.data); 
      const token = response.data.token; 
      alert("Login Success");
      setEmail("");
      setPassword("");
      localStorage.setItem('loginToken', token);
      showWelcomeHandler();

    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className='loginSection'>
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>

        <label htmlFor="email">Email</label> 
        <input 
          type='email' 
          id='email'
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Enter your email'
          required
        /> <br/>
        
        <label htmlFor="password">Password</label> 
        <input 
          type='password' 
          id='password'
          name='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter your password'
          required
        /> <br/>

        <div className='btnSubmit'>
          <button type='submit' disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>

        {error && <p className='error'>{error}</p>}
      </form> 
    </div>
  );
};

export default Login;
