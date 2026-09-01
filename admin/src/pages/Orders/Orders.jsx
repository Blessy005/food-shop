import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

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

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders from MongoDB
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders."
          );
        }

        setOrders(data);
      } catch (err) {
        console.error("Fetch Orders Error:", err);
        setError(
          "Unable to load orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const customerName = order.customer?.name || "";
    const customerEmail = order.customer?.email || "";

    const matchesSearch =
      !searchTerm ||
      order.orderNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customerEmail
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "all" ||
      order.paymentStatus?.toLowerCase() === paymentFilter;

    const orderDate = new Date(order.createdAt);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(
      startOfYesterday.getDate() - 1
    );

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(
      startOfWeek.getDate() - startOfWeek.getDay()
    );

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    let matchesDate = true;

    if (dateFilter === "today") {
      matchesDate = orderDate >= startOfToday;
    }

    if (dateFilter === "yesterday") {
      matchesDate =
        orderDate >= startOfYesterday &&
        orderDate < startOfToday;
    }

    if (dateFilter === "week") {
      matchesDate = orderDate >= startOfWeek;
    }

    if (dateFilter === "month") {
      matchesDate = orderDate >= startOfMonth;
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPayment &&
      matchesDate
    );
  });

  // Statistics
  const allOrdersCount = orders.length;

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const preparingCount = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Loading
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>Orders</h1>
          <p>Track and manage customer orders.</p>
        </div>

        <div className="orders-table-card">
          <p style={{ padding: "24px" }}>
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>Orders</h1>
          <p>Track and manage customer orders.</p>
        </div>

        <div className="orders-table-card">
          <p style={{ padding: "24px" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      {/* Page Header */}
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Track and manage customer orders.</p>
      </div>

      {/* Statistics */}
      <div className="orders-stats">

        <div className="order-stat-card">
          <div className="order-stat-indicator all"></div>

          <div>
            <span>All Orders</span>
            <h2>{allOrdersCount}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator pending"></div>

          <div>
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator preparing"></div>

          <div>
            <span>Preparing</span>
            <h2>{preparingCount}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator delivered"></div>

          <div>
            <span>Delivered</span>
            <h2>{deliveredCount}</h2>
          </div>
        </div>

      </div>

      {/* Search & Filters */}
      <div className="orders-toolbar">

        <div className="order-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search order/customer..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="order-filters">

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">
              Yesterday
            </option>
            <option value="week">
              This Week
            </option>
            <option value="month">
              This Month
            </option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
          >
            <option value="all">
              All Payments
            </option>
            <option value="paid">Paid</option>
            <option value="pending">
              Pending
            </option>
            <option value="failed">
              Failed
            </option>
          </select>

        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">

        <div className="orders-table-wrapper">

          <table className="orders-table">

            {/* Explicit column widths */}
            <colgroup>
              <col className="col-order-id" />
              <col className="col-customer" />
              <col className="col-date" />
              <col className="col-items" />
              <col className="col-total" />
              <col className="col-payment" />
              <col className="col-status" />
              <col className="col-action" />
            </colgroup>

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

              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {

                  const formattedDate = new Date(
                    order.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  const itemCount =
                    order.items?.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    ) || 0;

                  return (
                    <tr key={order._id}>

                      {/* Order ID */}
                      <td>
                        <strong className="order-id">
                          #{order.orderNumber}
                        </strong>
                      </td>

                      {/* Customer */}
                      <td>
                        <span className="customer-name">
                          {order.customer?.name ||
                            "Unknown Customer"}
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="order-date">
                          {formattedDate}
                        </span>
                      </td>

                      {/* Items */}
                      <td>
                        <span className="order-items">
                          {itemCount}
                        </span>
                      </td>

                      {/* Total */}
                      <td>
                        <strong className="order-total">
                          ₹{order.total}
                        </strong>
                      </td>

                      {/* Payment */}
                      <td>
                        <span
                          className={`payment-status ${
                            order.paymentStatus === "Paid"
                              ? "payment-paid"
                              : "payment-pending"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`order-status status-${order.status
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <button
                          type="button"
                          className="view-order-button"
                          onClick={() =>
                            navigate(
                              `/admin/orders/${order._id}`
                            )
                          }
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Orders;