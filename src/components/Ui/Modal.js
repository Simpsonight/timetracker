import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as MaterialUiModal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from './Paper/Paper';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxWidth: "500px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 3, 3),
    marginLeft: "16px",
    marginRight: "16px",
  },
}));

const Modal = ({ children, open, onCloseModal }) => {
  const classes = useStyles();

  return (
    <>
      <MaterialUiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper styles={classes.paper}>{children}</Paper>
        </Fade>
      </MaterialUiModal>
    </>
  );
};

export default Modal;
