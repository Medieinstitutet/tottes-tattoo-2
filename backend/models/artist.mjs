import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    default: 'Fantasy',
  },
  description: {
    type: String,
    default: 'Fantasy-motiv med hög detaljrikedom',
  },
});

export default mongoose.model('Artist', artistSchema);
