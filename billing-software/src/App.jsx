import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import ViewCustomers from "./components/ViewCustomers";
import AddProduct from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";
import AddBilling from "./components/AddBilling";
import ViewBilling from "./components/ViewBilling";
import Navbar from "./components/Navbar"; // Assuming you have a Navbar component for navigation
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navigation bar with links to the sections */}
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/view-customers" element={<ViewCustomers />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-products" element={<ViewProducts />} />
            <Route path="/add-billing" element={<AddBilling />} />
            <Route path="/view-billing" element={<ViewBilling />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
