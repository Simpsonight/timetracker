import React from "react";
import * as Styled from "./styles";

const Paper = ({ styles, children }) => {

  return <Styled.MaterialUiPaper className={styles ? styles : ''}>{children}</Styled.MaterialUiPaper>;
};

export default Paper;
