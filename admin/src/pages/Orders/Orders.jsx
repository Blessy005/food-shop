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

  // Store orders fetched from the backend
  const [orders, setOrders] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // FETCH ORDERS FROM BACKEND

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // DATE FILTER HELPER

  const matchesDateFilter = (order) => {
    if (dateFilter === "all") {
      return true;
    }

    const orderDate = new Date(order.createdAt);
    const today = new Date();

    // Reset time for date comparison
    today.setHours(0, 0, 0, 0);
    orderDate.setHours(0, 0, 0, 0);

    const differenceInDays =
      (today - orderDate) / (1000 * 60 * 60 * 24);

    if (dateFilter === "today") {
      return differenceInDays === 0;
    }

    if (dateFilter === "yesterday") {
      return differenceInDays === 1;
    }

    if (dateFilter === "week") {
      return differenceInDays >= 0 && differenceInDays < 7;
    }

    if (dateFilter === "month") {
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  };

  // FILTER ORDERS

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const orderNumber = order.orderNumber?.toLowerCase() || "";
    const customerName =
      order.customer?.name?.toLowerCase() || "";
    const customerEmail =
      order.customer?.email?.toLowerCase() || "";

    const matchesSearch =
      orderNumber.includes(search) ||
      customerName.includes(search) ||
      customerEmail.includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "all" ||
      order.paymentStatus?.toLowerCase() ===
        paymentFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPayment &&
      matchesDateFilter(order)
    );
  });

  // ORDER STATISTICS

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // LOADING STATE

  if (loading) {
    return <p>Loading orders...</p>;
  }

  // ERROR STATE

  if (error) {
    return <p>{error}</p>;
  }

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
            <h2>{totalOrders}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator pending"></div>
          <div>
            <span>Pending</span>
            <h2>{pendingOrders}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator preparing"></div>
          <div>
            <span>Preparing</span>
            <h2>{preparingOrders}</h2>
          </div>
        </div>

        <div className="order-stat-card">
          <div className="order-stat-indicator delivered"></div>
          <div>
            <span>Delivered</span>
            <h2>{deliveredOrders}</h2>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="orders-toolbar">

        {/* Search */}
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

        {/* Filters */}
        <div className="order-filters">

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">All Status</option>

            {statusOptions.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
          >
            <option value="all">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
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

              {filteredOrders.length > 0 ? (

                filteredOrders.map((order) => (

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
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Items */}
                    <td>
                      <span className="order-items">
                        {order.items?.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </span>
                    </td>

                    {/* Total */}
                    <td>
                      <strong className="order-total">
                        ₹
                        {order.total?.toLocaleString(
                          "en-IN"
                        )}
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

                ))

              ) : (

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

              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Orders;