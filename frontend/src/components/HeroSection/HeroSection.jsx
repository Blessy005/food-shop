import "./HeroSection.css";

function HeroSection() {

  // Scroll to a homepage section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-container">

        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-tag">
            Fresh • Delicious • Delivered
          </span>

          <h1>
            Taste the Best Flavors From Around the World
          </h1>

          <p>
            Enjoy authentic South Indian delicacies, crispy fast food,
            refreshing beverages, and famous international dishes, freshly
            prepared with quality ingredients.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => scrollToSection("popular-menu")}
            >
              Order Now
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollToSection("food-list")}
            >
              Explore Menu
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image">
          <img
            src="/images/foods/hero-food.jpg"
            alt="Delicious food from Flavor Feast"
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSection;