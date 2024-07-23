import React from 'react';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js';
import { CartProvider } from './components/ContextReducer.js';
import AddItem from './screens/AddItem.js';
import AdminOrder from './screens/AdminOrder.js';
import UserDetail from './screens/userDetail.js';
import Cart from './screens/Cart.js';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<MyOrder/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route path="/additem" element={<AddItem />} />
          <Route path="/adminOrder" element={<AdminOrder />} />
          <Route path="/userDetail" element={<UserDetail/>} />
        </Routes>
      </div>
    </Router>
  </CartProvider>
  );
}

export default App;
