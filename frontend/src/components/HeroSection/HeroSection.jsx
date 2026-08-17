import "./HeroSection.css";
// import heroFood from "../../assets/images/hero/hero-food.png";

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-tag">Fresh • Delicious • Delivered</span>

          <h1>Taste the Best Flavors From Around the World</h1>

          <p>
            Enjoy authentic South Indian delicacies, crispy fast food,
            refreshing beverages, and famous international dishes, freshly
            prepared with quality ingredients.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Order Now</button>

            <button className="secondary-btn">Explore Menu</button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hero-image">
          <div className="hero-placeholder">Food Image</div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
