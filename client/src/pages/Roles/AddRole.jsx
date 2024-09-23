import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getAllPermissions } from '../../services/permissions'
import { createRole } from '../../services/roles'

export default function AddRole() {
  const [roleData, setRoleData] = useState({ 
    name: '', 
    permissions: ''
  })
  const [permissions, setPermissions] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissions = await getAllPermissions()
        setPermissions(permissions.data)
      } catch (err) {
        console.error("Error fetching roles:", err)
        setError(err.message)
      }
    }
    fetchPermissions()
  }, [])

  const handlePermissionChange = (e) => {
    const permission = e.target.value
    const isChecked = e.target.checked

    setRoleData((prevData) => {
      const updatedPermissions = isChecked
        ? [...prevData.permissions, permission] 
        : prevData.permissions.filter((perm) => perm !== permission); 

      return { ...prevData, permissions: updatedPermissions }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(roleData.permissions.length == 0) {
        throw {message: "Please select at least one permission"}
      }
      await createRole(roleData)
      navigate('/roles') 
    } catch (err) {
      console.error('Failed to add role:', err)
      setError(err.message)
    }
  }

  return (
    <>
      <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <h2 className="text-center mt-5 mb-3">Create role</h2>
          <div className="card">
            <div className="card-header">
              <Link
                className="btn btn-outline-info float-right"
                to="/roles">View All roles
              </Link>
            </div>
            <div className="card-body p-4 p-sm-5" >
            { error && <div className="alert alert-danger" role="alert">
              { error }
            </div> }
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    value={roleData.name}
                    onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
                    type="text"
                    className="form-control"
                    name="name" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="permission">Permissions</label>
                  { permissions.map( (permission, index) => (
                  <div className="form-check" key={index}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      value={permission.name} name="permissions"
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label" htmlFor="permissions">
                      {permission.name.toUpperCase()} STAFFS
                    </label>
                  </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-3">
                  Add role
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}