import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      console.log(response.data);

      // Save the user info or token in state/localStorage and setAuth
      window.localStorage.setItem('token', response.data.token);
      setAuth(response.data);  // Update auth state

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Register;