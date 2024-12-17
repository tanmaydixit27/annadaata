import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { createGrain, getGrains, updateGrain, deleteGrain } from '../services/grainService';
import './GrainPage.css';

const GrainsPage = () => {
  const [grains, setGrains] = useState([]);
  const [formData, setFormData] = useState({ grainType: '', quantity: '', price: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Memoize fetchGrains using useCallback
  const fetchGrains = useCallback(async () => {
    try {
      const response = await getGrains(token);
      setGrains(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert("Please log in first.");
        localStorage.removeItem('authToken');
        setTimeout(() => {
          navigate('/SignIn');
        }, 0);
      } else {
        console.error("Error fetching grains:", error);
      }
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      window.alert("Please log in first.");
      setTimeout(() => {
        navigate('/SignIn');
      }, 0);
    } else {
      fetchGrains();
    }
  }, [fetchGrains, token, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateGrain(editId, formData, token);
        setEditMode(false);
        setEditId(null);
      } else {
        await createGrain(formData, token);
      }
      setFormData({ grainType: '', quantity: '', price: '', description: '' });
      fetchGrains();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (grain) => {
    setFormData(grain);
    setEditMode(true);
    setEditId(grain._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGrain(id, token);
      fetchGrains();
    } catch (error) {
      console.error("Error deleting grain:", error);
    }
  };

  return (
    <Container className="grains-container">
      <Typography variant="h4" align="center" gutterBottom>Sell Your Grains</Typography>
      <Box component="form" onSubmit={handleSubmit} className="form-box">
        <TextField
          label="Grain Type"
          name="grainType"
          value={formData.grainType}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" className="submit-button">
          {editMode ? 'Update' : 'Add'}
        </Button>
      </Box>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grain Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grains.map((grain) => (
              <TableRow key={grain._id}>
                <TableCell>{grain.grainType}</TableCell>
                <TableCell>{grain.quantity}</TableCell>
                <TableCell>{grain.price}</TableCell>
                <TableCell>{grain.description}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(grain)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(grain._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GrainsPage;
