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

A summary of the fields required to create a booking:

| **Field**         | **Type** | **Required** | **Notes**                                          |
| ----------------- | -------- | ------------ | -------------------------------------------------- |
| `name`            | `String` | Yes          | Must be provided and trimmed.                      |
| `dateAndTime`     | `Date`   | Yes          | Must be a valid date.                              |
| `durationInHours` | `Number` | Yes          | Must be at least 1 hour.                           |
| `employee`        | `String` | Yes          | Must be provided and trimmed.                      |
| `purpose`         | `String` | Yes          | Must be either `"tattoo"` or `"consultation"`.     |
| `email`           | `String` | Yes          | Must be a valid email address.                     |
| `phoneNumber`     | `String` | Yes          | Must be a valid phone number (e.g., `+123456789`). |
| `description`     | `String` | No           | Optional, defaults to an empty string.             |
| `imageUrl`        | `String` | No           | Optional, can store a URL for an image.            |

### Notes:

- All required fields (`name`, `dateAndTime`, `durationInHours`, `employee`, `purpose`, `email`, `phoneNumber`) must be provided when creating a booking.
- Optional fields (`description`, `imageUrl`) can be omitted. If `description` is omitted, it defaults to an empty string.

### valid API calls for booking

GET http://localhost:3000/api/v1/bookings

- Hämta alla bokningar

POST http://localhost:3000/api/v1/bookings

- Skapa ny bokning

GET http://localhost:3000/api/v1/bookings/:id

- Hämta specifik bokning

PUT http://localhost:3000/api/v1/bookings/:id

- Updatera eller ändra en bokning

DELETE http://localhost:3000/api/v1/bookings/:id

- Raderar en bokning

## Filuppladdning

När man skapar en ny bokning kan man skicka med en fil. Servern sparar filen fysiskt i mappen uploads/. URL för filen finns tillgänglig i fältet imageUrl när man hämtar en bokning.

- Ladda upp designbild för bokning
- Body (form-data):
- file: [välj fil]

## Visa lediga tider hos en tatuerare på angiven dag.

GET http://localhost:3000/api/v1/:employee/:date

# Testa i Postman

- Starta mongoDB
- Skapa en settings.env fil i mappen backend/config. Vi gör exakt samma som lärare Michael gjort på upgifterna westcoast-cars API i lektion 6. Fråga David eller Rain om mer info.
- Starta servern. Stå i mappen backend och skriv

```javascript
npm run dev
```

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

## Filuppladdning

- Endpoint: POST /bookings
- Använd form-data
- Filen skickas med nyckeln 'file'
- Max filstorlek: obegränsad
- Tillåtna format: validering för vad man skickar in saknas. Men filer förutom jpg, png, jpeg, webp kan orsaka oförutsägbart beteende.

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
formData.append('file', imageFile); // Optional: Image file for the booking
formData.append('name', 'Anna Andersson'); // Required: Customer's name
formData.append('dateAndTime', '2025-05-20T14:00:00Z'); // Required: Date and time in ISO format
formData.append('durationInHours', 2); // Required: Duration in hours (minimum 1)
formData.append('employee', 'Jane Smith'); // Required: Assigned employee
formData.append('purpose', 'tattoo'); // Required: Either "tattoo" or "consultation"
formData.append('email', 'anna.andersson@example.com'); // Required: Valid email address
formData.append('phoneNumber', '+46701234567'); // Required: Valid phone number
formData.append('description', 'A detailed dragon tattoo on the left arm'); // Optional: Description of the booking

fetch('http://localhost:3000/api/v1/bookings', {
  method: 'POST',
  body: formData,
});
```
