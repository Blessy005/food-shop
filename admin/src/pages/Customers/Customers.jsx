import { useNavigate } from "react-router-dom";
import "./Customers.css";

const customers = [
  {
    id: "CUS001",
    name: "Arun Kumar",
    email: "arun@gmail.com",
    orders: 12,
    totalSpent: 4250,
    joined: "Aug 12, 2026",
    status: "Active",
  },
  {
    id: "CUS002",
    name: "Priya",
    email: "priya@gmail.com",
    orders: 8,
    totalSpent: 2860,
    joined: "Aug 10, 2026",
    status: "Active",
  },
  {
    id: "CUS003",
    name: "Rahul",
    email: "rahul@gmail.com",
    orders: 15,
    totalSpent: 5320,
    joined: "Aug 5, 2026",
    status: "Active",
  },
  {
    id: "CUS004",
    name: "Meena",
    email: "meena@gmail.com",
    orders: 3,
    totalSpent: 980,
    joined: "Jul 28, 2026",
    status: "Inactive",
  },
  {
    id: "CUS005",
    name: "Vikram",
    email: "vikram@gmail.com",
    orders: 10,
    totalSpent: 3670,
    joined: "Jul 24, 2026",
    status: "Active",
  },
];

function Customers() {
  const navigate = useNavigate();

  return (
    <div className="customers-page">

      {/* Page Header */}
      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>
            View your registered customers and their order history.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="customer-stats">

        <div className="customer-stat-card">
          <div className="customer-stat-icon total">
            👥
          </div>

          <div>
            <span>Total Customers</span>
            <h2>856</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon new">
            +
          </div>

          <div>
            <span>New Customers</span>
            <h2>42</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon active">
            ✓
          </div>

          <div>
            <span>Active Customers</span>
            <h2>712</h2>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="customers-toolbar">

        <div className="customer-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by name or email..."
          />
        </div>

      </div>

      {/* Customer Table */}
      <div className="customers-table-card">

        <div className="customers-table-wrapper">

          <table className="customers-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (
                <tr key={customer.id}>

                  {/* Customer */}
                  <td>
                    <div className="customer-table-info">

                      <div className="customer-table-avatar">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {customer.name}
                        </strong>

                        <span>
                          {customer.id}
                        </span>
                      </div>

                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="customer-email">
                      {customer.email}
                    </span>
                  </td>

                  {/* Orders */}
                  <td>
                    <span className="customer-orders">
                      {customer.orders} orders
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td>
                    <strong className="customer-spent">
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  {/* Joined */}
                  <td>
                    <span className="customer-joined">
                      {customer.joined}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`customer-status ${
                        customer.status === "Active"
                          ? "customer-active"
                          : "customer-inactive"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
                    <button
                      className="view-customer-button"
                      onClick={() =>
                        navigate(`/admin/customers/${customer.id}`)
                      }
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

export default Customers;