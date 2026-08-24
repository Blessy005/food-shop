import "./Products.css";

const products = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 180,
    stock: 25,
    status: "Active",
    image: "🍛",
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    stock: 18,
    status: "Active",
    image: "🥞",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Italian",
    price: 250,
    stock: 8,
    status: "Active",
    image: "🍕",
  },
  {
    id: 4,
    name: "Chicken Noodles",
    category: "Asian",
    price: 160,
    stock: 14,
    status: "Active",
    image: "🍜",
  },
  {
    id: 5,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
    stock: 0,
    status: "Inactive",
    image: "🍮",
  },
];

const categories = [
  "All Categories",
  "South Indian",
  "North Indian",
  "Indian Street Food",
  "Biryani",
  "Asian",
  "Italian",
  "Continental",
  "Desserts",
  "Drinks",
];

function Products() {
  return (
    <div className="products-page">

      {/* Page Header */}
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your food items and availability.</p>
        </div>

        <button className="add-product-button">
          + Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="products-toolbar">

        <div className="product-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        <div className="product-filters">

          <select defaultValue="all">
            <option value="all">All Categories</option>

            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select defaultValue="all">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select defaultValue="newest">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock-low">Stock: Low to High</option>
          </select>

        </div>

      </div>

      {/* Product Table */}
      <div className="products-table-card">

        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>
                    <div className="product-image">
                      {product.image}
                    </div>
                  </td>

                  <td>
                    <div className="product-name">
                      {product.name}
                    </div>
                  </td>

                  <td>
                    <span className="product-category">
                      {product.category}
                    </span>
                  </td>

                  <td>
                    <strong>₹{product.price}</strong>
                  </td>

                  <td>
                    <span
                      className={
                        product.stock === 0
                          ? "stock stock-out"
                          : product.stock <= 10
                          ? "stock stock-low"
                          : "stock"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`product-status ${
                        product.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="product-action-button"
                      aria-label={`Actions for ${product.name}`}
                    >
                      ⋮
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

export default Products;