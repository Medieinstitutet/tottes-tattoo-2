# Tottes Tattoo - Vår Stilguide

Hej! Jag har skapat denna stilguide för att hjälpa oss att hålla en konsekvent design genom hela webbplatsen. Här delar jag med mig av alla designval och komponenter jag har använt på startsidan.

## Vår Typografi

### Våra Fonts

Jag har valt två huvudtypsnitt för webbplatsen:

- **Huvudfont:** Roboto
  - För att använda den, lägg till denna rad i `index.html`:
  ```html
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
    rel="stylesheet" />
  ```
- **Accentfont:** Cinzel
  - Denna använder jag för rubriker och logotypen. Lägg till denna rad i `index.html`:
  ```html
  <link
    href="https://fonts.googleapis.com/css?family=Cinzel:400,700&display=swap"
    rel="stylesheet" />
  ```

### Mina Valda Fontstorlekar

Jag har experimenterat med olika storlekar och kommit fram till dessa optimala storlekar:

- **Huvudrubrik (Hero):** 3rem (48px) - Perfekt för att fånga besökarens uppmärksamhet
- **Sektionsrubriker:** 2.2rem (35.2px) - Ger bra hierarki utan att överväldiga
- **Underrubriker:** 1.3rem (20.8px) - Bra läsbarhet för sekundär information
- **Brödtext:** 1rem (16px) - Optimal lässtorlek för längre texter
- **Mindre text:** 0.95rem (15.2px) - Perfekt för mindre viktig information

## Vårt Färgschema

Jag har skapat ett färgschema som speglar en fantasy/kunglig känsla:

```javascript
colors: {
  background: '#181716',      // En djup, mörk bakgrund som ger kontrast
  backgroundAccent: '#2a1a13', // En varmare mörkton för variation
  text: '#ffffff',           // Ren vit text för maximal läsbarhet
  textSoft: '#cccccc',       // En mjukare vit för mindre viktig text
  gold: '#d4af37',          // En rik guldton som ger en kunglig känsla
  goldLight: '#e5c76b'      // En ljusare guldton för hover-effekter
}
```

## Min Layout-Strategi

### Container-bredder

Jag har valt dessa mått för att ge en balanserad layout:

- **Maxbredd för innehåll:** 1200px - Ger bra läsbarhet på stora skärmar
- **Padding på sidor:** 2rem (32px) - Skapar luft runt innehållet
- **Mellanrum mellan sektioner:** 4rem (64px) - Ger tydlig separation

### Min Grid- och Flexbox-approach

Jag använder:

- `display: flex` med `gap: 2rem` för jämna mellanrum
- `flex-wrap: wrap` för att hantera responsivitet

## Mina Komponenter

### Knappar

Här är min knappdesign som jag använder överallt:

```javascript
const Button = styled.a`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`;
```

### Kort

För kort använder jag denna stil:

```javascript
const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
```

### Bilder

För bilder har jag valt:

- **Bildramar:** 2px solid guld - Ger en elegant ram
- **Border-radius:** 8px - Mjuka hörn som matchar övrig design
- **Bakgrundsfärg:** #222 - En mörk bakgrund medan bilden laddas

### CTA-knappar (Call-to-Action)

Jag använder två typer av CTA-knappar på startsidan:

1. **Huvud CTA** (i hero-sektionen):

```javascript
const HeroButton = styled.a`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`;
```

2. **Sekundär CTA** (under karusellen):

```javascript
const StudioCTA = styled.a`
  display: inline-block;
  margin: 2rem 0 0 0;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  &:hover {
    background: ${({ theme }) => theme.colors.goldLight};
  }
`;
```

## Min Navigation

Jag har designat navigationen för att vara både funktionell och snygg:

- **Höjd:** 6.5rem (104px) - Ger tillräckligt utrymme för innehållet
- **Bakgrund:** #2a1a13 - En varm mörkton som matchar temat
- **Logo:** Guld färg, 1.7rem - Framhäver varumärket
- **Nav-länkar:** 1.1rem med opacity 0.85 vid hover - Ger subtil feedback

## Min Responsiva Design

För att hantera olika skärmstorlekar använder jag:

- `max-width` för container
- `flex-wrap` för att hantera mindre skärmar
- Justerar fontstorlekar med media queries:

```javascript
@media (max-width: 768px) {
  font-size: 0.9rem;
}
```

## Mina Animationer

Jag har valt subtila animationer:

- **Hover-effekter:** 0.2s transition - Snabb men märkbar
- **Fade-effekter:** 0.5s ease - Mjuk övergång

## Exempel på Implementation

### Sektionsstruktur

Här är hur jag strukturerar mina sektioner:

```javascript
const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 2rem 1rem;
  background: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 2.2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gold};
  display: inline-block;
`;
```

### Formulär (för bokningssidan)

För formulär använder jag denna stil:

```javascript
const FormInput = styled.input`
  background: ${({ theme }) => theme.colors.backgroundAccent};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.8rem;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;
```

## Mina Best Practices

Jag följer dessa regler för att hålla designen konsekvent:

1. Använder alltid styled-components
2. Importerar tema från `theme.js`
3. Använder semantisk HTML
4. Håller mig till färgpaletten
5. Använder konsekvent spacing
6. Testar responsivitet
7. Använder samma animationer

## Tips för Portfolio-sidan

För portfolio-sidan rekommenderar jag att:

- Använda samma kortstil som jag använt i team-sektionen
- Implementera en grid-layout för bilder
- Använda samma hover-effekter
- Behålla samma färgschema

## Tips för Bokningssidan

För bokningssidan föreslår jag att:

- Skapa ett formulär med samma färgschema och designprinciper
- Använda samma CTA-knappar för att behålla konsistensen
- Implementera samma responsiva design
- Lägga till validering och användarvänlig feedback
- Behålla samma guld/svart tema för formuläret

---
