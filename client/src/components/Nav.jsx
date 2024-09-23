import { Link } from "react-router-dom";

export default function Nav({handler}) { 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/staffs">Staffs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roles">Roles</Link>
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-outline-success" type="button" onClick={handler}>Logout</button>
    </nav>
  )
}