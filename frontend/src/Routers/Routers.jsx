// import { Navigation } from "mdi-material-ui";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TearmsCondition from "../Pages/TearmsCondition";
import Contact from "../Pages/Contact";
import Product from "../customer/Components/Product/Product/Product";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Cart from "../customer/Components/Product/Cart/Cart";
import DemoAdmin from "../Admin/Views/DemoAdmin";
import AdminPannel from "../Admin/AdminPannel";
import Navigation from "../customer/Components/Navbar/Navigation";
import Login from "../customer/Components/Auth/Login";
import Register from "../customer/Components/Auth/Register";
import PrivateRoute from "../components/Auth/PrivateRoute";
import { checkAuthStatus } from "../Redux/Auth/Action";

const Routers = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privaciy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-condition" element={<TearmsCondition />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Customer Routes */}
          <Route path="/men" element={
            <PrivateRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Product />
            </PrivateRoute>
          } />
          <Route path="/product/:productId" element={
            <PrivateRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <ProductDetails />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute allowedRoles={["CUSTOMER", "ADMIN"]}>
              <Cart />
            </PrivateRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/*" element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminPannel />
            </PrivateRoute>
          } />
          <Route path="/demo" element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <DemoAdmin />
            </PrivateRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Routers;
