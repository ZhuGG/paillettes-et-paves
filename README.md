# Ça va rouler ! — Paillettes & Pavés

Première version jouable de la refonte kart, 18 novembre 2026. Une seule course de quartier en 3D avec Marcel ou Zaza, cinq adversaires, trois tours, dérapages, relances, bandes d’accélération et deux bonus. L’accueil et l’arrivée présentent les prochaines dates et l’adhésion HelloAsso.

## Jouer

L’accélération est automatique. Dans la zone de direction en bas à gauche : toucher sa moitié gauche pour aller à gauche, sa moitié droite pour aller à droite. Le centre est neutre, relâcher recentre la commande. Maintenir le bouton DÉRAPAGE en tournant, puis le relâcher pour obtenir une relance. Les boîtes jaunes donnent une poussée ou des paillettes qui ralentissent les concurrents proches devant soi. Toucher le bouton bonus pour l’utiliser. Sortir sur les bas-côtés ralentit le kart.

Clavier : flèches gauche/droite ou Q/D (A/D également), Espace pour déraper, Entrée/B pour le bonus, P/Échap pour la pause. Le changement d’onglet met la course en pause. Reprendre demande une action explicite. Son désactivé au premier lancement ; la préférence et le meilleur temps sont conservés localement.

## Développement

Node.js 24. `npm ci`, `npm run check`, `npm test`, `npm run build`, puis `npm start`. L’export statique est dans `dist/`, le serveur local à `http://127.0.0.1:4185/`. Les chemins relatifs conviennent au sous-dossier GitHub Pages. Le workflow existant publie `main` sur https://zhugg.github.io/paillettes-et-paves/.

- `kart-core.mjs` : circuit fermé, conduite, dérapage, relances, adversaires, bonus et classement ; indépendant du rendu.
- `kart-scene.mjs` : scène Three.js, caméra derrière le kart, quartier, piste, signalétique et concurrents. Le build produit `3d/kart.js` avec Three.js 0.187.0, sans CDN.
- `kart-ui.js`, `kart.css`, `index.html` : accueil, tactile, clavier, pause, résultat et promotion.
- `agenda.json` et `agenda.mjs` : données éditoriales reprises, filtrage des brouillons et dates expirées à Paris. Les horaires manquants ne sont pas inventés.

WebGL 2 est nécessaire. Sans contexte graphique ou en cas de perte du contexte, un écran explique comment réessayer et laisse accès aux dates. Aucun moteur 2D de substitution pour cette refonte. Ombres peintes, décor en instances, anticrénelage désactivé, résolution GPU plafonnée et rendu pixelisé. Les effets décoratifs sont réduits selon la préférence système. Audio avec `preload="none"`, chargé seulement si le son est activé pendant une course.

## Validation et limites

Tests du circuit fermé, décompte, annulation des entrées, conduite et relance, inventaire, tours, stabilité à 60/120 Hz et remise à zéro ; tests d’agenda conservés. Contrôle de syntaxe et export statique. Les essais visuels, le confort tactile sur appareil réel et l’équilibrage du pilotage sont laissés au propriétaire à sa demande. Cette première version ne prétend pas à la finition d’un jeu commercial.

## Ressources et versions précédentes

Palette officielle : rose `#f62ca5`, jaune `#f4ff40`, noir `#161616`, papier `#fffefa`. Logo, Aileron et sprites P&P réutilisés. Le décor et les karts sont construits en géométrie originale ; aucun élément de Mario Kart n’est repris. Les sprites ont été créés pour le prototype précédent à partir des références de la compagnie. Les visuels P&P ne sont pas placés sous licence libre.

La musique provient de `ZhuGG/ClumsyPP`, à la demande du propriétaire ; sa provenance est conservée dans `audio/README.md`. Aileron et Three.js gardent leurs licences propres.

Les anciens jeux restent dans l’historique Git ; leurs sources historiques ne font pas partie de l’export. Le brouillon non publié « Service minimum » a été sauvegardé à côté du dépôt dans `../archives-prototypes/avant-kart-2026-11-18/`. Le dossier local de l’ancien site reste conservé séparément dans `../../site/`.

### Mise à jour 1.1.0

Commande tactile absolue, indépendante du point de contact initial, avec la même convention gauche/droite que le clavier. Atlas pixel art spécifique à la course : dos, trois quarts arrière gauche/droite et face ; la vue est choisie selon la position de la caméra par rapport au kart. Les panneaux du circuit affichent jusqu’à six dates à venir, lieu et ville, issus de l’agenda filtré. Les anciens sprites et le castelet ne sont plus expédiés dans l’export. Source et prompt de génération : `docs/art/DRIVERS-KART-V2.md`. Les tests sur téléphone restent à effectuer par le propriétaire.
