import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/login';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};
