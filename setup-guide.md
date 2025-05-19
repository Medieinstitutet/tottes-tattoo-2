# Installationsguide för Tottes Tattoo

## Förutsättningar

- Node.js (version 18 eller senare)
- npm (kommer med Node.js)
- Git
- MongoDB (installerad lokalt)

## Steg-för-steg installation

### 1. Gå in i rot mappen

```bash
cd totte-tattoo-2
```

### 2. Installera beroenden

```bash
# Installera alla beroenden för både frontend och backend
npm install

# Om du får problem med Rollup-beroenden, kör dessa kommandon:
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm install
```

### 3. Konfigurera miljövariabler

Skapa en `.env`-fil i backend-mappen med följande innehåll:

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/tottes-tattoo
```

### 4. Starta MongoDB

Se till att MongoDB är igång på din dator:

```bash
# På Ubuntu/Debian
sudo service mongodb start

# På macOS (om installerad via Homebrew)
brew services start mongodb-community
```

### 5. Starta utvecklingsservern

```bash
# Starta både frontend och backend samtidigt
npm run dev

# Eller starta dem separat:
# Frontend (i frontend-mappen)
cd frontend
npm run dev

# Backend (i backend-mappen)
cd backend
npm run dev
```

### 6. Åtkomst till applikationen

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Vanliga problem och lösningar

### Om frontend inte startar

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Om backend inte startar

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Om MongoDB inte fungerar

1. Kontrollera att MongoDB är installerat
2. Kontrollera att MongoDB-tjänsten körs
3. Verifiera att port 27017 är tillgänglig

## Utvecklingsverktyg

- Frontend: React med Vite
- Backend: Node.js med Express
- Databas: MongoDB
- Styling: Styled Components
