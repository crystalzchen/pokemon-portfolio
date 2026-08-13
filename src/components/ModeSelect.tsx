interface ModeSelectProps {
  onSelect: (mode: "adventure" | "classic") => void;
}

function ModeSelect({ onSelect }: ModeSelectProps) {
  return (
    <div className="mode-screen">
      <div className="mode-panel">
        <p className="mode-small-text">WELCOME</p>

        <h1 className="mode-title">CHOOSE YOUR PATH</h1>

        <p className="mode-description">
          How would you like to explore my portfolio?
        </p>

        <div className="mode-buttons">
          <button
            className="mode-card"
            onClick={() => onSelect("adventure")}
          >
            <span className="mode-card-title">ADVENTURE</span>

            <span className="mode-card-description">
              Explore the world and discover my work along the way.
            </span>
          </button>

          <button
            className="mode-card"
            onClick={() => onSelect("classic")}
          >
            <span className="mode-card-title">CLASSIC</span>

            <span className="mode-card-description">
              Browse a traditional version of my portfolio.
            </span>
          </button>
        </div>

        <p className="mode-footer">
          You can switch modes at any time.
        </p>
      </div>
    </div>
  );
}

export default ModeSelect;