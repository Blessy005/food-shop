import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ==========================================
  // FETCH CUSTOMERS
  // ==========================================

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await response.json();

        // Only customers, not admins
        const customerUsers = data.filter(
          (user) => user.role === "customer"
        );

        setCustomers(customerUsers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ==========================================
  // SEARCH CUSTOMERS
  // ==========================================

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search)
    );
  });

  // ==========================================
  // CUSTOMER STATISTICS
  // ==========================================

  const totalCustomers = customers.length;

  const newCustomers = customers.filter((customer) => {
    if (!customer.createdAt) return false;

    const joinedDate = new Date(customer.createdAt);
    const currentDate = new Date();

    const difference = currentDate - joinedDate;
    const days = difference / (1000 * 60 * 60 * 24);

    return days <= 30;
  }).length;

  const activeCustomers = customers.length;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <p>Loading customers...</p>;
  }

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
            <h2>{totalCustomers}</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon new">
            +
          </div>

          <div>
            <span>New Customers</span>
            <h2>{newCustomers}</h2>
          </div>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-icon active">
            ✓
          </div>

          <div>
            <span>Active Customers</span>
            <h2>{activeCustomers}</h2>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      {/* Customer Table */}
      <div className="customers-table-card">

        <div className="customers-table-wrapper">

          <table className="customers-table">

            {/* Fixed column structure */}
            <colgroup>
              <col className="col-customer" />
              <col className="col-email" />
              <col className="col-orders" />
              <col className="col-spent" />
              <col className="col-joined" />
              <col className="col-status" />
              <col className="col-action" />
            </colgroup>

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

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr key={customer._id}>

                    {/* Customer */}
                    <td>
                      <div className="customer-table-info">

                        <div className="customer-table-avatar">
                          {customer.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {customer.name}
                          </strong>

                          <span>
                            {customer._id}
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
                        0 orders
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td>
                      <strong className="customer-spent">
                        ₹0
                      </strong>
                    </td>

                    {/* Joined */}
                    <td>
                      <span className="customer-joined">
                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className="customer-status customer-active">
                        Active
                      </span>
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        type="button"
                        className="view-customer-button"
                        onClick={() =>
                          navigate(
                            `/admin/customers/${customer._id}`
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
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No customers found.
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

export default Customers;