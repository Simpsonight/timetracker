import React from "react";
import { Paper as MaterialUiPaper } from "@mui/material";

const Paper = ({ styles, children }) => {

  const SomeContent = React.forwardRef((props, ref) =>
  <div {...props} ref={ref}>{children}</div>);

  return <MaterialUiPaper className={styles ? styles : ''}><SomeContent /></MaterialUiPaper>;
};

export default Paper;
