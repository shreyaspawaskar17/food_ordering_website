import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';

export default function AllOrders() {
    const [allOrderData, setAllOrderData] = useState([]);

    const fetchAllOrders = async () => {
        const response = await fetch("http://localhost:5000/api/allOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched all orders data: ", data); // Debugging log
            setAllOrderData(data.orderData);
        } else {
            console.error("Failed to fetch all orders data");
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className='container'>
                <div className='row'>
                    {allOrderData.length > 0 ? (
                        allOrderData.map((order, orderIndex) => (
                            <div key={orderIndex}>
                                <div className='m-auto mt-5'>
                                    <h3>{order.email}</h3>
                                    <hr />
                                </div>
                                {order.order_data.slice(0).reverse().map((orderItem, orderItemIndex) => (
                                    orderItem.map((item, itemIndex) => (
                                        <div key={`${orderIndex}-${orderItemIndex}-${itemIndex}`} className='col-12 col-md-6 col-lg-3'>
                                            {item.Order_date ? (
                                                <div className='m-auto mt-5'>
                                                    <div>{item.Order_date}</div>
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <span className='m-1'>{orderItem.date}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ))}
                            </div>
                        ))
                    ) : "No orders found"}
                </div>
            </div>
            <Footer />
        </div>
    )
}
