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

          <div className="classic-hero-left">
            <p className="classic-eyebrow">
              WELCOME TO MY PORTFOLIO
            </p>

            <h1>
              hey, i'm
              <br />
              crystal!
            </h1>

            <p className="classic-intro">
              computer science @ waterloo and business
              administration @ laurier
            </p>
          </div>

          <div className="classic-construction">
            <p className="construction-label">
              CLASSIC MODE
            </p>

            <h2>
              UNDER
              <br />
              CONSTRUCTION
            </h2>

            <p className="construction-text">
              i'm still building this side of my portfolio.
              check back soon!
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}

export default ClassicPortfolio;