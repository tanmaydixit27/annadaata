import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const createEvent = async (data, token) => {
  return await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEvents = (token) =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateEvent = (id, eventData, token) =>
  axios.put(`${API_URL}/${id}`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteEvent = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
