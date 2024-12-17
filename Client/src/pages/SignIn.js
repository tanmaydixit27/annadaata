import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import the loginUser API function
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser({ email, password });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        navigate('/'); // Redirect to home page or desired route
        window.location.reload(); // Refresh to update navbar
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  return (
    <Container maxWidth="sm" className="sign-in-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box className="sign-in-box" style={{ width: '100%', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Typography variant="h4" className="sign-in-title" align="center" gutterBottom>Sign In to Anndaata</Typography>
        
        {error && <Typography color="error" align="center">{error}</Typography>}
        
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            className="sign-in-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            className="sign-in-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="sign-in-button"
            style={{ marginTop: '16px', padding: '12px' }}
          >
            Sign In
          </Button>
        </form>
        
        <Typography variant="body2" className="sign-up-link" align="center" style={{ marginTop: '16px' }}>
          Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
