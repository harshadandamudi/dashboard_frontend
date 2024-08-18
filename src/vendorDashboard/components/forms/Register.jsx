import React, { useState } from 'react';
import axios from 'axios';

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:4200/vendor/register",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log(response.data);
      setUsername("")
      setEmail("")
      setPassword("")
      alert("Vendor registered successfully");
      showLoginHandler()
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='registerSection'>
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label>Username</label> 
        <input 
          type='text' 
          name='username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder='Enter your name' 
        /> <br/>

        <label>Email</label> 
        <input 
          type='text' 
          name='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Enter your email' 
        /> <br/>
        
        <label>Password</label> 
        <input 
          type='password' 
          name='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter your password' 
        /> <br/>
        
        <div className='btnSubmit'>
          <button type='submit' disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
