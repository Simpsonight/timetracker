import React from "react";
import styles from "./EntryDate.module.css";

const EntryDate = ({ date }) => {
  const month = date.toLocaleString("de-DE", { month: "long" });
  const day = date.toLocaleString("de-DE", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className={styles["entry-date"]}>
      <div className={styles["entry-date__year"]}>{year}</div>
      <div className={styles["entry-date__day"]}>{day}</div>
      <div className={styles["entry-date__month"]}>{month}</div>
    </div>
  );
};

export default EntryDate;
