import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); // Store token in local storage
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token } = response.data;


    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data?.message || error.message);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;

    // Set token in local storage and Axios headers
    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data?.message || error.message);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Log out a user (clears token)
export const logoutUser = () => {
  setAuthToken(null); // Remove token from storage and Axios headers
};

// Fetch current user details (example protected route)
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/current');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error.response?.data?.message || error.message);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Initialize auth token on app load if token is in localStorage
const token = localStorage.getItem('token');
if (token) setAuthToken(token);

export default api;

export const updateProfile = async(userData) =>{
  try{
    const response = await api.put('/auth/updateProfile',userData);
    return response.data;
  }catch(error){
    console.error('Error updating Profile:',error.response?.data?.message || error.message);
    throw error.response?.data || {message: 'Server error'};
  }
}