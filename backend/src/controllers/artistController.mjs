import Artist from '../models/artist.mjs';

const getAllArtists = async (req, res) => {
  const artists = await Artist.find();
  res.json(artists);
};

const createArtist = async (req, res) => {
  const { name, specialty, description } = req.body;
  const artist = new Artist({ name, specialty, description });
  await artist.save();
  res.status(201).json(artist);
};

export { getAllArtists, createArtist };
