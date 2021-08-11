import moment from "moment";

/**
 * Returns an Object with summed times in days, hours and minutes
 * Real Days (24h) not Working Days!
 * @param {*} entries
 * @returns
 */
export const sumDateTimes = (entries) => {
  let timeObj = moment().day(0).hour(0).minute(0);

  for (const entry of entries) {
    const time = entry.time.split(":");
    timeObj.add({
      hours: +time[0],
      minutes: +time[1],
    });
  }

  const d = timeObj.days();
  const h = timeObj.hours();
  const m = timeObj.minutes();

  const sum = {
    days: `${d < 10 ? "0" + d : d}`,
    hours: `${h < 10 ? "0" + h : h}`,
    minutes: `${m < 10 ? "0" + m : m}`,
  };

  return sum;
};

/**
 * Sum booked times to hours and minutes
 * @param {*} entries
 * @returns
 */
export const sumHours = (entries) => {
  let h = 0;
  let m = 0;

  for (const entry of entries) {
    const time = entry.time.split(":");
    h += +time[0];
    m += +time[1];
  }

  if (m >= 60) {
    let tempHours = (m / 60) << 0;
    let tempMinutes = m % 60;
    h += tempHours;
    m = tempMinutes;
  }

  return {
    hours: `${h < 10 ? "0" + h : h}`,
    minutes: `${m < 10 ? "0" + m : m}`,
  };
};

/**
 * Return remaining hours
 * @param {*} totalHours
 * @returns
 */
export const remainingHours = (periodHours, bookedHours) => {
  let h = 0;
  let m = 0;

  const minutes = (hours) => hours * 60;

  const tempRemainingHours =
    minutes(periodHours) - (minutes(+bookedHours.hours) + +bookedHours.minutes);

  if (tempRemainingHours >= 60) {
    let tempHours = (tempRemainingHours / 60) << 0;
    let tempMinutes = tempRemainingHours % 60;
    h += tempHours;
    m = tempMinutes;
  }

  return {
    hours: `${h < 10 ? "0" + h : h}`,
    minutes: `${m < 10 ? "0" + m : m}`,
  };
};