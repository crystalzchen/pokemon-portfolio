import "./App.css";

import forest from "./assets/background/forest.png";
import trainer from "./assets/trainer/trainer.png";
import pokeball from "./assets/ui/pokeball.png";

function App() {
  return (
    <main className="game">
      <div
        className="world"
        style={{ backgroundImage: `url(${forest})` }}
      >
        <img
          className="trainer"
          src={trainer}
          alt="Trainer"
        />

        <div className="dialogue">
          <p>Hi! I'm Crystal!</p>
        </div>

        <img
          className="pokeball"
          src={pokeball}
          alt="Poké Ball"
        />
      </div>
    </main>
  );
}

export default App;