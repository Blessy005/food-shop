import "./Cart.css";

function Cart({ cart }) {
  return (
    <section className="cart" id="cart">
      <div className="container">
        <div className="section-title">
          <h2>Your Cart</h2>
          <p>Review the items you have selected.</p>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty.
          </p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <span>{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;