import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import NewEntryForm from "./NewEntryForm/NewEntryForm";
import Modal from "../Ui/Modal";
import useStyles from "./styles";

const NewTimeEntry = ({ data: { clients }, onNewEntry }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
    onNewEntry(data);
    handleClose();
  };

  return (
    <>
      <Grid container alignContent="center" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AccessTime />}
          onClick={handleOpen}
        >
          Zeit buchen
        </Button>
      </Grid>

      <Modal open={open} onCloseModal={handleClose}>
        <NewEntryForm clients={clients} onFormSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default NewTimeEntry;
