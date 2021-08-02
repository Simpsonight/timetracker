import React, { useState } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BookingDate from "../BookingDate/BookingDate";
import styles from "./BookingItem.module.css";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const BookingItem = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { date, task, job, customer, description, timeHours, timeMinutes } = props.data;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={styles["booking-item"]}>
        <CardContent>
          <BookingDate date={new Date(date)} />
          <div className={styles["booking-item__description"]}>
            <h2>{task}</h2>
            <p>
              {customer} <span>|</span> {job}
            </p>
            <div className={styles["booking-item__price"]}>
              {timeHours}:{timeMinutes}
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
          </CardContent>
          </Collapse>
      </Card>
    </>
  );
};

export default BookingItem;
