import { Routes, Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout/AdminLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import Products from "../pages/Products/Products";
import ProductForm from "../pages/ProductForm/ProductForm";

import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";

function Customers() {
  return <h1>Customers</h1>;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>

        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />

        {/* Customers */}
        <Route path="customers" element={<Customers />} />

      </Route>
    </Routes>
  );
}

export default AdminRoutes;