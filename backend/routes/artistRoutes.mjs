import express from 'express';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import Artist from '../models/artist.mjs';

const router = express.Router();

// Get all artists
router.get(
  '/',
  catchErrorAsync(async (req, res) => {
    const artists = await Artist.find();
    res.status(200).json(artists);
  })
);

// Create a new artist
router.post(
  '/',
  catchErrorAsync(async (req, res) => {
    const { name, specialty, description } = req.body;
    const artist = new Artist({
      name,
      specialty: specialty || undefined,
      description: description || undefined,
    });
    await artist.save();
    res.status(201).json(artist);
  })
);

export default router;
