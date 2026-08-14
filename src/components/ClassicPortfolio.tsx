interface ClassicPortfolioProps {
  onSwitchMode: () => void;
}

function ClassicPortfolio({
  onSwitchMode
}: ClassicPortfolioProps) {
  return (
    <div className="classic-page">
      <nav className="classic-navbar">
        <div className="classic-logo">
          CRYSTAL CHEN
        </div>

        <div className="classic-nav-links">
          <a href="#about">ABOUT</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#projects">PROJECTS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>

          <button
            className="classic-switch-button"
            onClick={onSwitchMode}
          >
            SWITCH MODE
          </button>
        </div>
      </nav>

      <main className="classic-content">
        <section className="classic-hero">
          <p className="classic-eyebrow">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1>
            Hi, I'm Crystal.
          </h1>

          <p className="classic-intro">
            Computer Science + Business student
            interested in technology, data, and
            creative problem solving.
          </p>
        </section>
      </main>
    </div>
  );
}

export default ClassicPortfolio;