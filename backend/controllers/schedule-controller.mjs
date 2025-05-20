import scheduleRepository from '../repositories/scheduleRepository.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAvailableTimesByEmployee = catchErrorAsync(
  async (req, res) => {
    const availableTimes = await new scheduleRepository().listAvailableTimes(
      req.params.employee,
      req.params.date
    );
    res.status(200).json({ success: true, data: availableTimes });
  }
);
