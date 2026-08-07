import "./CategorySection.css";
import categoryData from "../../data/categoryData";

function CategorySection() {
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
          {categoryData.map((category) => (
            <div className="category-card" key={category.id}>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;