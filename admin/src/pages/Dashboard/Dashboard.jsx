import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

const salesData = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 5800 },
  { day: "Wed", sales: 4900 },
  { day: "Thu", sales: 7200 },
  { day: "Fri", sales: 8600 },
  { day: "Sat", sales: 9400 },
  { day: "Sun", sales: 7800 },
];

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section className="dashboard-stats">

        <div className="stat-card">
          <span className="stat-label">Total Sales</span>
          <h2>₹48,250</h2>
          <span className="stat-growth">↑ 12.5%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <h2>1,284</h2>
          <span className="stat-growth">↑ 8.2%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Customers</span>
          <h2>856</h2>
          <span className="stat-growth">↑ 5.4%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Products</span>
          <h2>66</h2>
          <span className="stat-warning">3 low stock</span>
        </div>

      </section>

      {/* Sales Overview */}
      <section className="dashboard-section sales-section">

        <div className="section-header">
          <div>
            <h2>Sales Overview</h2>
            <p>Track your sales performance</p>
          </div>

          <select className="dashboard-select" defaultValue="month">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div className="sales-chart">
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={salesData}
      margin={{
        top: 10,
        right: 20,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="day"
        tick={{ fontSize: 12 }}
      />

      <YAxis
        tick={{ fontSize: 12 }}
      />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="sales"
        stroke="#E63946"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

      </section>

      {/* Bottom Section */}
      <section className="dashboard-bottom">

        {/* Recent Orders */}
        <div className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest orders from your customers</p>
            </div>

            <button className="text-button">
              View All
            </button>
          </div>

          <div className="orders-list">

            <div className="order-row">
              <div>
                <strong>#FF1024</strong>
                <span>Arun Kumar</span>
              </div>

              <strong>₹540</strong>

              <span className="status-badge status-success">
                Delivered
              </span>
            </div>

            <div className="order-row">
              <div>
                <strong>#FF1025</strong>
                <span>Priya</span>
              </div>

              <strong>₹320</strong>

              <span className="status-badge status-warning">
                Preparing
              </span>
            </div>

            <div className="order-row">
              <div>
                <strong>#FF1026</strong>
                <span>Rahul</span>
              </div>

              <strong>₹890</strong>

              <span className="status-badge status-warning">
                Pending
              </span>
            </div>

          </div>

        </div>

        {/* Top Products */}
        <div className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Top Products</h2>
              <p>Best-selling food items</p>
            </div>

            <button className="text-button">
              View All
            </button>
          </div>

          <div className="products-list">

            <div className="product-row">
              <div className="product-rank">01</div>

              <div className="product-info">
                <strong>Chicken Biryani</strong>
                <span>Biryani</span>
              </div>

              <strong>142 sold</strong>
            </div>

            <div className="product-row">
              <div className="product-rank">02</div>

              <div className="product-info">
                <strong>Margherita Pizza</strong>
                <span>Italian</span>
              </div>

              <strong>98 sold</strong>
            </div>

            <div className="product-row">
              <div className="product-rank">03</div>

              <div className="product-info">
                <strong>Chicken Burger</strong>
                <span>Fast Food</span>
              </div>

              <strong>87 sold</strong>
            </div>

            <div className="product-row">
              <div className="product-rank">04</div>

              <div className="product-info">
                <strong>Mango Shake</strong>
                <span>Drinks</span>
              </div>

              <strong>75 sold</strong>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;