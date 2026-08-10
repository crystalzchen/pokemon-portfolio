import { useRef, useState } from "react";
import "./App.css";

import forest from "./assets/background/forest.png";
import trainer from "./assets/trainer/trainer.png";
import pokeball from "./assets/ui/pokeball.png";
import eevee from "./assets/pokemon/eevee.png";

const introDialogue = [
  "Hi! I'm Crystal!",
  "Welcome to my portfolio!",
  "There are a few Pokémon hiding around here...",
  "Each one has something to show you!",
  "Try catching one!"
];

function App() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const [showEevee, setShowEevee] = useState(false);
  const [showEncounterDialogue, setShowEncounterDialogue] = useState(false);

  const [pokeballActive, setPokeballActive] = useState(false);
  const [showCatchTutorial, setShowCatchTutorial] = useState(false);

  const [isThrowing, setIsThrowing] = useState(false);
  const [throwOffset, setThrowOffset] = useState({ x: 0, y: 0 });

  const [isCapturing, setIsCapturing] = useState(false);
  const [eeveeCaught, setEeveeCaught] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const [showCaughtDialogue, setShowCaughtDialogue] = useState(false);
  const [showAboutCard, setShowAboutCard] = useState(false);

  const [eeveeHasEntered, setEeveeHasEntered] = useState(false);

  const eeveeRef = useRef<HTMLImageElement>(null);
  const pokeballRef = useRef<HTMLImageElement>(null);

  function handleDialogueClick() {
    if (dialogueIndex < introDialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setShowDialogue(false);
      setShowEevee(true);

      setTimeout(() => {
        setShowEncounterDialogue(true);
        setEeveeHasEntered(true);
      }, 1200);
    }
  }

  function handleEncounterClick() {
    setShowEncounterDialogue(false);
    setPokeballActive(true);
    setShowCatchTutorial(true);
  }

  function handlePokeballClick() {
    if (
      !pokeballActive ||
      isThrowing ||
      eeveeCaught ||
      !eeveeRef.current ||
      !pokeballRef.current
    ) {
      return;
    }

    setShowCatchTutorial(false);

    const eeveeRect = eeveeRef.current.getBoundingClientRect();
    const ballRect = pokeballRef.current.getBoundingClientRect();

    const eeveeCenterX =
      eeveeRect.left + eeveeRect.width / 2;

    const eeveeCenterY =
      eeveeRect.top + eeveeRect.height / 2;

    const ballCenterX =
      ballRect.left + ballRect.width / 2;

    const ballCenterY =
      ballRect.top + ballRect.height / 2;

    const targetX = eeveeCenterX - ballCenterX;
    const targetY = eeveeCenterY - ballCenterY;

    setThrowOffset({
      x: targetX,
      y: targetY
    });

    setPokeballActive(false);
    setIsThrowing(true);

    setTimeout(() => {
      setIsCapturing(true);

      setTimeout(() => {
        setIsCapturing(false);
        setEeveeCaught(true);

        setIsThrowing(false);
        setIsShaking(true);

        setTimeout(() => {
          setIsShaking(false);
          setShowCaughtDialogue(true);
        }, 1700);
      }, 500);
    }, 700);
  }

  function handleCaughtDialogueClick() {
    setShowCaughtDialogue(false);
    setShowAboutCard(true);
  }

  function resetEeveeEncounter() {
    setShowAboutCard(false);

    setEeveeCaught(false);
    setShowEevee(true);

    setIsCapturing(false);
    setIsThrowing(false);
    setIsShaking(false);

    setThrowOffset({
      x: 0,
      y: 0
    });

    setPokeballActive(true);
    setShowCatchTutorial(false);
  }

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

        {showDialogue && (
          <div
            className="dialogue"
            onClick={handleDialogueClick}
          >
            <p>{introDialogue[dialogueIndex]}</p>

            <span className="dialogue-continue">
              Click to continue
            </span>

            <span className="dialogue-next">
              ▼
            </span>
          </div>
        )}

        {showEncounterDialogue && (
          <div
            className="dialogue encounter-dialogue"
            onClick={handleEncounterClick}
          >
            <p>An Eevee appeared!</p>

            <span className="dialogue-continue">
              Click to continue
            </span>

            <span className="dialogue-next">
              ▼
            </span>
          </div>
        )}

        {showCatchTutorial && (
          <div className="catch-tutorial">
            <p className="catch-title">
              CATCH EEVEE!
            </p>

            <p className="catch-instructions">
              Click the Poké Ball
              <br />
              to catch Eevee!
            </p>
          </div>
        )}

        {showEevee && !eeveeCaught && (
          <img
            ref={eeveeRef}
            className={`eevee ${
              !eeveeHasEntered ? "eevee-entering" : ""
            } ${
              isCapturing ? "eevee-capturing" : ""
            }`}
            src={eevee}
            alt="Eevee"
          />
        )}

        {showCaughtDialogue && (
          <div
            className="dialogue caught-dialogue"
            onClick={handleCaughtDialogueClick}
          >
            <p>Gotcha! Eevee was caught!</p>

            <span className="dialogue-continue">
              Click to continue
            </span>

            <span className="dialogue-next">
              ▼
            </span>
          </div>
        )}

        {pokeballActive && (
          <svg
            className="aim-guide"
            viewBox="0 0 400 300"
          >
            <path
              d="M 20 275 Q 185 40 360 15"
              className="aim-path"
            />
          </svg>
        )}

        <img
          ref={pokeballRef}
          className={`pokeball ${
            pokeballActive ? "pokeball-active" : ""
          } ${isThrowing ? "pokeball-throwing" : ""} ${
            isShaking ? "pokeball-shaking" : ""
          } ${eeveeCaught ? "pokeball-captured" : ""}`}
          src={pokeball}
          alt="Poké Ball"
          onClick={handlePokeballClick}
          style={
            isThrowing || eeveeCaught
              ? ({
                  "--throw-x": `${throwOffset.x}px`,
                  "--throw-y": `${throwOffset.y}px`
                } as React.CSSProperties)
              : undefined
          }
        />

        {showAboutCard && (
          <div className="card-overlay">
            <div className="pokemon-card">
              <button
                className="card-close"
                onClick={resetEeveeEncounter}
              >
                ×
              </button>

              <div className="card-header">
                <span className="card-name">
                  EEVEE
                </span>

                <span className="card-hp">
                  ABOUT ME
                </span>
              </div>

              <div className="card-image-area">
                <img
                  src={eevee}
                  alt="Eevee"
                  className="card-eevee"
                />
              </div>

              <div className="card-info">
                <h2>Crystal Chen</h2>

                <p className="card-subtitle">
                  Computer Science + Business
                </p>

                <p>
                  Hi! I'm Crystal, a student interested in
                  building creative projects at the
                  intersection of technology, business,
                  and design.
                </p>

                <div className="card-stats">
                  <span>Type</span>

                  <strong>
                    Creative / Curious
                  </strong>
                </div>

                <div className="card-stats">
                  <span>Interests</span>

                  <strong>
                    Software • Quant • Design
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;