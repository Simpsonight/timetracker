import styled from "styled-components";
import { Paper } from "@mui/material";

import theme from "../../../theme";

export const MaterialUiPaper = styled(Paper)`
    margin-top: 0;
    margin-bottom: 0;
    padding: ${theme.spacing(2)}px;
    border-radius: 10px;
    box-shadow: none;
    background-color: #eee;
    text-align: center;
    align-items: center;
`;