# Catalogue privé — projet prêt à publier

## Fonctionnement
- Accès public protégé par un code.
- Catalogue sans panier, commande ni paiement.
- Affichage du nom, prix et stock.
- Interface d'administration locale pour modifier les produits.
- Les données sont stockées dans le navigateur via `localStorage`.

## Codes de démonstration
- Code d'accès : `2026`
- Code administrateur : `admin2026`

**À modifier avant publication** dans `app.js` :
```js
const ACCESS_CODE = "2026";
const ADMIN_CODE = "admin2026";
```

## Publication gratuite avec GitHub Pages
1. Crée un compte sur GitHub.
2. Crée un nouveau dépôt, par exemple `catalogue-prive`.
3. Ajoute `index.html`, `style.css`, `app.js` et `README.md`.
4. Dans le dépôt : Settings → Pages.
5. Choisis la branche `main` et le dossier `/root`.
6. Enregistre.
7. GitHub fournira une adresse publique en `github.io`.

## Important
Ce projet utilise un code d'accès côté navigateur : ce n'est pas une protection forte. Pour des informations réellement privées, utilise une authentification côté serveur ou un service de protection d'accès.
