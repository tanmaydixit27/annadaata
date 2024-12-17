import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './SignUp.css';
import {useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    pinCode: '',
    address: '',
    gender: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await registerUser(formData);
  
      if (response.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', response.token);
        
        // Navigate to the home page or desired route
        navigate('/');
  
        // Reload the page to update the navbar with the profile icon
        window.location.reload();
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };
  

  return (
    <Container maxWidth="sm" className="sign-up-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box className="sign-up-box" style={{ width: '100%', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Typography variant="h4" className="sign-up-title" align="center" gutterBottom>Create an Account</Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Full Name"
            name="fullName"
            type="text"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.fullName}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.password}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Re-Type Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Contact No"
            name="contactNo"
            type="tel"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.contactNo}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Pin Code"
            name="pinCode"
            type="text"
            fullWidth
            margin="normal"
            className="sign-up-input"
            value={formData.pinCode}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Address"
            name="address"
            type="text"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            className="sign-up-input"
            value={formData.address}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" className="sign-up-input">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="sign-up-button"
            style={{ marginTop: '16px', padding: '12px' }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
