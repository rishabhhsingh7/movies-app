import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./screens/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./screens/details/Details";
import Header from "./common/header/Header";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route
          exact
          path="/details/:moviename"
          element={<Details></Details>}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
