import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function AddItem() {
  const location = useLocation();
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();
  const [item, setItem] = useState({
    categoryName: "",
    img: "",
    name: "",
    description: "",
    fullPlateCost: "",
    halfPlateCost: ""
  });

  useEffect(() => {
    const email = location.state?.adminEmail || localStorage.getItem("userEmail");
    if (email) {
      setAdminEmail(email);
    } else {
      alert("Admin email not found. Please log in.");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate admin email
    if (!adminEmail) {
      alert("Admin email not found. Please log in.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/AddFoodItem", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryName: item.categoryName,
        name: item.name,
        img: item.img,
        description: item.description,
        fullPlateCost: item.fullPlateCost,
        halfPlateCost: item.halfPlateCost,
        adminEmail: adminEmail
      })
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      if (json.success) {
        alert("Food item added successfully");
        setItem({
          categoryName: "",
          img: "",
          name: "",
          description: "",
          fullPlateCost: "",
          halfPlateCost: ""
        });
      } else {
        alert("Invalid email. Please log in.");
      }
    } else {
     navigate('/');
    }
  };

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input type="text" className="form-control" name='categoryName' value={item.categoryName} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={item.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image URL</label>
          <input type="text" className="form-control" name='img' value={item.img} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" name='description' value={item.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="fullPlateCost" className="form-label">Full Plate Cost</label>
          <input type="number" className="form-control" name='fullPlateCost' value={item.fullPlateCost} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="halfPlateCost" className="form-label">Half Plate Cost</label>
          <input type="number" className="form-control" name='halfPlateCost' value={item.halfPlateCost} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
