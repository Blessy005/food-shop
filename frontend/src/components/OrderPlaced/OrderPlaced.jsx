import "./OrderPlaced.css";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <section className="order-placed">
      <div className="order-success">

        <div className="success-icon">
          ✓
        </div>

        <h2>Order Placed!</h2>

        <p>
          Your order has been placed successfully.
        </p>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>
    </section>
  );
}

export default OrderPlaced;