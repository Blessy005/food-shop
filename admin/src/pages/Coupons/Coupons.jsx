import { useEffect, useState } from "react";

import "./Coupons.css";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Form visibility
  const [showForm, setShowForm] = useState(false);

  // Edit mode
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minimumOrderAmount: "",
    maximumDiscount: "",
    expiryDate: "",
    isActive: true,
  });

  // ========================================
  // FETCH COUPONS
  // ========================================

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/coupons`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }

      const data = await response.json();

      setCoupons(data);
    } catch (error) {
      console.error("Fetch Coupons Error:", error);
      alert("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minimumOrderAmount: "",
      maximumDiscount: "",
      expiryDate: "",
      isActive: true,
    });

    setEditingCoupon(null);
  };

  // ========================================
  // OPEN CREATE FORM
  // ========================================

  const handleCreate = () => {
    resetForm();
    setShowForm(true);
  };

  // ========================================
  // OPEN EDIT FORM
  // ========================================

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code || "",
      discountType: coupon.discountType || "percentage",
      discountValue: coupon.discountValue ?? "",
      minimumOrderAmount: coupon.minimumOrderAmount ?? "",
      maximumDiscount: coupon.maximumDiscount ?? "",
      expiryDate: coupon.expiryDate
        ? new Date(coupon.expiryDate).toISOString().split("T")[0]
        : "",
      isActive: coupon.isActive,
    });

    setShowForm(true);
  };

  // ========================================
  // SUBMIT FORM
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Admin login required.");
      return;
    }

    if (!formData.code.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    if (!formData.discountValue) {
      alert("Please enter a discount value.");
      return;
    }

    if (!formData.expiryDate) {
      alert("Please select an expiry date.");
      return;
    }

    try {
      const payload = {
        code: formData.code.trim().toUpperCase(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minimumOrderAmount:
          Number(formData.minimumOrderAmount) || 0,
        maximumDiscount:
          formData.maximumDiscount === ""
            ? null
            : Number(formData.maximumDiscount),
        expiryDate: formData.expiryDate,
        isActive: formData.isActive,
      };

      const url = editingCoupon
        ? `${import.meta.env.VITE_API_URL}/coupons/${editingCoupon._id}`
        : `${import.meta.env.VITE_API_URL}/coupons`;

      const method = editingCoupon ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save coupon",
        );
      }

      alert(
        editingCoupon
          ? "Coupon updated successfully!"
          : "Coupon created successfully!",
      );

      setShowForm(false);
      resetForm();

      fetchCoupons();
    } catch (error) {
      console.error("Save Coupon Error:", error);

      alert(error.message || "Failed to save coupon.");
    }
  };

  // ========================================
  // DELETE COUPON
  // ========================================

  const handleDelete = async (coupon) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete coupon ${coupon.code}?`,
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/coupons/${coupon._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete coupon",
        );
      }

      setCoupons((prevCoupons) =>
        prevCoupons.filter(
          (item) => item._id !== coupon._id,
        ),
      );

      alert("Coupon deleted successfully!");
    } catch (error) {
      console.error("Delete Coupon Error:", error);

      alert(error.message || "Failed to delete coupon.");
    }
  };

  // ========================================
  // TOGGLE STATUS
  // ========================================

  const handleToggleStatus = async (coupon) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/coupons/${coupon._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActive: !coupon.isActive,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update coupon",
        );
      }

      setCoupons((prevCoupons) =>
        prevCoupons.map((item) =>
          item._id === coupon._id
            ? data.coupon
            : item,
        ),
      );
    } catch (error) {
      console.error("Toggle Coupon Error:", error);

      alert(error.message || "Failed to update coupon.");
    }
  };

  // ========================================
  // FILTER COUPONS
  // ========================================

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" &&
        coupon.isActive === true) ||
      (selectedStatus === "inactive" &&
        coupon.isActive === false);

    return matchesSearch && matchesStatus;
  });

  // ========================================
  // EXPIRY CHECK
  // ========================================

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="coupons-page">
        <p className="coupons-message">
          Loading coupons...
        </p>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="coupons-page">

      {/* Page Header */}
      <div className="coupons-header">
        <div>
          <h1>Coupons</h1>
          <p>
            Create and manage discount coupons for customers.
          </p>
        </div>

        <button
          className="add-coupon-button"
          onClick={handleCreate}
        >
          + Create Coupon
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="coupon-form-card">

          <div className="coupon-form-header">
            <div>
              <h2>
                {editingCoupon
                  ? "Edit Coupon"
                  : "Create Coupon"}
              </h2>

              <p>
                {editingCoupon
                  ? "Update the coupon details."
                  : "Add a new discount coupon."}
              </p>
            </div>

            <button
              type="button"
              className="coupon-form-close"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Coupon Code */}
            <div className="coupon-form-grid">

              <div className="coupon-form-group">
                <label>Coupon Code</label>

                <input
                  type="text"
                  name="code"
                  placeholder="e.g. WELCOME10"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Discount Type */}
              <div className="coupon-form-group">
                <label>Discount Type</label>

                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                >
                  <option value="percentage">
                    Percentage
                  </option>

                  <option value="fixed">
                    Fixed Amount
                  </option>
                </select>
              </div>

              {/* Discount Value */}
              <div className="coupon-form-group">
                <label>
                  Discount Value
                  {formData.discountType === "percentage"
                    ? " (%)"
                    : " (₹)"}
                </label>

                <input
                  type="number"
                  name="discountValue"
                  min="0"
                  step="0.01"
                  placeholder={
                    formData.discountType === "percentage"
                      ? "10"
                      : "50"
                  }
                  value={formData.discountValue}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Minimum Order */}
              <div className="coupon-form-group">
                <label>Minimum Order Amount (₹)</label>

                <input
                  type="number"
                  name="minimumOrderAmount"
                  min="0"
                  step="0.01"
                  placeholder="300"
                  value={formData.minimumOrderAmount}
                  onChange={handleChange}
                />
              </div>

              {/* Maximum Discount */}
              <div className="coupon-form-group">
                <label>Maximum Discount (₹)</label>

                <input
                  type="number"
                  name="maximumDiscount"
                  min="0"
                  step="0.01"
                  placeholder="100"
                  value={formData.maximumDiscount}
                  onChange={handleChange}
                />

                <small>
                  Optional. Useful for percentage coupons.
                </small>
              </div>

              {/* Expiry */}
              <div className="coupon-form-group">
                <label>Expiry Date</label>

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Active */}
            <div className="coupon-active-field">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />

                <span>
                  Coupon is active
                </span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="coupon-form-actions">

              <button
                type="button"
                className="coupon-cancel-button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="coupon-save-button"
              >
                {editingCoupon
                  ? "Update Coupon"
                  : "Create Coupon"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="coupons-toolbar">

        {/* Search */}
        <div className="coupon-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        {/* Status */}
        <div className="coupon-filters">
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value)
            }
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

      </div>

      {/* Coupon Table */}
      <div className="coupons-table-card">
        <div className="coupons-table-wrapper">

          <table className="coupons-table">

            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Min. Order</th>
                <th>Max. Discount</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCoupons.length > 0 ? (

                filteredCoupons.map((coupon) => {

                  const expired = isExpired(
                    coupon.expiryDate,
                  );

                  return (
                    <tr key={coupon._id}>

                      {/* Code */}
                      <td>
                        <span className="coupon-code">
                          {coupon.code}
                        </span>
                      </td>

                      {/* Discount */}
                      <td>
                        <span className="coupon-discount">
                          {coupon.discountType ===
                          "percentage"
                            ? `${coupon.discountValue}%`
                            : `₹${coupon.discountValue}`}
                        </span>

                        <span className="coupon-discount-type">
                          {coupon.discountType ===
                          "percentage"
                            ? "off"
                            : "discount"}
                        </span>
                      </td>

                      {/* Minimum Order */}
                      <td>
                        ₹{coupon.minimumOrderAmount || 0}
                      </td>

                      {/* Maximum Discount */}
                      <td>
                        {coupon.maximumDiscount !==
                        null &&
                        coupon.maximumDiscount !==
                          undefined
                          ? `₹${coupon.maximumDiscount}`
                          : "—"}
                      </td>

                      {/* Expiry */}
                      <td>
                        {new Date(
                          coupon.expiryDate,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`coupon-status ${
                            expired
                              ? "status-expired"
                              : coupon.isActive
                                ? "status-active"
                                : "status-inactive"
                          }`}
                        >
                          {expired
                            ? "Expired"
                            : coupon.isActive
                              ? "Active"
                              : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="coupon-actions">

                          {/* Edit */}
                          <button
                            className="coupon-edit-button"
                            onClick={() =>
                              handleEdit(coupon)
                            }
                          >
                            Edit
                          </button>

                          {/* Toggle */}
                          <button
                            className="coupon-toggle-button"
                            onClick={() =>
                              handleToggleStatus(coupon)
                            }
                          >
                            {coupon.isActive
                              ? "Disable"
                              : "Enable"}
                          </button>

                          {/* Delete */}
                          <button
                            className="coupon-delete-button"
                            onClick={() =>
                              handleDelete(coupon)
                            }
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
                    className="coupons-message"
                  >
                    No coupons found.
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

export default Coupons;