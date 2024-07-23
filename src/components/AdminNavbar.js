import React from 'react'
import {Link,useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate();
  const handlelogout = ()=>{
localStorage.removeItem("authToken");
navigate("/login");
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 fst-italic "to="/">GoFood</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to="/">Admin</Link>
          </li>
          {(localStorage.getItem("authToken"))?
           <li className="nav-item">
           <Link className="nav-link active fs-5" aria-current="page" to="/adminOrder">orders</Link>
         </li>
       :"" }
         </ul>
         <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>Logout</div>
          
      </div>
    </div>
  </nav>
  </div>
)
}