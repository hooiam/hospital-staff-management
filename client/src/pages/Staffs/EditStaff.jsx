import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"
import { getStaffById, updateStaff } from '../../services/staffs'
import { getAllRoles } from '../../services/roles'

export default function EditStaff() {
  const [staffData, setStaffData] = useState({ 
    name: '', 
    contact: '', 
    roleId: '',
    department: '',
    jobTitle: ''
  })
  const [roles, setRoles] = useState([])
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staff = await getStaffById(id)
        setStaffData(staff.data)  
      } catch (err) {
        console.error('Failed to fetch staff data:', err)
        setError(err.message)
      }
    }

    const fetchRoles = async () => {
      try {
        const rolesData = await getAllRoles()
        setRoles(rolesData.data)
      } catch (err) {
        console.error("Error fetching roles:", err)
        setError(err.message)
      }
    }
    fetchStaff()
    fetchRoles()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateStaff(id, staffData)
      navigate('/staffs') 
    } catch (err) {
      console.error('Failed to update staff:', err)
      setError(err.message)
    }
  }

  return (
    <>
      <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <h2 className="text-center mt-5 mb-3">Create Staff</h2>
          <div className="card">
            <div className="card-header">
              <Link
                className="btn btn-outline-info float-right"
                to="/staffs">View All Staffs
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
                    value={staffData.name}
                    onChange={(e) => setStaffData({ ...staffData, name: e.target.value })}
                    type="text"
                    className="form-control"
                    name="name" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Role</label>
                  <select 
                    className="form-control"
                    name="roleId" 
                    value={staffData.roleId}
                    onChange={(e) => setStaffData({ ...staffData, roleId: e.target.value })} 
                    required >
                    <option value="">Select a role</option>
                    {roles.map( (role, index) => (
                      <option key={index} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Department</label>
                  <input
                    value={staffData.department}
                    onChange={(e) => setStaffData({ ...staffData, department: e.target.value })}
                    type="text"
                    className="form-control"
                    name="department" />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Job Title</label>
                  <input
                    value={staffData.jobTitle}
                    onChange={(e) => setStaffData({ ...staffData, jobTitle: e.target.value })}
                    type="text"
                    className="form-control"
                    name="jobTitle" />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Contact Number</label>
                  <input
                    value={staffData.contact}
                    onChange={(e) => setStaffData({ ...staffData, contact: e.target.value })}
                    type="text"
                    className="form-control"
                    name="contact" required/>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-3">
                  Update Staff
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}