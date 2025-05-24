# Tottes Tattoo

En webbapplikation för tatueringsstudion Tottes Tattoo i Kungälv som möjliggör online-bokning av tatueringar och konsultationer.

## Projektbeskrivning

Detta projekt skapades som ett grupparbete för att bygga en komplett fullstack-webbapplikation (frontend + backend). Målet var att skapa en bokningsplattform för en tatueringsstudio där kunder kan:

- Se tillgängliga tider under vardagar (09:00-18:00, lunchstängt 12:00-13:00)
- Boka tider för tatueringar eller konsultationer
- Ladda upp referensbilder för tatueringar
- Välja mellan olika tatuerare
- Boka sessioner av olika längder (normalt 1-2 timmar men längre pass är möjliga)

Designen speglar Tottes konstnärliga inriktning på fantasy-motiv med hög detaljrikedom.

## Hur projektet uppfyller kraven

- **Bokningshantering:** Frontend visar tydligt lediga tider och datum för alla tatuerare
- **Bifogade bilder:** Kunder kan ladda upp referensbilder för önskade tatueringar
- **Flexibla bokningar:** Stöder bokningar av olika längd (1-2 timmar standardtid, med möjlighet till längre pass)
- **Administratörspanel:** Tatuerare kan se och hantera bokningar
- **Fantasy-tema:** Designen avspeglar studions inriktning på fantasy-motiv
- **Backend API:** Följer REST-principer och MVC-mönster med ES6-moduler
- **Frontend:** Byggd med React, styled-components och en modern, estetisk design

## Installation och körning

### Förutsättningar

- Node.js (version 18 eller senare)
- npm (kommer med Node.js)
- MongoDB (installerad lokalt)

### Steg-för-steg installation

1. Klona repot och navigera till projektmappen:

```bash
cd tottes-tattoo-2
```

2. Installera beroenden:

```bash
# Installera alla beroenden för både frontend och backend
npm install

# Om du får problem med beroenden, prova:
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm install
```

3. Konfigurera backend:

   - Skapa filen `settings.env` i mappen `backend/config` med följande innehåll:

   ```
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/tottes-tattoo
   ```

4. Starta MongoDB:

```bash
# På Ubuntu/Debian
sudo service mongodb start

# På macOS (om installerad via Homebrew)
brew services start mongodb-community
```

5. Starta utvecklingsservern:

```bash
# Starta både frontend och backend samtidigt
npm run dev

# Eller starta dem separat:
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

6. Åtkomst till applikationen:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Admininloggning

För att komma åt administratörspanelen, använd:

- Användarnamn: `employee`
- Lösenord: `password123`

## Teammedlemmar

### Backend-team:

- Rain
- Arwin
- Jihi
- David

### Frontend-team:

- Lotiz
- Rita
- Zoher
- Niklas

## Teknologier

- **Frontend:** React, Vite, Styled Components
- **Backend:** Node.js, Express
- **Databas:** MongoDB
- **Filuppladdning:** Multer

## Felsökning

### Om frontend inte startar:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Om backend inte startar:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Om MongoDB inte fungerar:

1. Kontrollera att MongoDB är installerat
2. Kontrollera att MongoDB-tjänsten körs
3. Verifiera att port 27017 är tillgänglig
