import axios from 'axios'

// Read api url from .env file
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8000';

const API_URL = `${BASE_URL}/api/auth/login`

// login via password
const login = async (data) => {
  try {
    const response = await axios.post(API_URL, data)
    return response.data
  } catch (error) {
    console.error('Error loggin:', error)
    throw error.response.data
  }  
}

export default login
