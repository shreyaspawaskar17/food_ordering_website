import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    backgroundColor: '#fff', // White background
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '80%',
    margin: 'auto',
    marginTop: '3rem',
  },
  table: {
    marginTop: '20px',
  },
  tableHead: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  tableRowHover: {
    backgroundColor: '#f1f1f1',
  },
  textSuccess: {
    color: '#28a745',
  },
  fs2: {
    fontSize: '2rem',
    color: '#000',
    textAlign: 'center',
  },
  fs3: {
    fontSize: '1.75rem',
    color: '#000',
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  btnSuccessHover: {
    backgroundColor: '#218838',
  },
  btnDelete: {
    padding: '5px 10px',
    backgroundColor: '#d9534f',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s',
  },
  btnDeleteHover: {
    backgroundColor: '#c9302c',
  },
  textCenter: {
    textAlign: 'center',
  },
  margin5: {
    margin: '5rem',
  },
  width100: {
    width: '100%',
  },
};

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div style={{ ...styles.margin5, ...styles.width100, ...styles.textCenter, ...styles.fs3 }}>
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    const response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      navigate("/userDetail");
    }
  }

  const totalPrice = data.reduce((total, food) => total + (food.price * food.qty), 0);

  return (
    <div style={styles.container}>
      <div className='table-responsive' style={styles.table}>
        <table className='table table-hover'>
          <thead style={styles.tableHead}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} style={styles.tableRowHover}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price * food.qty}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    style={styles.btnDelete}
                    onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = styles.btnDeleteHover.backgroundColor; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = styles.btnDelete.backgroundColor; }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 style={styles.fs2}>Total Price: {totalPrice}/-</h1>
        </div>
        <div style={styles.textCenter}>
          <button
            className='btn bg-success mt-5'
            style={styles.btnSuccess}
            onClick={handleCheckOut}
            onMouseEnter={(e) => { e.target.style.backgroundColor = styles.btnSuccessHover.backgroundColor; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = styles.btnSuccess.backgroundColor; }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
