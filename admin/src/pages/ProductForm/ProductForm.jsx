import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

function ProductForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    isAvailable: true,
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: e.target.value === "available",
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    // Create preview
    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Create FormData
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", Number(formData.price));
      data.append("stock", Number(formData.stock));
      data.append("isAvailable", formData.isAvailable);
      data.append("description", formData.description);

      // Add image
      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      await response.json();

      alert("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <div className="product-form-page">

      {/* Header */}
      <div className="product-form-header">
        <div>
          <h1>Add New Product</h1>
          <p>
            Add a new food item to your Flavor Feast menu.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        {/* Product Image */}
        <section className="form-section">
          <h2>Product Image</h2>

          <div className="image-upload">

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product preview"
                className="image-preview"
              />
            ) : (
              <div className="upload-icon">
                📷
              </div>
            )}

            <strong>
              {image
                ? image.name
                : "Upload Product Image"}
            </strong>

            <span>
              PNG, JPG or JPEG
            </span>

            <label className="upload-button">
              Choose Image

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                hidden
              />
            </label>

          </div>
        </section>

        {/* Basic Information */}
        <section className="form-section">

          <h2>Basic Information</h2>

          <div className="form-grid">

            {/* Product Name */}
            <div className="form-group full-width">

              <label htmlFor="name">
                Product Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Category */}
            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select category
                </option>

                <option value="South Indian">
                  South Indian
                </option>

                <option value="North Indian">
                  North Indian
                </option>

                <option value="Indian Street Food">
                  Indian Street Food
                </option>

                <option value="Biryani">
                  Biryani
                </option>

                <option value="Asian">
                  Asian
                </option>

                <option value="Italian">
                  Italian
                </option>

                <option value="Continental">
                  Continental
                </option>

                <option value="Fast Food">
                  Fast Food
                </option>

                <option value="Desserts">
                  Desserts
                </option>

                <option value="Drinks">
                  Drinks
                </option>
              </select>

            </div>

            {/* Price */}
            <div className="form-group">

              <label htmlFor="price">
                Price
              </label>

              <div className="price-input">

                <span>₹</span>

                <input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Stock */}
            <div className="form-group">

              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />

            </div>

            {/* Availability */}
            <div className="form-group">

              <label htmlFor="availability">
                Availability
              </label>

              <select
                id="availability"
                value={
                  formData.isAvailable
                    ? "available"
                    : "unavailable"
                }
                onChange={handleAvailabilityChange}
              >

                <option value="available">
                  Available
                </option>

                <option value="unavailable">
                  Unavailable
                </option>

              </select>

            </div>

            {/* Description */}
            <div className="form-group full-width">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                rows="5"
                placeholder="Describe your food item..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>

        </section>

        {/* Actions */}
        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-product-button"
            disabled={saving}
          >
            {saving
              ? "Adding..."
              : "Add Product"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default ProductForm;