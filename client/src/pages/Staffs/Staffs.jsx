import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { getAllStaffs, deleteStaff } from '../../services/staffs'

export default function Staffs() {
  const [staffs, setStaffs] = useState([]);
  const [error, setError] = useState('')

  const searchRef = useRef('')

  useEffect(() => {
    fetchStaffs();
  }, [])

  const fetchStaffs = async(search = false) => {
    try {
      const data = await getAllStaffs(search)
      setStaffs(data.data)
    } catch (err) {
      console.error('Failed to fetch staff:', err)
      setError(err.message)
    }
  }

  // handling delete button click
  const handleDeleteConfirmed = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this staff?");
    if (isConfirmed) {
      try {
        await deleteStaff(id);
        setStaffs(staffs.filter(staff => staff.id !== id)); // Remove deleted staff from the list
      } catch (err) {
        console.error("Failed to delete staff:", err)
        setError(err.message)
      }
    }
  }

  // handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault()
    fetchStaffs(searchRef.current.value)
  }

  return (
    <>
      <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Staff name, department etc" aria-label="Search" ref={searchRef}/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <h2 className="text-center mt-5 mb-3">Staff's Records</h2>
      { error && <div className="alert alert-danger" role="alert">
          { error }
      </div> }
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary" to="add">Create New Staff </Link>
          {/* <button onClick={() => Logout()} className="btn btn-outline-danger float-end"> Logout </button> */}
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role Name</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Contact Number</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
            { staffs.map( (staff, index) => (  
              <tr key={index}>
                <td>{staff.name}</td>
                <td>{staff.role.name}</td>
                <td>{staff.department}</td>
                <td>{staff.jobTitle}</td>
                <td>{staff.contact}</td>
                <td>
                  <Link to={`/staffs/edit/${staff.id}`}
                    className="btn btn-outline-success mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmed(staff.id)}
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