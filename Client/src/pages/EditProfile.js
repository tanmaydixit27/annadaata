import React, { useEffect, useState } from 'react';
import { fetchCurrentUser, updateProfile } from '../services/api'; 
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './EditProfile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNo: '',
    pinCode: '',
    address: '',
    gender: '',
  });

  // Load user profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchCurrentUser();
        setFormData(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    loadProfile();
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container className="edit-profile-container">
      <Typography variant="h4" align="center" gutterBottom>Edit Profile</Typography>
      <Box component="form" onSubmit={handleSubmit} className="edit-profile-form">
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Contact No"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pin Code"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" className="submit-button">
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfile;
