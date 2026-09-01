import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sort
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [location]);

  // FILTER + SORT PRODUCTS

  const filteredProducts = products
    .filter((product) => {
      // Search filter
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Status filter
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && product.isAvailable === true) ||
        (selectedStatus === "inactive" && product.isAvailable === false);

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "stock-low":
          return a.stock - b.stock;

        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

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
        {/* Search */}
        <div className="product-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="product-filters">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>

            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>

            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>

          {/* Sort - we'll implement next */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const imageUrl = product.image
                    ? product.image.startsWith("/uploads")
                      ? `${import.meta.env.VITE_SERVER_URL}${product.image}`
                      : product.image
                    : "";

                  return (
                    <tr key={product._id}>
                      {/* Image */}
                      <td>
                        <div className="product-image">
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.name} />
                          ) : (
                            <span>No Image</span>
                          )}
                        </div>
                      </td>

                      {/* Product */}
                      <td>
                        <div className="product-name">{product.name}</div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="product-category">
                          {product.category}
                        </span>
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

                      {/* Actions */}
                      <td>
                        <div className="product-actions">
                          {/* Edit */}
                          <button
                            className="product-edit-button"
                            onClick={() =>
                              navigate(`/admin/products/${product._id}/edit`)
                            }
                          >
                            Edit
                          </button>

                          {/* Delete */}
                          <button
                            className="product-delete-button"
                            onClick={async () => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete ${product.name}?`,
                              );

                              if (!confirmed) return;

                              try {
                                const token =
                                  localStorage.getItem("adminToken");

                                const response = await fetch(
                                  `${import.meta.env.VITE_API_URL}/products/${product._id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  },
                                );

                                if (!response.ok) {
                                  throw new Error("Failed to delete product");
                                }

                                setProducts((prevProducts) =>
                                  prevProducts.filter(
                                    (item) => item._id !== product._id,
                                  ),
                                );

                                alert("Product deleted successfully!");
                              } catch (error) {
                                console.error("Delete Product Error:", error);

                                alert("Failed to delete product.");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No products found.
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

export default Products;
