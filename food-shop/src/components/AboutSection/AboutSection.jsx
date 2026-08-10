import "./AboutSection.css";

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="about-content">
          <span className="about-tag">ABOUT US</span>

          <h2>
            Good Food, Great Moments
          </h2>

          <p>
            We bring together delicious dishes from
            different cuisines, made with fresh
            ingredients and lots of care.
          </p>

          <p>
            From comforting Indian classics to
            international favorites, there is
            something for everyone at our table.
          </p>

          <div className="about-features">
            <div className="about-feature">
              <span>🍽️</span>
              <h3>Fresh Food</h3>
            </div>

            <div className="about-feature">
              <span>👨‍🍳</span>
              <h3>Quality</h3>
            </div>

            <div className="about-feature">
              <span>❤️</span>
              <h3>Made With Care</h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;