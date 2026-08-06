import "./CategorySection.css";

function CategorySection() {
  const categories = [
    "South Indian",
    "Fast Food",
    "International",
    "Beverages",
    "Desserts",
  ];

  return (
    <section className="categories" id="categories">
      <div className="container">

        <div className="section-title">
          <h2>Browse by Category</h2>
          <p>
            Discover your favorite dishes from different cuisines.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category}>
              <h3>{category}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;