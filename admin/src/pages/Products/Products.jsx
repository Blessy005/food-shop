import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

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
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your food items and availability.</p>
        </div>

        <button
          className="add-product-button"
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="products-toolbar">
        <div className="product-search">
          <span>⌕</span>

          <input type="text" placeholder="Search products..." />
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
                <tr key={product._id}>
                  {/* Image */}
                  <td>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </td>

                  {/* Product Name */}
                  <td>
                    <div className="product-name">{product.name}</div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="product-category">{product.category}</span>
                  </td>

                  {/* Price */}
                  <td>
                    <strong>₹{product.price}</strong>
                  </td>

                  {/* Stock */}
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

                  {/* Status */}
                  <td>
                    <span
                      className={`product-status ${
                        product.isAvailable
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {product.isAvailable ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Action */}
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
