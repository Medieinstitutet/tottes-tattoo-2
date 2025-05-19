import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  description: { type: String, required: true },
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
