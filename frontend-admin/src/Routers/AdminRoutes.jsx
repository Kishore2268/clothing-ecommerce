import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminPannel from "../AdminPannel";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Login from "../componets/Auth/Login";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <AdminPannel />
          </PrivateRoute>
        }></Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;