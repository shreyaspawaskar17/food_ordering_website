import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';



export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log(email);

        const response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched order data: ", data); // Debugging log
            setOrderData(data);
        } else {
            console.error("Failed to fetch order data");
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData ? orderData.orderData.order_data.slice(0).reverse().map((order, orderIndex) => (
                        order.map((item, itemIndex) => (
                            <div key={`${orderIndex}-${itemIndex}`}>
                                {item.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        <div>{item.Order_date}</div>
                                        <hr />
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <span className='m-1'>{orderData.date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )) : "No orders found"}
                </div>
            </div>
            <Footer />
        </div>
    )
}
