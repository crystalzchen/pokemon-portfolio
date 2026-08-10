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

  const [isAiming, setIsAiming] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isThrowing, setIsThrowing] = useState(false);
  const [throwOffset, setThrowOffset] = useState({ x: 0, y: 0 });

  const [eeveeCaught, setEeveeCaught] = useState(false);
  const [showCaughtDialogue, setShowCaughtDialogue] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const worldRef = useRef<HTMLDivElement>(null);
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
      }, 1200);
    }
  }

  function handleEncounterClick() {
    setShowEncounterDialogue(false);
    setPokeballActive(true);
    setShowCatchTutorial(true);
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLImageElement>
  ) {
    if (!pokeballActive || isThrowing || eeveeCaught) return;

    setIsAiming(true);
    setShowCatchTutorial(false);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLImageElement>
  ) {
    if (!isAiming || !worldRef.current) return;

    const worldRect = worldRef.current.getBoundingClientRect();

    const centerX = worldRect.width / 2;
    const ballStartY = worldRect.height - 140;

    const pointerX = event.clientX - worldRect.left;
    const pointerY = event.clientY - worldRect.top;

    let offsetX = pointerX - centerX;
    let offsetY = pointerY - ballStartY;

    const maxDrag = 140;

    offsetX = Math.max(-maxDrag, Math.min(maxDrag, offsetX));
    offsetY = Math.max(-maxDrag, Math.min(80, offsetY));

    setDragOffset({
      x: offsetX,
      y: offsetY
    });
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLImageElement>
  ) {
    if (!pokeballActive || !isAiming) return;

    setIsAiming(false);

    event.currentTarget.releasePointerCapture(event.pointerId);

    const dragDistance = Math.sqrt(
      dragOffset.x * dragOffset.x +
      dragOffset.y * dragOffset.y
    );

    if (dragDistance < 20) {
      setDragOffset({
        x: 0,
        y: 0
      });

      setShowCatchTutorial(true);

      return;
    }

    if (!eeveeRef.current || !pokeballRef.current) {
      return;
    }

    const eeveeRect =
      eeveeRef.current.getBoundingClientRect();

    const ballRect =
      pokeballRef.current.getBoundingClientRect();

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

    setIsThrowing(true);

    setTimeout(() => {
      setEeveeCaught(true);
      setPokeballActive(false);
      setIsThrowing(false);
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
        setShowCaughtDialogue(true);
      }, 1700);
    }, 700);
  }

  return (
    <main className="game">
      <div
        ref={worldRef}
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
              Drag the Poké Ball to aim
              <br />
              Release to throw!
            </p>
          </div>
        )}

        {showEevee && !eeveeCaught && (
          <img
            ref={eeveeRef}
            className="eevee"
            src={eevee}
            alt="Eevee"
          />
        )}

        {showCaughtDialogue && (
          <div
            className="dialogue caught-dialogue"
            onClick={() => setShowCaughtDialogue(false)}
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
              d={`
                M ${20 + dragOffset.x * 0.25} ${275 + dragOffset.y * 0.15}
                Q 185 ${40 - dragOffset.y * 0.4}
                360 15
              `}
              className="aim-path"
            />
          </svg>
        )}

        <img
          ref={pokeballRef}
          className={`pokeball ${
            pokeballActive ? "pokeball-active" : ""
          } ${isAiming ? "pokeball-aiming" : ""} ${
            isThrowing ? "pokeball-throwing" : ""
          } ${isShaking ? "pokeball-shaking" : ""} ${
            eeveeCaught ? "pokeball-captured" : ""
          }`}
          src={pokeball}
          alt="Poké Ball"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={
            isThrowing || eeveeCaught
              ? ({
                  "--throw-x": `${throwOffset.x}px`,
                  "--throw-y": `${throwOffset.y}px`
                } as React.CSSProperties)
              : {
                  translate: `${dragOffset.x}px ${dragOffset.y}px`
                }
          }
        />
      </div>
    </main>
  );
}

export default App;