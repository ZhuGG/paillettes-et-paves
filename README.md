# Ça va déborder — Paillettes & Pavés

Version 0.4. Jeu autonome pour GitHub Pages. Le jeu remplace le site précédent sur GitHub ; le dossier local historique du site est conservé. Cette version remplace les trois mécaniques du premier prototype et reprend la palette officielle : rose `#f62ca5`, jaune `#f4ff40`, noir `#161616`, papier `#fffefa`, avec Aileron et les véritables visuels de la compagnie.

## Trois gestes, trois jeux

- **Retour de bâton** : la marionnette fait raquette. Le pouce déplace horizontalement les ficelles et incline les bras verticalement. Renvoyer les bobards dans les porte-voix.
- **Micro fronde** : maintenir pour mettre le micro en rotation, relâcher pour le lancer selon sa tangente. Le tracé en pointillés aide à viser. Une nouvelle bouche mise en voix enrichit l’accord musical. Viser la bouche rose rapporte davantage et passe la priorité à une autre voix.
- **Pavé pendule** : le pouce incline le plateau sur deux axes ; un pavé roule et rebondit. Dévisser quatre attaches fait tomber le pupitre. Les trous renvoient le pavé au départ. Relâcher remet le plateau à niveau.

Une partie complète contient trois manches de 25 secondes, suivies d’un rappel interactif. Le public en pixels progresse avec les réussites et reste acquis entre les manches ; il ne représente pas une fréquentation réelle. Les trois boutons permettent aussi de jouer un seul numéro. Les ratés interrompent les combos ; ils ne coupent pas la manche. Le meilleur score est enregistré localement. Les renvois peuvent déclencher une réaction en chaîne, chaque micro peut rebondir une fois, et les trois voix débloquent un chœur. Le pupitre bascule visuellement quand ses quatre attaches sont retirées.

## Smartphone

L’application occupe la hauteur visible (`100dvh`) avec les marges de sécurité des téléphones. La zone sous le pouce ne recouvre pas la scène. Aucun gyroscope ni permission n’est demandé. Pointer Events, capture du pointeur et annulation de geste empêchent un lâcher interrompu de lancer le micro par erreur. La perte de focus ou le passage en arrière-plan met en pause. Un écran de règle précède chaque numéro.

Sur ordinateur : flèches sur deux axes, espace maintenu puis relâché pour la fronde, P / Échap pour la pause. Le bouton son coupe musique et effets. Aucune requête vers un service tiers, aucun compte, aucune télémétrie. Record et préférence sonore sont stockés uniquement dans le navigateur, avec repli si ce stockage est indisponible.


## Dates, adhésion et partage

`agenda.json` contient les dates et les liens publics. Il reprend les événements publiés de l’agenda éditorial P&P. Les dates passées, brouillons et dates invalides sont filtrés à l’affichage selon le jour à Paris. Les rendez-vous restent accessibles depuis l’accueil, pendant la partie (qui se met en pause) et après le rappel. Le lien vers le lieu donne les informations pratiques ; un horaire manquant reste manquant.

Le 16 novembre 2026, les dates des Rancy ont été vérifiées sur [la page du lieu](https://www.lesrancy.fr/evenements/paillettes-et-paves/), et les 7 et 21 avril à 20 h sur [la page du Guignol](https://www.theatreleguignoldelyon.fr/paillettesetpav%C3%A9s-th%C3%A9%C3%A2treleguignoldelyon). Le 12 décembre à Blast art provient de l’agenda P&P ; ses modalités restent à venir.

Le lien [Adhérer sur HelloAsso](https://www.helloasso.com/associations/la-compagnie-monstre/adhesions/adhesion-la-compagnie-monstre), retrouvé sur la page publique de liens P&P, a été ouvert et vérifié : il s’agit de l’adhésion à La Compagnie Monstre. Le jeu ouvre cette page externe sans traiter de paiement et sans collecter de données.

Le bilan propose une affiche PNG créée localement avec les sprites, le résultat et la prochaine date à jour. Le partage passe par la feuille native du téléphone quand elle est disponible ; sinon le lien est copié. Le téléchargement de l’affiche reste disponible. Aucun partage n’est lancé sans action sur le bouton.

Le propos s’appuie sur les textes du projet et se retrouve dans les gestes : répondre à un monologue, donner le micro à plusieurs voix, ouvrir le plateau. Les boutons nomment leur action : voir les dates, adhérer, partager ou rejouer.

## Développer et vérifier

Node.js 24. Installer les dépendances de préparation, puis vérifier et construire :

```sh
npm ci --no-audit --no-fund
npm run check
npm test
npm run build
npm start
```

Après construction, `npm start` sert `dist/` uniquement sur cet ordinateur : http://127.0.0.1:4185/. Pour un contrôle sous préfixe, servir la racine du projet et ouvrir `/dist/`. Le module 3D est également préparé dans `3d/` pour ce mode de travail. Sur téléphone, utiliser l’adresse publique GitHub Pages. Arrêt du serveur local : Ctrl+C.

Le moteur physique est dans `core.mjs`, indépendant de l’affichage. Les tests couvrent tangente et annulation de lancer, partage des voix, rebonds, stabilité à 60/120 Hz, trous, dévissage, enchaînement des manches et gestes aléatoires. Des tests supplémentaires couvrent la propagation des répliques, le chœur, le ricochet, les brouillons et l’expiration des dates. Rendu Canvas 320 × 400, textures en mémoire à faible résolution, décor précalculé, sous-pas physiques à 120 Hz, particules plafonnées. La boucle graphique s’arrête hors partie. Le budget hors audio est plafonné à 750 000 octets par la construction ; la musique a son propre plafond de 3 500 000 octets et se charge après une action de jeu, avec `preload="none"`.

## GitHub Pages

Le jeu remplace le site dans le dépôt `ZhuGG/paillettes-et-paves`, à la demande du propriétaire. Le dossier local historique du site est conservé séparément. Tous les chemins publics sont relatifs : le même export fonctionne à la racine ou sous `/nom-du-depot/`.

1. Placer le contenu de ce dossier, y compris `.github/`, dans le dépôt retenu, branche `main`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Le workflow vérifie le JavaScript, exécute les tests et construit `dist/`, puis publie cet export. Il peut aussi être déclenché manuellement depuis Actions.

La procédure suit la [documentation officielle GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). URL prévue après publication et vérification : https://zhugg.github.io/paillettes-et-paves/. L’historique antérieur au remplacement reste accessible dans Git.

## Visuels et droits

Le logo officiel est conservé. Les huit sprites de Marcel et Zaza et le castelet ont été générés avec l’outil imagegen intégré à partir des références P&P, puis préparés à résolution de jeu en WebP sans perte. Quatre poses sont disponibles par personnage (repos, gauche, droite, joie). Le rendu utilise une grille fixe et un échantillonnage au plus proche voisin. Les originaux haute résolution et les consignes artistiques sont conservés localement dans `art-source/`, hors export public. Aileron et sa licence sont dans `assets/`. Les visuels de la compagnie ne sont pas placés sous licence libre par ce prototype. Les noms des jeux et leurs règles sont des propositions à éprouver avec la troupe.

## Musique

`audio/clumsy-theme.mp3` est la musique récupérée, sans modification, depuis `ZhuGG/ClumsyPP`, à la demande du propriétaire. La provenance et le crédit d’origine sont conservés dans `audio/README.md`. La piste joue pendant les manches et le rappel, et se suspend avec la pause, le retour au menu ou la sourdine. Les bruitages synthétiques restent disponibles si la musique ne peut pas être lue.

## Rendu Three.js

`three-stage.mjs` construit un castelet en volume (cadre, étoiles, projecteurs) et le plateau du troisième numéro : sol, trous, rebonds, vis, pupitre et pavé sont des objets 3D. Tous les objets du plateau partagent sa transformation pour que l’inclinaison reste cohérente avec les positions de la physique. Le rendu 3D et les sprites 2D sont superposés sans lecture GPU vers le Canvas 2D.

Three.js 0.187.0 est préparé avec esbuild dans `dist/3d/theatre.js`, sans CDN. Le module est chargé à l’entrée dans un numéro et les matériaux sont compilés pendant l’écran de règle. Résolution GPU fixe de 320 × 400, ratio de pixels 1, aucun anticrénelage ni ombres calculées. Les animations décoratives suivent la préférence de mouvement réduit. Sans contexte WebGL2, le jeu conserve son rendu 2D ; une perte de contexte revient également au rendu 2D.

Le budget 3D différé est séparé : 2 000 000 octets maximum. Le budget initial de 750 000 octets exclut ce module et la musique, qui se chargent sur action. La licence officielle Three.js accompagne le module construit ; elle ne change pas les droits des visuels P&P.
