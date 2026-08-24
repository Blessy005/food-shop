import { useNavigate } from "react-router-dom";
import "./Orders.css";


const orders = [
  {
    id: "FF1024",
    customer: "Arun Kumar",
    date: "Aug 24, 2026",
    items: 3,
    total: 540,
    payment: "Paid",
    status: "Preparing",
  },
  {
    id: "FF1025",
    customer: "Priya",
    date: "Aug 24, 2026",
    items: 2,
    total: 320,
    payment: "Paid",
    status: "Pending",
  },
  {
    id: "FF1026",
    customer: "Rahul",
    date: "Aug 23, 2026",
    items: 4,
    total: 760,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "FF1027",
    customer: "Meena",
    date: "Aug 23, 2026",
    items: 2,
    total: 410,
    payment: "Pending",
    status: "Confirmed",
  },
  {
    id: "FF1028",
    customer: "Vikram",
    date: "Aug 22, 2026",
    items: 5,
    total: 920,
    payment: "Paid",
    status: "Out for Delivery",
  },
];

const statusOptions = [
  "All Status",
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function Orders() {
  const navigate = useNavigate();

  return (
    <div className="orders-page">

      {/* Page Header */}
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Track and manage customer orders.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="orders-stats">

        <div className="order-stat-card">
          <div className="order-stat-indicator all"></div>

          <div>
            <span>All Orders</span>
            <h2>1,284</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator pending"></div>

          <div>
            <span>Pending</span>
            <h2>24</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator preparing"></div>

          <div>
            <span>Preparing</span>
            <h2>18</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator delivered"></div>

          <div>
            <span>Delivered</span>
            <h2>1,200</h2>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="orders-toolbar">

        <div className="order-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search order/customer..."
          />
        </div>

        <div className="order-filters">

          <select defaultValue="all">
            <option value="all">All Status</option>

            {statusOptions.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select defaultValue="all">
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <select defaultValue="all">
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

        </div>

      </div>

      {/* Orders Table */}
      <div className="orders-table-card">

        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr key={order.id}>

                  <td>
                    <strong className="order-id">
                      #{order.id}
                    </strong>
                  </td>

                  <td>
                    <span className="customer-name">
                      {order.customer}
                    </span>
                  </td>

                  <td>
                    <span className="order-date">
                      {order.date}
                    </span>
                  </td>

                  <td>
                    <span className="order-items">
                      {order.items}
                    </span>
                  </td>

                  <td>
                    <strong className="order-total">
                      ₹{order.total}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`payment-status ${
                        order.payment === "Paid"
                          ? "payment-paid"
                          : "payment-pending"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`order-status status-${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
  className="view-order-button"
  onClick={() => navigate(`/admin/orders/${order.id}`)}
>
  View
</button>
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

export default Orders;