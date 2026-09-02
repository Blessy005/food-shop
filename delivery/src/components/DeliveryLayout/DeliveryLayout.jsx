import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./DeliveryLayout.css";

function DeliveryLayout() {
  const [isAvailable, setIsAvailable] = useState(true);

  // =========================================
  // LOAD SAVED AVAILABILITY
  // =========================================

  useEffect(() => {
    const savedUser = localStorage.getItem("deliveryUser");

    if (!savedUser) {
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      setIsAvailable(user.isAvailable ?? true);
    } catch (error) {
      console.error("Load Delivery User Error:", error);
    }
  }, []);

  return (
    <div className="delivery-layout">
      <Sidebar />

      <div className="delivery-main">
        <Topbar
          isAvailable={isAvailable}
          setIsAvailable={setIsAvailable}
        />

        <main className="delivery-content">
          <Outlet
            context={{
              isAvailable,
              setIsAvailable,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default DeliveryLayout;