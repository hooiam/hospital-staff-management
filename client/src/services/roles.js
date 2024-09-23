import axiosInstance from './axiosInstance'

// Get all roles
export const getAllRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles')
    return response.data
  } catch (error) {
    console.error('Error fetching roles:', error)
    throw error.response.data
  }
}

// Get a single role by ID
export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/roles/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching role by ID:', error)
    throw error.response.data
  }
}

// Create a new role
export const createRole = async (roleData) => {
  try {
    const response = await axiosInstance.post('/roles', roleData)
    return response.data
  } catch (error) {
    console.error('Error creating role:', error)
    throw error.response.data
  }
}

// Update an existing role
export const updateRole = async (id, roleData) => {
  try {
    const response = await axiosInstance.put(`/roles/${id}`, roleData)
    return response.data
  } catch (error) {
    console.error('Error updating role:', error)
    throw error.response.data
  }
}

// Delete a role
export const deleteRole = async (id) => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting role:', error)
    throw error.response.data
  }
}
