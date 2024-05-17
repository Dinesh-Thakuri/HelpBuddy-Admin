import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./admin.route";
import { Fragment } from "react";
import { getUserData } from "@/utils/authStorage";

const PrivateWrapperChecker = ({ children }) => {
  const token = getUserData();
  console.log("====================================");
  console.log(token.token);
  console.log("====================================");
  if (token.token !== null) {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    return <Navigate to="/login" />;
  }
};

const MainWrapper = ({ children, route }) => {
  const Wrapper = route.requiredAuth ? PrivateWrapperChecker : Fragment;
  return <Wrapper>{children}</Wrapper>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <MainWrapper route={route}>
                <route.element />
              </MainWrapper>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
