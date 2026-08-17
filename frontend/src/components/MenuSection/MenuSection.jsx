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
  // Select 12 popular foods
  const popularFoods = menuData.slice(0, 12);

  return (
    <section className="menu" id="popular-menu">
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