export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
  };
  
  export const isValidTimeFormat = (time) => {
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    return (
      !isNaN(hour) &&
      !isNaN(minute) &&
      hour >= 0 &&
      hour <= 23 &&
      minute >= 0 &&
      minute <= 59 &&
      time.match(/^\d{2}:\d{2}$/)
    );
  };
  
  export const isWithinWorkingHours = (time) => {
    const [hour] = time.split(':').map(Number);
    return hour >= 9 && hour < 18;
  };
  
  export const isNotLunchHour = (time) => {
    const [hour] = time.split(':').map(Number);
    return hour !== 12;
  };
  
  export const isWeekday = (dateStr) => {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  };