import eevee from "../assets/pokemon/eevee.png";
import squirtle from "../assets/pokemon/squirtle.png";

export interface PokemonData {
  id: string;
  name: string;
  section: string;

  sprite: string;

  x: number;
  y: number;
  width: number;

  enterFrom: "left" | "right";

  cardTitle: string;
  cardSubtitle: string;
  description: string;

  statOneLabel: string;
  statOneValue: string;

  statTwoLabel: string;
  statTwoValue: string;
}

export const pokemonList: PokemonData[] = [
  {
    id: "eevee",
    name: "Eevee",
    section: "ABOUT ME",

    sprite: eevee,

    x: 68,
    y: 48,
    width: 110,

    enterFrom: "right",

    cardTitle: "Crystal Chen",

    cardSubtitle:
      "Computer Science + Business Administration Student",

    description:
      "Welcome! I'm Crystal, a curious and creative individual who loves learning new things and exploring different fields. I'm particularly interested in software development, quantitative analysis, and design. I enjoy tackling challenges and finding innovative solutions!",

    statOneLabel: "Type",
    statOneValue: "Analytical / Ambitious",

    statTwoLabel: "Current Quest",
    statTwoValue: "Finding the best matcha spot in GTA"
  },

  {
    id: "squirtle",
    name: "Squirtle",
    section: "PROJECTS",

    sprite: squirtle,

    x: 27,
    y: 47,
    width: 120,

    enterFrom: "left",

    cardTitle: "Current Projects",

    cardSubtitle:
      "Things I'm currently building and experimenting with:",

    description:
      "I love building projects that let me experiment with new technologies and gives me freedom to explore creative possibilities. Most of my projects work with TypeScript, React, and CSS.",

    statOneLabel: "Current Build",
    statOneValue: "Pokémon Portfolio",

    statTwoLabel: "Also Building",
    statTwoValue: "Multiplayer Wordle"
  }
];