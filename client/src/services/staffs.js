import axiosInstance from './axiosInstance'

// Get all staff records
export const getAllStaffs = async (keyword = false) => {
  try {
    const url = keyword ? `/staffs?keyword=${keyword}` : '/staffs'
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching staffs:', error)
    throw error.response.data
  }
}

// Get a single staff by ID
export const getStaffById = async (id) => {
  try {
    const response = await axiosInstance.get(`/staffs/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching staff by ID:', error)
    throw error.response.data
  }
}

// Create a new staff record
export const createStaff = async (staffData) => {
  try {
    const response = await axiosInstance.post('/staffs', staffData)
    return response.data
  } catch (error) {
    console.error('Error creating staff:', error)
    throw error.response.data
  }
}

// Update an existing staff record
export const updateStaff = async (id, staffData) => {
  try {
    const response = await axiosInstance.put(`/staffs/${id}`, staffData)
    return response.data
  } catch (error) {
    console.error('Error updating staff:', error)
    throw error.response.data
  }
}

// Delete a staff record
export const deleteStaff = async (id) => {
  try {
    const response = await axiosInstance.delete(`/staffs/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting staff:', error)
    throw error.response.data
  }
}