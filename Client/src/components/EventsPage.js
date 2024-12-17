import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../services/eventService';
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ name: '', date: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Memoize fetchEvents using useCallback
  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEvents(token);
      setEvents(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert("Unauthorized access. Please log in.");
        localStorage.removeItem('authToken');
        setTimeout(() => {
          navigate('/SignIn');
        }, 0);
      } else {
        console.error("Error fetching events:", error);
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
      fetchEvents();
    }
  }, [fetchEvents, token, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateEvent(editId, formData, token);
        setEditMode(false);
        setEditId(null);
      } else {
        await createEvent(formData, token);
      }
      setFormData({ name: '', date: '', description: '' });
      fetchEvents();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditMode(true);
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, token);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Container className="events-container">
      <Typography variant="h4" align="center" gutterBottom>Manage Events</Typography>
      <Box component="form" onSubmit={handleSubmit} className="form-box">
        <TextField
          label="Event Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
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
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(event)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(event._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EventsPage;
