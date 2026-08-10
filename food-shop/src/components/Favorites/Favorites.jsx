import "./Favorites.css";

function Favorites({ favorites, addToCart, toggleFavorite }) {
  return (
    <section className="favorites" id="favorites">
      <div className="container">
        <div className="section-title">
          <h2>Your Favorites</h2>
          <p>Foods you love, all in one place.</p>
        </div>

        {favorites.length === 0 ? (
          <p className="empty-favorites">
            You haven't added any favorites yet.
          </p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((item) => (
              <div className="favorite-card" key={item.id}>
                <div className="favorite-image">
                  Food Image
                </div>

                <div className="favorite-details">
                  <div className="favorite-header">
                    <h3>{item.name}</h3>

                    <button
                      className="favorite-btn active"
                      onClick={() => toggleFavorite(item)}
                    >
                      ♥
                    </button>
                  </div>

                  <p>{item.category}</p>

                  <div className="favorite-footer">
                    <span>₹{item.price}</span>

                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Favorites;