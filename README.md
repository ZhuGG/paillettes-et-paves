# Paillettes & Pavés

Maquette éditoriale du cabaret de La Compagnie Monstre, saison 2026–2027.

## Développement et publication

Node.js 24. Installer avec `npm ci`.

- `npm run dev` : développement avec Vinext.
- `npm run build:pages` : export HTML avec Next.js pour GitHub Pages, dans `out/`.
- `npm run check` : vérification TypeScript.

L’export Next.js est utilisé car l’export Vinext du socle présentait des erreurs de pré-rendu sur les routes du projet. Les composants React et les contenus sont communs.

La publication GitHub Pages est automatique lors d’un push sur `main`. Le site utilise le sous-chemin `/paillettes-et-paves` configuré dans `next.config.ts` et `lib/site.ts`.

## Mettre à jour

- Dates : `content/events.ts`. Dates ISO sans heure ; horaires seulement lorsqu’ils sont connus. Le classement à venir/passé se met à jour selon la date de Paris dans le navigateur.
- Équipe et partenaires : `content/company.ts`.
- Actualités : textes dans `content/articles/*.md`, métadonnées dans `content/articles.ts`. Le rendu Markdown couvre les paragraphes et titres de niveau 2 utilisés par ces articles.
- Charte et animations : `app/globals.css`.
- Visuels et polices : `public/images` et `public/fonts`.

Les visuels proviennent du dossier fourni pour ce projet. Les droits sur les photographies, logos et textes restent ceux de leurs titulaires ; ce dépôt ne leur accorde aucune licence de réutilisation. Les polices Anton et Source Sans 3 sont distribuées sous licence SIL Open Font License ; leurs licences sont conservées dans `public/fonts`.

## Périmètre éditorial

Les dates publiées proviennent de la page des Rancy : https://www.lesrancy.fr/evenements/paillettes-et-paves/

Les rôles de la distribution sont précisés sur la page du Guignol : https://www.theatreleguignoldelyon.fr/paillettesetpav%C3%A9s-th%C3%A9%C3%A2treleguignoldelyon

La brochure complète et les tarifs de cession ne sont pas inclus dans le dépôt ni dans le site. Les nouveaux formats restent présentés comme en préparation. Aucun compte, commentaire, formulaire ou suivi statistique. La maquette porte une directive noindex ; celle-ci sera retirée lors du lancement officiel.
