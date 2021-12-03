// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import Link from '@/src/components/Link';
import Logo from '@/src/components/Ui/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} href='/'>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
