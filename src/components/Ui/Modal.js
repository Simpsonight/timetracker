import React from "react";
import { Modal as MaterialUiModal, Paper } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const styleModal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const stylePaper = {
  position: "relative",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 5,
  p: (4, 3, 3),
  ml: "16px",
  mr: "16px",
  my: 0,
  borderRadius: "10px",
  textAlign: "center",
  alignItems: "center",
};

const Modal = ({ children, open, onCloseModal }) => {
  
  const Content = React.forwardRef((props, ref) => (
    <Paper sx={stylePaper} {...props} ref={ref}>
      {children}
    </Paper>
  ));

  return (
    <>
      <MaterialUiModal
        sx={styleModal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Content />
      </MaterialUiModal>
    </>
  );
};

export default Modal;
