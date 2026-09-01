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
  
  // Select popular foods for the homepage
const popularFoodIds = [25, 11, 1, 54, 31, 51, 56, 64];

const popularFoods = menuData.filter((item) =>
  popularFoodIds.includes(item.id)
);

  return (
    <section className="menu" id="menu">
      <div className="container">

        <div className="section-title">
          <h2>Our Popular Menu</h2>

          <p>
            Enjoy some of our most loved dishes.
          </p>
        </div>

        <div className="menu-grid">
          {popularFoods.map((item) => {

            const isFavorite = favorites.some(
              (favorite) => favorite.id === item.id
            );

            const cartItem = cart.find(
              (cartItem) => cartItem.id === item.id
            );

            const quantity = cartItem
              ? cartItem.quantity
              : 0;

            return (
              <FoodCard
                key={item.id}
                item={item}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                quantity={quantity}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default MenuSection;