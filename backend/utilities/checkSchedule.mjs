const checkSchedule = (bookings) => {
  const availableHours = [9, 10, 11, 13, 14, 15, 16, 17];
  let bookedHours = [];

  bookings.forEach((booking) => {
    const startHour = booking.dateAndTime.getHours();
    const duration = booking.durationInHours;
    const remainingHours = availableHours;

    const index = remainingHours.indexOf(startHour);
    if (index > -1) {
      bookedHours.push(remainingHours.splice(index, duration));
    }
  });

  return availableHours.filter((hour) => !bookedHours.includes(hour));
};

export default checkSchedule;
