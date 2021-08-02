import React from "react";
import styles from "./BookingDate.module.css";

const BookingDate = (props) => {
  const month = props.date.toLocaleString("de-DE", { month: "long" });
  const day = props.date.toLocaleString("de-DE", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className={styles["booking-date"]}>
      <div className={styles["booking-date__year"]}>{year}</div>
      <div className={styles["booking-date__day"]}>{day}</div>
      <div className={styles["booking-date__month"]}>{month}</div>
    </div>
  );
};

export default BookingDate;
