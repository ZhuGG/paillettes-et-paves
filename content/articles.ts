import { readFileSync } from "node:fs";
import { join } from "node:path";
const season = readFileSync(join(process.cwd(), "content/articles/saison-presidentielle.md"), "utf8");
const origins = readFileSync(join(process.cwd(), "content/articles/naissance-du-cabaret.md"), "utf8");
export const articles = [
  { slug: "saison-presidentielle-2026-2027", category: "Saison 2026–2027", title: "On remet les pavés dans le cabaret.", excerpt: "Une campagne présidentielle, des marionnettes et une furieuse envie de faire collectif.", image: "cabaret", alt: "Les marionnettes sur le castelet éclairé du cabaret", body: season, reading: "2 min" },
  { slug: "naissance-du-cabaret", category: "Dans les coulisses", title: "Au départ, une envie de faire du bruit.", excerpt: "De la première saison municipale à aujourd’hui : comment est né Paillettes & Pavés.", image: "collectif", alt: "L’équipe du spectacle, les bras levés devant le public", body: origins, reading: "2 min" },
];
