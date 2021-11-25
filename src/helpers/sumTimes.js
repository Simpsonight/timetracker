const formatTime = (h, m) => {
    return {
        hours: `${h < 10 ? '0' + h : h}`,
        minutes: `${m < 10 ? '0' + m : m}`,
    };
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
        const time = entry.time.split(':');
        h += +time[0];
        m += +time[1];
    }

    if (m >= 60) {
        let tempHours = (m / 60) << 0;
        let tempMinutes = m % 60;
        h += tempHours;
        m = tempMinutes;
    }

    return formatTime(h, m);
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

    const tempRemainingHours = minutes(periodHours) - (minutes(+bookedHours.hours) + +bookedHours.minutes);

    if (tempRemainingHours >= 60) {
        let tempHours = (tempRemainingHours / 60) << 0;
        let tempMinutes = tempRemainingHours % 60;
        h += tempHours;
        m = tempMinutes;
    }

    return formatTime(h, m);
};

/**
 * Convert time string "00:00" to decimal number
 * @param {*} time
 * @returns
 */
export const timeToDecimal = (time) => {
    const timeArr = time.split(':');
    return +(+timeArr[0] + +timeArr[1] / 60).toFixed(2);
};

/**
 * Convert decimal number "00.00" to hours and minutes
 * @param {*} time
 * @returns
 */
export const decimalToTime = (time) => {
    const timeArr = time.split('.');
    const h = +timeArr[0];
    const m = +timeArr[1] * 0.6;

    if (m >= 60) {
        let tempHours = (m / 60) << 0;
        let tempMinutes = m % 60;
        h += tempHours;
        m = tempMinutes;
    }

    return formatTime(h, m);
};
