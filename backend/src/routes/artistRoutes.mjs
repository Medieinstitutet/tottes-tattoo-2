import express from 'express';
import {
  getAllArtists,
  createArtist,
} from '../controllers/artistController.mjs';

const router = express.Router();

router.get('/', getAllArtists);
router.post('/', createArtist);

export default router;
