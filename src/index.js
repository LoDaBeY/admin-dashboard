import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import ErrorPage from "./Pages/ErrorPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Customers from "./Pages/Customers";
import Invoices from "./Pages/Invoices";
import Projects from "./Pages/Projects";
import BarChart from "./Pages/BarChart";
import GeographyChart from "./Pages/GeographyChart";
import "./index.css";
import OnePageProduct from "./Pages/OnePageProduct";
import Calender from "./Pages/Calender";
import LineBar from "./Pages/LineBar";
import PieChart from "Pages/PieChart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="Login" element={<Login />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="customers" element={<Customers />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="Calender" element={<Calender />} />
      <Route path="Projects" element={<Projects />} />
      <Route path="LineBar" element={<LineBar />} />
      <Route path="BarChart" element={<BarChart />} />
      <Route path="Pie" element={<PieChart />} />
      <Route path="GeographyChart" element={<GeographyChart />} />
      <Route path="Projects/:userId" element={<OnePageProduct />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
