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

/**
 * MomentJS - get working days without weekends
 * @param {*} startDate 
 * @param {*} endDate 
 * @returns 
 */
export const getWorkingDays = (startDate, endDate) => {
  // get nb of weekend days
  var startDateMonday = startDate.clone().startOf("isoWeek");
  var endDateMonday = endDate.clone().startOf("isoWeek");

  var nbWeekEndDays = (2 * endDateMonday.diff(startDateMonday, "days")) / 7;
  var isoDayStart = startDate.isoWeekday();
  if (isoDayStart > 5) {
    // starts during the weekend
    nbWeekEndDays -= 8 - isoDayStart;
  }
  var isoDayEnd = endDate.isoWeekday();
  if (isoDayEnd > 5) {
    // ends during the weekend
    nbWeekEndDays += 8 - isoDayEnd;
  }

  // if we want to also exlcude holidays
  // var startOfStartDate = startDate.clone().startOf("day");
  // var nbHolidays = holidays.filter((h) => {
  //   return h.isSameOrAfter(startOfStartDate) && h.isSameOrBefore(endDate);
  // }).length;

  var duration = moment.duration(endDate.diff(startDate));
  // duration = duration.subtract({ days: nbWeekEndDays + nbHolidays });
  duration = duration.subtract({ days: nbWeekEndDays });

  return Math.floor(duration.asDays()); // get only nb of complete days
};