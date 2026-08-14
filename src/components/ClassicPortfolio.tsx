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
            hey, i'm crystal!
          </h1>

          <p className="classic-intro">
            computer science @ waterloo and business administration @ laurier
            i'm still building this part, come back soon!
          </p>
        </section>
      </main>
    </div>
  );
}

export default ClassicPortfolio;