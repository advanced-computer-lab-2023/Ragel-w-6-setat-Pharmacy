import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const LoginComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { userType } = useParams();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            // id="username"
            // name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            // id="password"
            // name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      
        
      </form>
    </div>
  );
};

export default LoginComponent;
