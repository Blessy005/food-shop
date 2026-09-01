import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import DeliveryLayout from "./components/DeliveryLayout/DeliveryLayout";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Deliveries from "./pages/Deliveries/Deliveries";
import DeliveryDetails from "./pages/DeliveryDetails/DeliveryDetails";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Delivery Partner Login */}
        <Route path="/login" element={<Login />} />

        {/* Delivery Partner Portal */}
        <Route element={<DeliveryLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route
            path="/deliveries/:id"
            element={<DeliveryDetails />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Default Route */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;