import "./OrderDetails.css";

function OrderDetails() {
  const order = {
    id: "FF1024",
    customer: {
      name: "Arun Kumar",
      email: "arun@gmail.com",
      phone: "9876543210",
    },
    date: "August 24, 2026",
    status: "Preparing",
    payment: "Paid",

    items: [
      {
        name: "Chicken Biryani",
        quantity: 2,
        price: 180,
      },
      {
        name: "Mango Shake",
        quantity: 1,
        price: 120,
      },
    ],

    subtotal: 480,
    deliveryFee: 40,
    total: 520,
  };

  return (
    <div className="order-details-page">

      {/* Page Header */}
      <div className="order-details-header">
        <div>
          <p className="order-details-back">Orders / Order Details</p>

          <h1>Order #{order.id}</h1>

          <p>
            Placed on {order.date}
          </p>
        </div>

        <span className="order-details-status">
          {order.status}
        </span>
      </div>

      {/* Main Content */}
      <div className="order-details-layout">

        {/* Left Section */}
        <div className="order-details-main">

          {/* Customer */}
          <section className="order-details-card">

            <div className="order-card-header">
              <h2>Customer</h2>
            </div>

            <div className="customer-details">

              <div className="customer-avatar">
                {order.customer.name.charAt(0)}
              </div>

              <div className="customer-info">
                <h3>{order.customer.name}</h3>

                <p>{order.customer.email}</p>

                <p>{order.customer.phone}</p>
              </div>

            </div>

          </section>

          {/* Items */}
          <section className="order-details-card">

            <div className="order-card-header">
              <h2>Items</h2>

              <span>
                {order.items.length} products
              </span>
            </div>

            <div className="order-items-list">

              {order.items.map((item, index) => (
                <div
                  className="order-item"
                  key={index}
                >

                  <div className="order-item-image">
                    🍴
                  </div>

                  <div className="order-item-info">
                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>
              ))}

            </div>

          </section>

        </div>

        {/* Right Section */}
        <div className="order-details-sidebar">

          {/* Payment Summary */}
          <section className="order-details-card">

            <div className="order-card-header">
              <h2>Payment Summary</h2>
            </div>

            <div className="payment-summary">

              <div>
                <span>Subtotal</span>
                <strong>₹{order.subtotal}</strong>
              </div>

              <div>
                <span>Delivery Fee</span>
                <strong>₹{order.deliveryFee}</strong>
              </div>

              <div className="payment-total">
                <span>Total</span>
                <strong>₹{order.total}</strong>
              </div>

            </div>

            <div className="payment-method">
              <span>Payment Status</span>

              <span className="payment-paid">
                {order.payment}
              </span>
            </div>

          </section>

          {/* Order Status */}
          <section className="order-details-card">

            <div className="order-card-header">
              <h2>Order Status</h2>
            </div>

            <div className="status-form">

              <label htmlFor="order-status">
                Current Status
              </label>

              <select
                id="order-status"
                defaultValue={order.status}
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Preparing</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <button
                type="button"
                className="update-status-button"
              >
                Update Status
              </button>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;