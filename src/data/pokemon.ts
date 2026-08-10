import eevee from "../assets/pokemon/eevee.png";
import squirtle from "../assets/pokemon/squirtle.png";
import charizard from "../assets/pokemon/charizard.png";
import snorlax from "../assets/pokemon/snorlax.png";

export interface Accomplishment {
  title: string;
  result: string;
  organization: string;
  year: string;
  category:
    | "Case Competition"
    | "Scholarship"
    | "Achievement";
}

export interface PokemonData {
  id: string;
  name: string;
  section: string;

  sprite: string;

  x: number;
  y: number;
  width: number;

  enterFrom: "left" | "right" | "top" | "bottom";

  cardTitle: string;
  cardSubtitle: string;
  description: string;

  statOneLabel: string;
  statOneValue: string;

  statTwoLabel: string;
  statTwoValue: string;

  accomplishments?: Accomplishment[];
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
      "I love building projects that let me experiment with new technologies and give me freedom to explore creative possibilities. Most of my projects work with TypeScript, React, and CSS.",

    statOneLabel: "Current Build",
    statOneValue: "Pokémon Portfolio",

    statTwoLabel: "Also Building",
    statTwoValue: "Multiplayer Wordle"
  },

  {
    id: "charizard",
    name: "Charizard",
    section: "EXPERIENCE",

    sprite: charizard,

    x: 58,
    y: 18,
    width: 125,

    enterFrom: "top",

    cardTitle: "Experience",

    cardSubtitle:
      "A look at the experiences that have shaped my skills",

    description:
      "Explore my professional and extracurricular experiences across data, software development, collaboration, and leadership.",

    statOneLabel: "Current Level",
    statOneValue: "Data + Software",

    statTwoLabel: "Strengths",
    statTwoValue: "Technical / Collaborative"
  },

  {
    id: "snorlax",
    name: "Snorlax",
    section: "ACCOMPLISHMENTS",

    sprite: snorlax,

    x: 30,
    y: 18,
    width: 110,

    enterFrom: "top",

    cardTitle: "Accomplishments",

    cardSubtitle:
      "Awards, competitions, certificates, and milestones",

    description:
      "A collection of achievements from my academic, professional, and extracurricular experiences.",

    statOneLabel: "Focus",
    statOneValue: "Growth",

    statTwoLabel: "Category",
    statTwoValue: "Achievements",

    accomplishments: [
  {
    title: "Duolingo Case Competition",
    result: "1st Place out of 50+ Teams",
    organization: "Xlerate Laurier",
    year: "January 2026",
    category: "Case Competition"
  },

  {
    title: "Laurier Consulting Club Case Competition",
    result: "Top 5 out of 60+ Teams",
    organization: "Laurier Consulting Club",
    year: "March 2026",
    category: "Case Competition"
  },

  {
    title: "President's Entrance Scholarship",
    result: "$4,000",
    organization: "Wilfrid Laurier University",
    year: "2025",
    category: "Scholarship"
  },

  {
    title: "Equifax Canada Scholarship",
    result: "$6,000",
    organization: "Equifax Canada",
    year: "2025",
    category: "Scholarship"
  },

  {
    title: "Principal's List",
    result: "Academic Recognition: Top 10 Students in Grade 11",
    organization: "St. Robert Catholic High School",
    year: "2025",
    category: "Achievement"
  },

  {
    title: "International Baccalaureate Diploma",
    result: "44/45, with 7's in HL Math, HL Physics, HL Chemistry, SL English, SL French, and SL History",
    organization: "St. Robert Catholic High School",
    year: "2025",
    category: "Achievement"
  }
  
    ]
  }
];