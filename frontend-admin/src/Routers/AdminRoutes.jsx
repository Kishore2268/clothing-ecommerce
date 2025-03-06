import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminPannel from "../AdminPannel";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Login from "../componets/Auth/Login";
import Register from "../componets/Auth/Register";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <AdminPannel />
          </PrivateRoute>
        }></Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;