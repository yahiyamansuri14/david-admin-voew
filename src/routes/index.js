import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import Dashboard from "../components/dashboard";
import Email from "../components/email";
import Landing from "../components/landing";
import AddProduct from "../components/product/AddProduct";
import ViewProduct from "../components/product/ViewProduct";
import { useSelector } from "react-redux";
import Subscriber from "../components/subscriber";
import UpdateProduct from "../components/product/UpdateProduct";
import FileUpload from "../components/test";


export default function AppRoutes() {

  const { token } = useSelector((state) => state.auth)

  if (!Boolean(token)) {
    return (
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Suspense>
    );
  } else {
    return (
      <Landing>
        <Suspense
          fallback={
            <div>
              <h1 style={{'margin-left': '300px'}}>fallback</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<ViewProduct />}></Route>
            <Route path="/subscriber" element={<Subscriber /> }></Route>
            <Route path="/product/add-product" element={<AddProduct />}></Route>
            <Route path="/product/all" element={<ViewProduct /> }></Route>
            <Route path="/sendmail" element={<Email /> }></Route>
            <Route path="/product/update/:id" element={<UpdateProduct /> }></Route>
          </Routes>
        </Suspense>
      </Landing>
    );
  }
}
