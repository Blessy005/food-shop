import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Fresh & Delicious Food</h1>

        <p>
          Enjoy your favorite meals prepared with fresh ingredients and
          delivered straight to your doorstep.
        </p>

        <button className="order-btn">
          Order Now
        </button>
      </div>
    </section>
  );
}

export default Hero;