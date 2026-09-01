import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./DeliveryLayout.css";

function DeliveryLayout() {
  return (
    <div className="delivery-layout">
      <Sidebar />

      <div className="delivery-main">
        <Topbar />

        <main className="delivery-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DeliveryLayout;