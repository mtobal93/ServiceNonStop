export const stdTimeFormat = (military) => {
  if (military === null || military === '') return "Closed"

  let hrParts = parseInt(military.substring(0, 2));
  let hr = ((hrParts + 11) % 12) + 1;
  let min = military.substring(2);
  let amPm;

  if (hrParts > 11) amPm = 'PM'
  else amPm = 'AM'

  return `${hr}:${min} ${amPm}`
}

export const getTodaysHours = (company) => {
  const d = new Date();
  const today = d.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  let todayHours = { open: 'Opened', close: 'Closed' };

  const todayKey = getDayKey(today);

  const openKey = `${todayKey}_open`;
  const closeKey = `${todayKey}_close`;

  if (company.hours && company.hours[openKey] && company.hours[closeKey]) {
    todayHours = {
      open: stdTimeFormat(company.hours[openKey]),
      close: stdTimeFormat(company.hours[closeKey])
    };
    // Exit loop after finding the hours for today
    return todayHours;
  }
}


const getDayKey = (dayIndex) => {
  const daysOfWeek = ["sun", "mon", "tues", "wed", "thu", "fri", "sat"];
  return daysOfWeek[dayIndex];
};

export const getDate = (date) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'short' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return [month, ' ', day, ', ', year]
}
