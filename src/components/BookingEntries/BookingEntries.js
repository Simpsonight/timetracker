import React from "react";

import BookingItem from "./BookingItem/BookingItem";

const BookingEntries = (props) => {
  return (
    <>
      {props.data.map((entry) => (
        <BookingItem key={entry.id} data={entry} />
      ))}
    </>
  );
};

export default BookingEntries;
