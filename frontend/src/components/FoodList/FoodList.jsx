import { useEffect, useState } from "react";
import "./FoodList.css";
import FoodCard from "../FoodCard/FoodCard";

function FoodList({
  selectedCategory,
  searchTerm,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  cart,
  toggleFavorite,
  favorites,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("PRODUCTS FROM MONGODB:", data);

        const formattedProducts = data.map((product) => ({
          ...product,

          // MongoDB _id → id
          id: product._id,

          // Handle uploaded images
          image: product.image
            ? product.image.startsWith("/uploads")
              ? `${import.meta.env.VITE_SERVER_URL}${product.image}`
              : product.image
            : "",
        }));

        console.log(
          "FORMATTED PRODUCTS:",
          formattedProducts
        );

        setProducts(formattedProducts);
      } catch (err) {
        console.error(
          "Error fetching products:",
          err
        );

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="food-list" id="food-list">
        <div className="container">
          <div className="section-title">
            <h2>All Foods</h2>
            <p>Loading delicious foods...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="food-list" id="food-list">
        <div className="container">
          <div className="section-title">
            <h2>All Foods</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Filter products
  const filteredFoods = products.filter((item) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log(
    "SELECTED CATEGORY:",
    selectedCategory
  );

  console.log(
    "SEARCH TERM:",
    searchTerm
  );

  console.log(
    "FILTERED FOODS:",
    filteredFoods
  );

  return (
    <section
      className="food-list"
      id="food-list"
    >
      <div className="container">

        {/* Section Title */}
        <div className="section-title">
          <h2>
            {!selectedCategory ||
            selectedCategory === "All" ||
            selectedCategory === "All Categories"
              ? "All Foods"
              : `${selectedCategory} Foods`}
          </h2>

          <p>
            Explore delicious dishes from our menu.
          </p>
        </div>

        {/* No products at all */}
        {products.length === 0 ? (
          <p className="no-foods">
            No products found in the database.
          </p>
        ) : filteredFoods.length === 0 ? (
          <p className="no-foods">
            No foods found for this category/search.
          </p>
        ) : (
          <div className="food-list-grid">

            {filteredFoods.map((item) => {
              const isFavorite = favorites.some(
                (favorite) =>
                  favorite.id === item.id
              );

              const cartItem = cart.find(
                (cartItem) =>
                  cartItem.id === item.id
              );

              const quantity = cartItem
                ? cartItem.quantity
                : 0;

              return (
                <FoodCard
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
                  increaseQuantity={
                    increaseQuantity
                  }
                  decreaseQuantity={
                    decreaseQuantity
                  }
                  quantity={quantity}
                  toggleFavorite={
                    toggleFavorite
                  }
                  isFavorite={isFavorite}
                />
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

export default FoodList;