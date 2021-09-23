import styled from "styled-components";
import theme from "../../../theme";

export const Container = styled.div`
  padding: ${theme.spacing(1)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  text-align: left;
`;

export const Subline = styled.p`
  margin: 0;
  color: ${theme.palette.lightGrey.main};
`;
