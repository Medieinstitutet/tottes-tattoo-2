# Hur man använder

Starta servern: npm run dev

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

# Bookings (Bokningar)

GET http://localhost:3000/api/v1/bookings

- Hämta alla bokningar

POST http://localhost:3000/api/v1/bookings

- Skapa ny bokning
  Body (JSON):
  {
  "customerName": "Anna",
  "date": "2024-03-20",
  "time": "14:00",
  "artistId": "artist_id_here",
  "type": "tattoo"
  }

GET http://localhost:3000/api/v1/bookings/:id

- Hämta specifik bokning

GET http://localhost:3000/api/v1/bookings/available?date=2024-03-20

- Hämta lediga tider för ett specifikt datum

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

```
