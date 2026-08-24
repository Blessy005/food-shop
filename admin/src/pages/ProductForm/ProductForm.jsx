import "./ProductForm.css";

function ProductForm() {
  return (
    <div className="product-form-page">

      {/* Header */}
      <div className="product-form-header">
        <div>
          <h1>Add New Product</h1>
          <p>Add a new food item to your Flavor Feast menu.</p>
        </div>
      </div>

      {/* Form */}
      <form className="product-form">

        {/* Product Image */}
        <section className="form-section">
          <h2>Product Image</h2>

          <div className="image-upload">
            <div className="upload-icon">
              📷
            </div>

            <strong>Upload Product Image</strong>

            <span>
              PNG, JPG or JPEG
            </span>

            <button type="button" className="upload-button">
              Choose Image
            </button>

            <input
              type="file"
              accept="image/png, image/jpeg"
            />
          </div>
        </section>

        {/* Basic Information */}
        <section className="form-section">

          <h2>Basic Information</h2>

          <div className="form-grid">

            {/* Product Name */}
            <div className="form-group full-width">
              <label htmlFor="product-name">
                Product Name
              </label>

              <input
                id="product-name"
                type="text"
                placeholder="Enter product name"
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select id="category" defaultValue="">
                <option value="" disabled>
                  Select category
                </option>

                <option>South Indian</option>
                <option>North Indian</option>
                <option>Indian Street Food</option>
                <option>Biryani</option>
                <option>Asian</option>
                <option>Italian</option>
                <option>Continental</option>
                <option>Desserts</option>
                <option>Drinks</option>
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
              />
            </div>

            {/* Availability */}
            <div className="form-group">
              <label htmlFor="availability">
                Availability
              </label>

              <select id="availability" defaultValue="available">
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
              />
            </div>

          </div>

        </section>

        {/* Actions */}
        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-product-button"
          >
            Add Product
          </button>

        </div>

      </form>

    </div>
  );
}

export default ProductForm;