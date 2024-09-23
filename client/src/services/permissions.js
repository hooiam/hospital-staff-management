import axiosInstance from './axiosInstance'

// Get all permissions
export const getAllPermissions = async () => {
  try {
    const response = await axiosInstance.get('/permissions')
    return response.data
  } catch (error) {
    console.error('Error fetching permissions:', error)
    throw error.response.data
  }
}
