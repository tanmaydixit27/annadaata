import axios from 'axios';

const API_URL = 'http://localhost:5000/api/grains';

export const createGrain = async (data, token) => {
  return await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getGrains = (token) =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }, 
  });

export const updateGrain = (id, grainData, token) =>
  axios.put(`${API_URL}/${id}`, grainData, {
    headers: { Authorization: `Bearer ${token}` }, // Fixed typo here
  });

export const deleteGrain = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
