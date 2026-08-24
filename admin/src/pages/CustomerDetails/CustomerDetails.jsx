import "./CustomerDetails.css";

const customer = {
  id: "CUS001",
  name: "Arun Kumar",
  email: "arun@gmail.com",
  phone: "9876543210",

  totalOrders: 12,
  totalSpent: 4250,

  orders: [
    {
      id: "FF1024",
      date: "Aug 24, 2026",
      amount: 540,
      status: "Delivered",
    },
    {
      id: "FF0988",
      date: "Aug 20, 2026",
      amount: 320,
      status: "Delivered",
    },
    {
      id: "FF0921",
      date: "Aug 15, 2026",
      amount: 450,
      status: "Delivered",
    },
    {
      id: "FF0875",
      date: "Aug 10, 2026",
      amount: 680,
      status: "Delivered",
    },
  ],
};

function CustomerDetails() {
  return (
    <div className="customer-details-page">

      {/* Page Header */}
      <div className="customer-details-header">
        <div>
          <p className="customer-details-back">
            Customers / Customer Details
          </p>

          <h1>{customer.name}</h1>

          <p>Customer ID: {customer.id}</p>
        </div>

        <span className="customer-details-status">
          Active
        </span>
      </div>

      {/* Customer Information */}
      <div className="customer-details-card">

        <div className="customer-card-header">
          <h2>Customer Information</h2>
        </div>

        <div className="customer-profile">

          <div className="customer-profile-avatar">
            {customer.name.charAt(0)}
          </div>

          <div className="customer-profile-info">
            <h3>{customer.name}</h3>

            <p>{customer.email}</p>

            <p>{customer.phone}</p>
          </div>

        </div>

      </div>

      {/* Customer Statistics */}
      <div className="customer-detail-stats">

        <div className="customer-detail-stat-card">

          <div className="customer-detail-stat-icon orders">
            🛍
          </div>

          <div>
            <span>Total Orders</span>
            <h2>{customer.totalOrders}</h2>
          </div>

        </div>

        <div className="customer-detail-stat-card">

          <div className="customer-detail-stat-icon spent">
            ₹
          </div>

          <div>
            <span>Total Spent</span>
            <h2>
              ₹{customer.totalSpent.toLocaleString("en-IN")}
            </h2>
          </div>

        </div>

      </div>

      {/* Order History */}
      <div className="customer-details-card">

        <div className="customer-card-header">
          <div>
            <h2>Order History</h2>
            <p>Recent orders placed by this customer.</p>
          </div>

          <span>
            {customer.orders.length} recent orders
          </span>
        </div>

        <div className="customer-order-table-wrapper">

          <table className="customer-order-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {customer.orders.map((order) => (
                <tr key={order.id}>

                  <td>
                    <strong className="customer-order-id">
                      #{order.id}
                    </strong>
                  </td>

                  <td>
                    <span className="customer-order-date">
                      {order.date}
                    </span>
                  </td>

                  <td>
                    <strong className="customer-order-amount">
                      ₹{order.amount}
                    </strong>
                  </td>

                  <td>
                    <span className="customer-order-status">
                      {order.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetails;