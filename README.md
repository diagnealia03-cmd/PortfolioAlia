# Portfolio Alia DIAGNE

Portfolio full-stack pour une informaticienne, construit avec React, Express et MongoDB.

## Installation

```bash
npm install
```

## Configuration MongoDB Atlas

Créez un fichier `backend/.env` à partir de `backend/.env.example`.

```bash
PORT=5000
MONGODB_URI=mongodb+srv://REMPLACE_USER:REMPLACE_PASSWORD@REMPLACE_CLUSTER.mongodb.net/portfolio_alia?retryWrites=true&w=majority&appName=PortfolioAlia
CLIENT_URL=http://localhost:5173
```

Remplacez:

- `REMPLACE_USER` par l'utilisateur Atlas.
- `REMPLACE_PASSWORD` par le mot de passe Atlas.
- `REMPLACE_CLUSTER.mongodb.net` par l'adresse du cluster.

Si le mot de passe contient `@`, `#`, `/`, `?`, `:` ou un espace, encodez-le dans l'URI.

Pour revenir à MongoDB local, copiez le contenu de `backend/.env.local.example` dans `backend/.env`.

## Photo

La photo principale est utilisée depuis `frontend/images/Alia.jpeg`.

## Données de démonstration

Après avoir configuré Atlas:

```bash
npm run seed
```

## Lancement

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/messages`
