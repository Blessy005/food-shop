import "./CategorySection.css";

import categoryData from "../../data/categoryData";

function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {

  // Scroll to full menu
  const exploreFullMenu = () => {
    document.getElementById("food-list")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="categories" id="categories">
      <div className="container">

        {/* Section Title */}
        <div className="section-title">
          <h2>Browse by Category</h2>

          <p>
            Discover your favorite dishes from different cuisines.
          </p>
        </div>

        {/* Categories */}
        <div className="category-grid">

          {/* All Categories */}
          <div
            className={`category-card ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            <h3>All</h3>
          </div>

          {/* Other Categories */}
          {categoryData.map((category) => (
            <div
              className={`category-card ${
                selectedCategory === category.name ? "active" : ""
              }`}
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.name)
              }
            >
              <h3>{category.name}</h3>
            </div>
          ))}

        </div>

        {/* Explore Full Menu */}
        <div className="explore-menu-wrapper">
          <button
            className="explore-menu-btn"
            onClick={exploreFullMenu}
          >
            Explore Full Menu
          </button>
        </div>

      </div>
    </section>
  );
}

export default CategorySection;