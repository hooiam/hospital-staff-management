import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import login from '../services/auth'

// TODO: Refactor needed
export default function Login() {  
  const [password, setPassword] = useState('55')
  const [error, setError] = useState('')
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/staffs')
    }
  }, [navigate])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await login({password})
      localStorage.setItem('token', response.data)
      navigate("/staffs")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
            { error && <div className="alert alert-danger" role="alert">
              { error }
            </div> }
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={ (e) => setPassword(e.target.value) }
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-login text-uppercase fw-bold" >
                  Sign in
                </button>
              </div>
              <hr className="my-4"></hr>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
