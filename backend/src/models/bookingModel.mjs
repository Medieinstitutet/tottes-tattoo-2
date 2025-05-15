import fs from 'fs/promises';

const filePath = './data/bookings.json';

export const readBookings = async () => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const saveBooking = async (newBooking) => {
  const bookings = await readBookings();
  bookings.push(newBooking);
  await fs.writeFile(filePath, JSON.stringify(bookings, null, 2));
};
