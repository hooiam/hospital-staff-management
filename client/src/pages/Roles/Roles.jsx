import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getAllRoles, deleteRole } from '../../services/roles'

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles()
        setRoles(data.data)
      } catch (err) {
        console.error('Failed to fetch role:', err)
        setError(err.message)
      }
    }
    fetchRoles();
  }, [])

  // handling delete button click
  const handleDeleteConfirmed = async (id) => {
    const isConfirmed = window.confirm("If you delete this role then all staffs who are associated with this role will be deleted. Are you sure you want to delete this role?");
    if (isConfirmed) {
      try {
        await deleteRole(id);
        setRoles(roles.filter(role => role.id !== id)); // Remove deleted role from the list
      } catch (err) {
        console.error("Failed to delete role:", err)
        setError(err.message)
      }
    }
  }

  return (
    <>
      <h2 className="text-center mt-5 mb-3">All Roles</h2>
      { error && <div className="alert alert-danger" role="alert">
          { error }
      </div> }
      
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary" to="add">Create New Role </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Permissions</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
            { roles.map( (role, index) => (  
              <tr key={index}>
                <td>{role.name}</td>
                <td>{role.permissions.map( p => `${p.toUpperCase()} STAFFS`).join(', ')}</td>
                <td>
                  <Link to={`/roles/edit/${role.id}`}
                    className="btn btn-outline-success mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmed(role.id)}
                    className="btn btn-outline-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}