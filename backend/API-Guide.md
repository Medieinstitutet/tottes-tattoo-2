# Hur man använder

Starta servern: npm run dev

# Bokningsflöde

För att skapa en bokning, följ dessa steg:

1. Kontrollera tillgängliga tider för ett datum:
   ```
   GET /api/v1/bookings/available-slots?date=2025-05-18
   ```
   Returnerar array av lediga tider: ["09:00", "10:00", ...]

2. Kontrollera tillgängliga tatuerare för vald tid:
   ```
   GET /api/v1/bookings/available-tattooers?date=2025-05-18&time=09:00&duration=60
   ```
   Returnerar array av lediga tatuerare: ["Erik", "Totte", ...]

3. Skapa bokningen:
   ```
   POST /api/v1/bookings
   Content-Type: multipart/form-data
   
   Body:
   - name: string (required)
   - email: string (required)
   - date: YYYY-MM-DD (required)
   - time: HH:mm (required)
   - duration: number (required, minuter)
   - type: string (required)
   - file: File (required)
   - tattooer: string (required)
   - additionalInfo: string (optional)
   ```

# Endpoints

## Bokningar (Bookings)

### GET /api/v1/bookings
- Hämta alla bokningar
- Response: Array av bokningar

### GET /api/v1/bookings/:id
- Hämta specifik bokning
- Response: Enskild bokning

### POST /api/v1/bookings
- Skapa ny bokning
- Body: Se bokningsflöde ovan
- Response: 
  ```json
  {
    "success": true,
    "message": "Booking saved.",
    "tattooer": "string"
  }
  ```

### GET /api/v1/bookings/available-slots
- Hämta lediga tider för ett datum
- Query: date (YYYY-MM-DD)
- Response: Array av lediga tider

### GET /api/v1/bookings/available-tattooers
- Hämta tillgängliga tatuerare för en tid
- Query: 
  - date (YYYY-MM-DD)
  - time (HH:mm)
  - duration (minuter)
- Response: Array av tillgängliga tatuerare

### DELETE /api/v1/bookings/:id
- Ta bort en bokning
- Response:
  ```json
  {
    "success": true,
    "message": "Bokning borttagen",
    "data": { bokning }
  }
  ```

### PUT /api/v1/bookings/:id
- Uppdatera en bokning
- Body: Valfria fält att uppdatera
- Response:
  ```json
  {
    "success": true,
    "message": "Bokning uppdaterad",
    "data": { bokning }
  }
  ```

# Validering

- Datum måste vara i formatet YYYY-MM-DD
- Tid måste vara i formatet HH:mm
- Bokningar endast tillgängliga måndag-fredag
- Bokningar mellan 09:00-18:00 (ej 12:00-13:00 lunch)
- Duration mellan 60-480 minuter
- Bokning kan inte gå över stängningstid (18:00)
- Email måste vara giltigt format
- Bildfil krävs vid bokning

# Exempel på användning (Frontend)

```javascript
// 1. Kolla lediga tider
const date = '2025-05-18';
const availableSlots = await fetch(`/api/v1/bookings/available-slots?date=${date}`);
const times = await availableSlots.json();

// 2. Kolla lediga tatuerare för vald tid
const time = '09:00';
const duration = '60';
const availableTattooers = await fetch(`/api/v1/bookings/available-tattooers?date=${date}&time=${time}&duration=${duration}`);
const tattooers = await availableTattooers.json();

// 3. Skapa bokning
const formData = new FormData();
formData.append('name', 'Kund Kundsson');
formData.append('email', 'kund@email.se');
formData.append('date', date);
formData.append('time', time);
formData.append('duration', duration);
formData.append('type', 'tattoo');
formData.append('file', imageFile);
formData.append('tattooer', tattooers[0]);
formData.append('additionalInfo', 'Extra information');

const response = await fetch('/api/v1/bookings', {
  method: 'POST',
  body: formData
});
```

# Artists (Tatuerare)

GET http://localhost:3000/api/v1/artists

- Hämta alla tatuerare

POST http://localhost:3000/api/v1/artists

- Skapa ny tatuerare
  Body (JSON):
  {
  "name": "Totte",
  "specialty": "Fantasy",
  "description": "Expert på detaljerade fantasy-tatueringar"
  }

GET http://localhost:3000/api/v1/artists/:id

- Hämta specifik tatuerare (ersätt :id med faktiskt ID)

PUT http://localhost:3000/api/v1/artists/:id

- Uppdatera tatuerare
  Body (JSON):
  {
  "name": "Totte",
  "specialty": "Fantasy & Realism",
  "description": "Uppdaterad beskrivning"
  }

DELETE http://localhost:3000/api/v1/artists/:id

- Ta bort tatuerare

# Filuppladdning

POST http://localhost:3000/api/v1/bookings/:id/upload

- Ladda upp designbild för bokning
  Body (form-data):
- file: [välj fil]

# Testa i Postman

- Skapa en ny Collection
- Lägg till en Environment med variabeln baseUrl = http://localhost:3000
- Skapa requests för varje endpoint
- För POST/PUT, använd Body > raw > JSON
- För filuppladdning, använd Body > form-data

Exempel på en komplett URL i Postman:
http://localhost:3000/api/v1/artists

# För frontend

Detta är en guide baserad på vad vi faktiskt har implementerat i backend.

## Base URL

`http://localhost:3000/api/v1`

## Artists Endpoints

### GET /artists

- Hämta alla tatuerare
- Response: Array av artist-objekt

```json
{
  "name": "string", // required
  "specialty": "string", // required
  "description": "string" // required
}
```

### POST /artists

- Skapa ny tatuerare
- Body (JSON):

```json
{
  "name": "string", // required
  "specialty": "string", // required
  "description": "string" // required
}
```

## Bookings Endpoints

### GET /bookings

- Hämta alla bokningar
- Response: Array av bokningar från JSON-fil

### POST /bookings

- Skapa ny bokning
- Body (form-data):
  - file: [designbild]
  - customerName: string
  - date: string
  - time: string
  - artistId: string
  - type: string

### GET /bookings/occupied

- Hämta upptagna tider
- Response: Array av upptagna tidslotter

## Filuppladdning

- Endpoint: POST /bookings
- Använd form-data
- Filen skickas med nyckeln 'file'
- Max filstorlek: 5MB
- Tillåtna format: jpg, png, jpeg

## Exempel på användning

### Skapa en ny tatuerare

```javascript
fetch('http://localhost:3000/api/v1/artists', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Totte',
    specialty: 'Fantasy',
    description: 'Expert på detaljerade fantasy-tatueringar',
  }),
});
```

### Skapa en ny bokning med bild

```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('customerName', 'Anna');
formData.append('date', '2024-03-20');
formData.append('time', '14:00');
formData.append('artistId', 'artist_id_here');
formData.append('type', 'tattoo');

fetch('http://localhost:3000/api/v1/bookings', {
  method: 'POST',
  body: formData,
});
```

```
