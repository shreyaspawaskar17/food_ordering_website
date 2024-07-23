// Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's email from local storage
        const userEmail = localStorage.getItem("userEmail");

        // Fetch user's role
        const roleResponse = await fetch(`http://localhost:5000/api/userRole?email=${userEmail}`);
        const roleData = await roleResponse.json();
        setRole(roleData.role);

        // Fetch food data
        const foodDataResponse = await fetch("http://localhost:5000/api/foodData", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const foodData = await foodDataResponse.json();
        setFoodItem(foodData[0] || []);
        setFoodCat(foodData[1] || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddItemClick = () => {
    // Navigate to additem page with admin email state
    navigate('/additem', { state: { adminEmail: localStorage.getItem("userEmail") } });
  };

  return (
    <>
      {role !== 'admin' ? (
        <Navbar />
      ) : (
        <AdminNavbar />
      )}

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
      <div className="carousel-inner" id='carousel'>
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                    <div className="d-flex justify-content-center">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        
                    </div>
                </div>
                <div className="carousel-item active">
                    <img src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
                <div className="carousel-item">
                    <img src="" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/300x300/?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)", objectFit: "cover", height: "100vh" }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
      </div>

      <div className='container'>
      

        {/* ADD button */}
        {role === "admin" && (
          <button
            className='btn btn-danger mx-2'
            onClick={handleAddItemClick}
          >
            ADD
          </button>
        )}

        {/* Food categories and items */}
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data.id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              <div className='row mb-3'>
                {foodItem.length > 0 ? (
                  foodItem.filter(item => (item.CategoryName === data.CategoryName) && (search?.toLowerCase() ? item.name.toLowerCase().includes(search.toLowerCase()) : true))
                    .map(filterItems => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                      </div>
                    ))
                ) : (
                  <div>No data found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>

      <Footer />
    </>
  );
}
