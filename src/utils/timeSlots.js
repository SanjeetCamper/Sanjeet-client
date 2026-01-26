// utils/timeSlots.js
export const generateTimeSlots = () => {
  const slots = [];

  for (let hour = 9; hour <= 20; hour++) {
    for (let min of [0, 30]) {
      if (hour === 20 && min === 30) continue; // 8:30 PM nahi chahiye

      let displayHour = hour;
      let period = "AM";

      if (hour >= 12) period = "PM";
      if (hour > 12) displayHour = hour - 12;
      if (hour === 0) displayHour = 12;

      const mm = min === 0 ? "00" : "30";

      slots.push(`${displayHour}:${mm} ${period}`);
    }
  }

  return slots;
};
