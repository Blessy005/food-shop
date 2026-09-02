import { useEffect, useState } from "react";
import "./MenuSection.css";
import menuData from "../../data/menuData";
import FoodCard from "../FoodCard/FoodCard";

function MenuSection({
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  cart,
  toggleFavorite,
  favorites,
}) {
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularFoods = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        // Existing popular food IDs from menuData.js
        const popularFoodIds = [25, 11, 1, 54, 31, 51, 56, 64];

        // Get the names of the popular foods
        const popularFoodNames = menuData
          .filter((item) => popularFoodIds.includes(item.id))
          .map((item) => item.name);

        // Match popular foods with MongoDB products
        const popularProducts = products
          .filter((product) =>
            popularFoodNames.includes(product.name)
          )
          .map((product) => ({
            ...product,

            // IMPORTANT:
            // MongoDB _id is used for cart/order operations
            id: product._id,

            image: product.image
              ? product.image.startsWith("/uploads")
                ? `${import.meta.env.VITE_SERVER_URL}${product.image}`
                : product.image
              : "",
          }));

        setPopularFoods(popularProducts);
      } catch (error) {
        console.error("Error fetching popular foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularFoods();
  }, []);

  return (
    <section className="menu" id="menu">
      <div className="menu-header">
        <h2>Popular Menu</h2>
        <p>Our most loved dishes, made fresh for you.</p>
      </div>

      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div className="menu-grid">
          {popularFoods.map((item) => {
            // Find this product in the cart
            const cartItem = cart.find(
              (cartItem) => cartItem.id === item.id
            );

            // Get the actual quantity
            const quantity = cartItem ? cartItem.quantity : 0;

            // Check favorite status
            const isFavorite = favorites.some(
              (favorite) => favorite.id === item.id
            );

            return (
              <FoodCard
                key={item.id}
                item={item}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                quantity={quantity}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default MenuSection;