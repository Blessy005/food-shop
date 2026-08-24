import { Routes, Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout/AdminLayout";

/* Login */
import Login from "../pages/Login/Login";

/* Dashboard */
import Dashboard from "../pages/Dashboard/Dashboard";

/* Products */
import Products from "../pages/Products/Products";
import ProductForm from "../pages/ProductForm/ProductForm";

/* Orders */
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";

/* Customers */
import Customers from "../pages/Customers/Customers";
import CustomerDetails from "../pages/CustomerDetails/CustomerDetails";

/* Settings */
import Settings from "../pages/Settings/Settings";

function AdminRoutes() {
  return (
    <Routes>

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Panel */}
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
        <Route path="customers/:id" element={<CustomerDetails />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default AdminRoutes;