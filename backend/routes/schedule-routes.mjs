import express from 'express';

import { listAvailableTimesByEmployee } from '../controllers/schedule-controller.mjs';

const bookingRouter = express.Router();

bookingRouter.route('/:employee/:date').get(listAvailableTimesByEmployee);
export default bookingRouter;
