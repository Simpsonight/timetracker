import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import theme from '../../theme';

export const Container = styled.div`
    width: auto;
    margin-left: ${theme.spacing(2)}rem;
    margin-right: ${theme.spacing(2)}rem;

    ${up('lg')} {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
`;
