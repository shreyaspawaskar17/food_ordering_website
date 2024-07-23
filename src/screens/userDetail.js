import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentOption: "cash"
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        // If checkout successful, navigate to the desired page
        navigate('/');
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">User Detail</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" name='phone' value={credentials.phone} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label">Street</label>
                  <input type="text" className="form-control" name='street' value={credentials.street} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" className="form-control" name='city' value={credentials.city} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <input type="text" className="form-control" name='state' value={credentials.state} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">Pincode</label>
                  <input type="text" className="form-control" name='pincode' value={credentials.pincode} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentOption" className="form-label">Payment Option</label>
                  <select className="form-select" name='paymentOption' value={credentials.paymentOption} onChange={onChange}>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}