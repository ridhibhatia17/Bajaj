import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/bfhl';

export const analyzeHierarchy = async (dataArray) => {
  try {
    const response = await axios.post(API_URL, { data: dataArray });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'API Error: Something went wrong with the server.');
    } else if (error.request) {
      throw new Error('Network Error: Unable to reach the server. Make sure it is running.');
    } else {
      throw new Error(error.message);
    }
  }
};
