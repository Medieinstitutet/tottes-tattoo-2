import Artist from '../models/artist.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const getAllArtists = catchErrorAsync(async (req, res) => {
  const artists = await Artist.find();
  res.status(200).json(artists);
});

export const createArtist = catchErrorAsync(async (req, res) => {
  const { name, specialty, description } = req.body;
  const artist = new Artist({ name, specialty, description });
  await artist.save();
  res.status(201).json(artist);
});
