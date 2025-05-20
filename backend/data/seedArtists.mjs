import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Artist from '../models/artist.mjs';

dotenv.config();

const artists = [
  {
    name: 'Totte Lindström',
    specialty: 'Fantasy & Drakar',
    description:
      '15+ års erfarenhet av tatueringskonst och passion för fantasy-motiv. Specialiserad på detaljrika drakar och magiska väsen.',
  },
  {
    name: 'Anders Lindström',
    specialty: 'Realistiska porträtt',
    description:
      'Expert på realistiska porträtt med fantasyinslag. Perfektion i detaljer och kreativa motiv.',
  },
  {
    name: 'Erik Sandberg',
    specialty: 'Neo-traditionella',
    description:
      'Specialist på neo-traditionella design med fokus på mytologiska figurer och färgstarka motiv.',
  },
  {
    name: 'Marcus Diaz',
    specialty: 'Tribal & Biomekanisk',
    description:
      'Mästare på tribal och biomekaniska tatueringar med fantasy-inslag och detaljerade mönster.',
  },
  {
    name: 'Amanda Berg',
    specialty: 'Akvarell & Abstrakt',
    description:
      'Unik stil med flytande former och mjuka färgövergångar. Fantasy och akvarell i kombination.',
  },
];

const seedArtists = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Clear existing artists
    await Artist.deleteMany({});
    console.log('Cleared existing artists');

    // Insert new artists
    await Artist.insertMany(artists);
    console.log('Added artists to database');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedArtists();
