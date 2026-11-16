# Ça va déborder — Paillettes & Pavés

Version 0.3. Jeu autonome pour GitHub Pages. Le jeu remplace le site précédent sur GitHub ; le dossier local historique du site est conservé. Cette version remplace les trois mécaniques du premier prototype et reprend la palette officielle : rose `#f62ca5`, jaune `#f4ff40`, noir `#161616`, papier `#fffefa`, avec Aileron et les véritables visuels de la compagnie.

## Trois gestes, trois jeux

- **Retour de bâton** : la marionnette fait raquette. Le pouce déplace horizontalement les ficelles et incline les bras verticalement. Renvoyer les bobards dans les porte-voix.
- **Micro fronde** : maintenir pour mettre le micro en rotation, relâcher pour le lancer selon sa tangente. Le tracé en pointillés aide à viser. Une nouvelle bouche mise en voix enrichit l’accord musical. Viser la bouche rose rapporte davantage et passe la priorité à une autre voix.
- **Pavé pendule** : le pouce incline le plateau sur deux axes ; un pavé roule et rebondit. Dévisser quatre attaches fait tomber le pupitre. Les trous renvoient le pavé au départ. Relâcher remet le plateau à niveau.

Une partie complète contient trois manches de 25 secondes. Les trois boutons permettent aussi de jouer un seul numéro. Les ratés interrompent les combos ; ils ne coupent pas la manche. Le meilleur score de cette version est distinct de celui du premier prototype.

## Smartphone

L’application occupe la hauteur visible (`100dvh`) avec les marges de sécurité des téléphones. La zone sous le pouce ne recouvre pas la scène. Aucun gyroscope ni permission n’est demandé. Pointer Events, capture du pointeur et annulation de geste empêchent un lâcher interrompu de lancer le micro par erreur. La perte de focus ou le passage en arrière-plan met en pause. Un écran de règle précède chaque numéro.

Sur ordinateur : flèches sur deux axes, espace maintenu puis relâché pour la fronde, P / Échap pour la pause. Le bouton son coupe musique et effets. Aucune requête vers un service tiers, aucun compte, aucune télémétrie. Record et préférence sonore sont stockés uniquement dans le navigateur, avec repli si ce stockage est indisponible.

## Développer et vérifier

Node.js 24, sans paquet à installer :

```sh
npm run check
npm test
npm run build
npm start
```

Ouvrir http://127.0.0.1:4185/ pour les sources, ou http://127.0.0.1:4185/dist/ pour contrôler l’export sous un préfixe, comme sur GitHub Pages. Sur un téléphone du même Wi-Fi, remplacer `127.0.0.1` par l’IP locale du PC ; le serveur et le pare-feu doivent permettre la connexion. Arrêt du serveur : Ctrl+C.

Le moteur physique est dans `core.mjs`, indépendant de l’affichage. Les tests couvrent tangente et annulation de lancer, partage des voix, rebonds, stabilité à 60/120 Hz, trous, dévissage, enchaînement des manches et gestes aléatoires. Rendu Canvas 320 × 400, textures en mémoire à faible résolution, décor précalculé, sous-pas physiques à 120 Hz, particules plafonnées. La boucle graphique s’arrête hors partie. Le budget de l’export complet est plafonné à 750 000 octets par le script de construction.

## GitHub Pages

Le jeu remplace le site dans le dépôt `ZhuGG/paillettes-et-paves`, à la demande du propriétaire. Le dossier local historique du site est conservé séparément. Tous les chemins publics sont relatifs : le même export fonctionne à la racine ou sous `/nom-du-depot/`.

1. Placer le contenu de ce dossier, y compris `.github/`, dans le dépôt retenu, branche `main`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Le workflow vérifie le JavaScript, exécute les tests et construit `dist/`, puis publie cet export. Il peut aussi être déclenché manuellement depuis Actions.

La procédure suit la [documentation officielle GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). URL prévue après publication et vérification : https://zhugg.github.io/paillettes-et-paves/. L’historique antérieur au remplacement reste accessible dans Git.

## Visuels et droits

Le logo officiel est conservé. Les huit sprites de Marcel et Zaza et le castelet ont été générés avec l’outil imagegen intégré à partir des références P&P, puis préparés à résolution de jeu en WebP sans perte. Quatre poses sont disponibles par personnage (repos, gauche, droite, joie). Le rendu utilise une grille fixe et un échantillonnage au plus proche voisin. Les originaux haute résolution et les consignes artistiques sont conservés localement dans `art-source/`, hors export public. Aileron et sa licence sont dans `assets/`. Les visuels de la compagnie ne sont pas placés sous licence libre par ce prototype. Les noms des jeux et leurs règles sont des propositions à éprouver avec la troupe.
