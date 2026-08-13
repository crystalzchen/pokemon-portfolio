import { useRef, useState } from "react";
import "./App.css";
import ModeSelect from "./components/ModeSelect";

import forest from "./assets/background/forest.png";
import trainer from "./assets/trainer/trainer.png";
import pokeball from "./assets/ui/pokeball.png";

import { pokemonList } from "./data/pokemon";

const introDialogue = [
  "Hi! I'm Crystal!",
  "Welcome to my portfolio!",
  "There are a few Pokémon hiding around here...",
  "Each one has something to show you!",
  "Try catching one!"
];

interface AimPath {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type PortfolioMode = "adventure" | "classic" | null;

function App() {
  const [mode, setMode] = useState<PortfolioMode>(null);

  const [showStartScreen, setShowStartScreen] =
    useState(true);

  const [isStarting, setIsStarting] =
    useState(false);

  const [dialogueIndex, setDialogueIndex] =
    useState(0);

  const [showDialogue, setShowDialogue] =
    useState(false);

  const [showPokemon, setShowPokemon] =
    useState(false);

  const [showEncounterDialogue, setShowEncounterDialogue] =
    useState(false);

  const [showCatchTutorial, setShowCatchTutorial] =
    useState(false);

  const [selectedPokemonId, setSelectedPokemonId] =
    useState<string | null>(null);

  const [capturingPokemonId, setCapturingPokemonId] =
    useState<string | null>(null);

  const [caughtPokemonId, setCaughtPokemonId] =
    useState<string | null>(null);

  const [activeCardId, setActiveCardId] =
    useState<string | null>(null);

  const [pokeballActive, setPokeballActive] =
    useState(false);

  const [isThrowing, setIsThrowing] =
    useState(false);

  const [isShaking, setIsShaking] =
    useState(false);

  const [throwOffset, setThrowOffset] = useState({
    x: 0,
    y: 0
  });

  const [aimPath, setAimPath] =
    useState<AimPath | null>(null);

  const [showCaughtDialogue, setShowCaughtDialogue] =
    useState(false);

  const [pokemonHaveEntered, setPokemonHaveEntered] =
    useState(false);

  const [experienceIndex, setExperienceIndex] =
    useState(0);

  const worldRef =
    useRef<HTMLDivElement>(null);

  const pokeballRef =
    useRef<HTMLImageElement>(null);

  const pokemonRefs = useRef<
    Record<string, HTMLImageElement | null>
  >({});

  const selectedPokemon =
    pokemonList.find(
      (pokemon) =>
        pokemon.id === selectedPokemonId
    ) ?? null;

  const activeCardPokemon =
    pokemonList.find(
      (pokemon) =>
        pokemon.id === activeCardId
    ) ?? null;

  const activeExperience =
    activeCardPokemon?.experiences?.[
      experienceIndex
    ] ?? null;

  function handleStartGame() {
    if (isStarting) {
      return;
    }

    setIsStarting(true);

    setTimeout(() => {
      setShowStartScreen(false);
      setShowDialogue(true);
    }, 1100);
  }

  function handleDialogueClick() {
    if (
      dialogueIndex <
      introDialogue.length - 1
    ) {
      setDialogueIndex(
        dialogueIndex + 1
      );

      return;
    }

    setShowDialogue(false);
    setShowPokemon(true);

    setTimeout(() => {
      setShowEncounterDialogue(true);
      setPokemonHaveEntered(true);
    }, 1200);
  }

  function handleEncounterClick() {
    setShowEncounterDialogue(false);
    setShowCatchTutorial(true);
  }

  function calculateAimPath(
    pokemonId: string
  ) {
    const target =
      pokemonRefs.current[pokemonId];

    const ball =
      pokeballRef.current;

    const world =
      worldRef.current;

    if (!target || !ball || !world) {
      return;
    }

    const targetRect =
      target.getBoundingClientRect();

    const ballRect =
      ball.getBoundingClientRect();

    const worldRect =
      world.getBoundingClientRect();

    const startX =
      ballRect.left -
      worldRect.left +
      ballRect.width / 2;

    const startY =
      ballRect.top -
      worldRect.top +
      ballRect.height / 2;

    const endX =
      targetRect.left -
      worldRect.left +
      targetRect.width / 2;

    const endY =
      targetRect.top -
      worldRect.top +
      targetRect.height / 2;

    setAimPath({
      startX,
      startY,
      endX,
      endY
    });
  }

  function handlePokemonClick(
    pokemonId: string
  ) {
    if (
      isThrowing ||
      isShaking ||
      capturingPokemonId ||
      showCaughtDialogue ||
      activeCardId
    ) {
      return;
    }

    setSelectedPokemonId(
      pokemonId
    );

    setPokeballActive(true);

    setShowCatchTutorial(false);

    calculateAimPath(
      pokemonId
    );
  }

  function handlePokeballClick() {
    if (
      !pokeballActive ||
      !selectedPokemonId ||
      isThrowing ||
      caughtPokemonId
    ) {
      return;
    }

    const target =
      pokemonRefs.current[
        selectedPokemonId
      ];

    const ball =
      pokeballRef.current;

    if (!target || !ball) {
      return;
    }

    const pokemonRect =
      target.getBoundingClientRect();

    const ballRect =
      ball.getBoundingClientRect();

    const pokemonCenterX =
      pokemonRect.left +
      pokemonRect.width / 2;

    const pokemonCenterY =
      pokemonRect.top +
      pokemonRect.height / 2;

    const ballCenterX =
      ballRect.left +
      ballRect.width / 2;

    const ballCenterY =
      ballRect.top +
      ballRect.height / 2;

    const targetX =
      pokemonCenterX -
      ballCenterX;

    const targetY =
      pokemonCenterY -
      ballCenterY;

    setThrowOffset({
      x: targetX,
      y: targetY
    });

    setAimPath(null);
    setPokeballActive(false);
    setIsThrowing(true);

    setTimeout(() => {
      setCapturingPokemonId(
        selectedPokemonId
      );

      setTimeout(() => {
        setCapturingPokemonId(null);

        setCaughtPokemonId(
          selectedPokemonId
        );

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
    if (!caughtPokemonId) {
      return;
    }

    setShowCaughtDialogue(false);

    setActiveCardId(
      caughtPokemonId
    );

    setExperienceIndex(0);
  }

  function handlePreviousExperience() {
    if (experienceIndex === 0) {
      return;
    }

    setExperienceIndex(
      experienceIndex - 1
    );
  }

  function handleNextExperience() {
    if (
      !activeCardPokemon?.experiences ||
      experienceIndex ===
        activeCardPokemon.experiences.length - 1
    ) {
      return;
    }

    setExperienceIndex(
      experienceIndex + 1
    );
  }

  function resetPokemonEncounter() {
    setActiveCardId(null);

    setCaughtPokemonId(null);

    setCapturingPokemonId(null);

    setSelectedPokemonId(null);

    setIsThrowing(false);

    setIsShaking(false);

    setExperienceIndex(0);

    setThrowOffset({
      x: 0,
      y: 0
    });

    setAimPath(null);

    setPokeballActive(false);

    setShowCatchTutorial(true);
  }

  if (mode === null) {
    return <ModeSelect onSelect={setMode} />;
  }

  if (mode === "classic") {
    return (
      <main className="classic-placeholder">
        <button onClick={() => setMode(null)}>
          BACK
        </button>

        <h1>Classic Portfolio</h1>
        <p>We’ll build this version next.</p>
      </main>
    );
  }

  return (
    <main className="game">
      <div
        ref={worldRef}
        className="world"
        style={{
          backgroundImage:
            `url(${forest})`
        }}
      >
        <img
          className="trainer"
          src={trainer}
          alt="Trainer"
        />

        {showDialogue && (
          <div
            className="dialogue"
            onClick={
              handleDialogueClick
            }
          >
            <p>
              {
                introDialogue[
                  dialogueIndex
                ]
              }
            </p>

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
            onClick={
              handleEncounterClick
            }
          >
            <p>
              Wild Pokémon appeared!
            </p>

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
              CHOOSE A POKÉMON!
            </p>

            <p className="catch-instructions">
              Click a Pokémon
              <br />
              to choose what to explore!
            </p>
          </div>
        )}

        {showPokemon &&
          pokemonList.map(
            (pokemon) => {
              const isCaught =
                caughtPokemonId ===
                pokemon.id;

              const isCapturing =
                capturingPokemonId ===
                pokemon.id;

              const isSelected =
                selectedPokemonId ===
                pokemon.id;

              if (isCaught) {
                return null;
              }

              return (
                <div
                  key={pokemon.id}
                  className={`pokemon-wrapper ${
                    !pokemonHaveEntered
                      ? `pokemon-wrapper-entering-${pokemon.enterFrom}`
                      : ""
                  }`}
                  style={{
                    left: `${pokemon.x}%`,
                    top: `${pokemon.y}%`
                  }}
                >
                  <div className="pokemon-label">
                    {pokemon.section}
                  </div>

                  <img
                    ref={(
                      element
                    ) => {
                      pokemonRefs.current[
                        pokemon.id
                      ] = element;
                    }}
                    className={`pokemon ${
                      isCapturing
                        ? "pokemon-capturing"
                        : ""
                    } ${
                      isSelected
                        ? "pokemon-selected"
                        : ""
                    }`}
                    src={
                      pokemon.sprite
                    }
                    alt={
                      pokemon.name
                    }
                    onClick={() =>
                      handlePokemonClick(
                        pokemon.id
                      )
                    }
                    style={{
                      width: `${pokemon.width}px`
                    }}
                  />
                </div>
              );
            }
          )}

        {selectedPokemon &&
          pokeballActive && (
            <div className="selected-label">
              <span className="selected-name">
                {
                  selectedPokemon.name
                }{" "}
                selected!
              </span>

              <span className="selected-instruction">
                Click the Poké Ball to catch it!
              </span>
            </div>
          )}

        {pokeballActive &&
          selectedPokemon &&
          aimPath && (
            <svg
              className="aim-guide"
              viewBox={`0 0 ${
                worldRef.current
                  ?.clientWidth ??
                1000
              } ${
                worldRef.current
                  ?.clientHeight ??
                800
              }`}
              preserveAspectRatio="none"
            >
              <path
                d={`
                  M ${aimPath.startX} ${aimPath.startY}
                  Q ${
                    (
                      aimPath.startX +
                      aimPath.endX
                    ) / 2
                  } ${
                    Math.min(
                      aimPath.startY,
                      aimPath.endY
                    ) - 120
                  }
                  ${aimPath.endX} ${aimPath.endY}
                `}
                className="aim-path"
              />
            </svg>
          )}

        <img
          ref={pokeballRef}
          className={`pokeball ${
            pokeballActive
              ? "pokeball-active"
              : ""
          } ${
            isThrowing
              ? "pokeball-throwing"
              : ""
          } ${
            isShaking
              ? "pokeball-shaking"
              : ""
          } ${
            caughtPokemonId
              ? "pokeball-captured"
              : ""
          }`}
          src={pokeball}
          alt="Poké Ball"
          onClick={
            handlePokeballClick
          }
          style={
            isThrowing ||
            caughtPokemonId
              ? ({
                  "--throw-x":
                    `${throwOffset.x}px`,

                  "--throw-y":
                    `${throwOffset.y}px`
                } as React.CSSProperties)
              : undefined
          }
        />

        {showCaughtDialogue &&
          selectedPokemon && (
            <div
              className="dialogue caught-dialogue"
              onClick={
                handleCaughtDialogueClick
              }
            >
              <p>
                Gotcha!{" "}
                {
                  selectedPokemon.name
                }{" "}
                was caught!
              </p>

              <span className="dialogue-continue">
                Click to continue
              </span>

              <span className="dialogue-next">
                ▼
              </span>
            </div>
          )}

        {activeCardPokemon && (
          <div className="card-overlay">
            <div
              className={`pokemon-card ${
                activeCardPokemon.section ===
                "ACHIEVEMENTS"
                  ? "accomplishments-card"
                  : activeCardPokemon.section ===
                    "EXPERIENCE"
                  ? "experience-card"
                  : ""
              }`}
            >
              <button
                className="card-close"
                onClick={
                  resetPokemonEncounter
                }
              >
                ×
              </button>

              <div className="card-header">
                <span className="card-name">
                  {
                    activeCardPokemon.name.toUpperCase()
                  }
                </span>

                <span className="card-hp">
                  {
                    activeCardPokemon.section
                  }
                </span>
              </div>

              <div className="card-image-area">
                <img
                  src={
                    activeCardPokemon.sprite
                  }
                  alt={
                    activeCardPokemon.name
                  }
                  className="card-pokemon"
                />
              </div>

              {activeCardPokemon.section ===
              "ACHIEVEMENTS" ? (
                <div className="accomplishments-section">
                  <h2>
                    {
                      activeCardPokemon.cardTitle
                    }
                  </h2>

                  <p className="card-subtitle">
                    {
                      activeCardPokemon.cardSubtitle
                    }
                  </p>

                  {[
                    "Case Competition",
                    "Scholarship",
                    "Achievement"
                  ].map(
                    (category) => {
                      const items =
                        activeCardPokemon.accomplishments?.filter(
                          (
                            item
                          ) =>
                            item.category ===
                            category
                        ) ?? [];

                      if (
                        items.length ===
                        0
                      ) {
                        return null;
                      }

                      return (
                        <div
                          className="achievement-group"
                          key={
                            category
                          }
                        >
                          <h3 className="achievement-group-title">
                            {category ===
                            "Case Competition"
                              ? "CASE COMPETITIONS"
                              : category ===
                                "Scholarship"
                              ? "SCHOLARSHIPS"
                              : "ACHIEVEMENTS"}
                          </h3>

                          <div className="achievement-grid">
                            {items.map(
                              (
                                item
                              ) => (
                                <div
                                  className="achievement-card"
                                  key={`${item.title}-${item.year}`}
                                >
                                  <h4>
                                    {
                                      item.title
                                    }
                                  </h4>

                                  <strong className="achievement-result">
                                    {
                                      item.result
                                    }
                                  </strong>

                                  <p className="achievement-meta">
                                    <span className="achievement-organization">
                                      {
                                        item.organization
                                      }
                                    </span>

                                    <span className="achievement-year">
                                      {
                                        item.year
                                      }
                                    </span>
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : activeCardPokemon.section ===
                "EXPERIENCE" ? (
                <div className="experience-section">
                  <h2>
                    {
                      activeCardPokemon.cardTitle
                    }
                  </h2>

                  <p className="card-subtitle">
                    {
                      activeCardPokemon.cardSubtitle
                    }
                  </p>

                  {activeExperience ? (
                    <>
                      <div className="experience-progress">
                        EXPERIENCE{" "}
                        {
                          experienceIndex +
                          1
                        }{" "}
                        /{" "}
                        {
                          activeCardPokemon
                            .experiences
                            ?.length
                        }
                      </div>

                      <div
                        className="experience-entry"
                        key={
                          experienceIndex
                        }
                      >
                        <h3 className="experience-role">
                          {
                            activeExperience.role
                          }
                        </h3>

                        <h4 className="experience-company">
                          {
                            activeExperience.company
                          }
                        </h4>

                        <div className="experience-meta">
                          <span>
                            {
                              activeExperience.date
                            }
                          </span>

                          <span>
                            {
                              activeExperience.location
                            }
                          </span>
                        </div>

                        <p className="experience-description">
                          {
                            activeExperience.description
                          }
                        </p>
                      </div>

                      <div className="experience-controls">
                        <div className="experience-control-slot">
                          {experienceIndex >
                            0 && (
                            <button
                              className="experience-button"
                              onClick={
                                handlePreviousExperience
                              }
                            >
                              ◀ PREV
                            </button>
                          )}
                        </div>

                        <div className="experience-control-slot">
                          {activeCardPokemon.experiences &&
                            experienceIndex <
                              activeCardPokemon
                                .experiences
                                .length -
                                1 && (
                              <button
                                className="experience-button"
                                onClick={
                                  handleNextExperience
                                }
                              >
                                NEXT ▶
                              </button>
                            )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>
                      No experiences added yet.
                    </p>
                  )}
                </div>
              ) : (
                <div className="card-info">
                  <h2>
                    {
                      activeCardPokemon.cardTitle
                    }
                  </h2>

                  <p className="card-subtitle">
                    {
                      activeCardPokemon.cardSubtitle
                    }
                  </p>

                  <p>
                    {
                      activeCardPokemon.description
                    }
                  </p>

                  <div className="card-stats">
                    <span>
                      {
                        activeCardPokemon.statOneLabel
                      }
                    </span>

                    <strong>
                      {
                        activeCardPokemon.statOneValue
                      }
                    </strong>
                  </div>

                  <div className="card-stats">
                    <span>
                      {
                        activeCardPokemon.statTwoLabel
                      }
                    </span>

                    <strong>
                      {
                        activeCardPokemon.statTwoValue
                      }
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {showStartScreen && (
          <div
            className={`start-screen ${
              isStarting
                ? "start-screen-opening"
                : ""
            }`}
          >
            <button
              className={`start-pokeball ${
                isStarting
                  ? "start-pokeball-opening"
                  : ""
              }`}
              onClick={
                handleStartGame
              }
              aria-label="Enter portfolio"
            >
              <img
                src={pokeball}
                alt=""
              />
            </button>

            {!isStarting && (
              <div className="start-instruction">
                CLICK THE POKE BALL

                <span>
                  TO START
                </span>
              </div>
            )}

            {isStarting && (
              <div className="start-flash" />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;