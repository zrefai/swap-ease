import { Box, Button, useTheme } from '@mui/material';
import { SwapEaseLogo } from '../logo/swap-ease-logo';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { defaultShadow } from '../../theme/defauli-mui-theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationConfig } from '../../navigation/navigator/routes';
import { ReactElement } from 'react';

interface NavBarButtons {
  label: string;
  route: string;
  icon: ReactElement;
}

export const NavBar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navBarOptions: NavBarButtons[] = [
    {
      label: 'Wallet',
      route: NavigationConfig.root.route,
      icon: <AccountBalanceWalletIcon />,
    },
    {
      label: 'Trading',
      route: NavigationConfig.trading.route,
      icon: <TrendingUpIcon />,
    },
  ];

  const renderNavBarButtons = () =>
    navBarOptions.map((option, index) => {
      const key = `${option.label}${index}`;
      const isCurrentButtonActive = location.pathname === option.route;

      const handleOnClick = () => {
        navigate(option.route, { replace: true });
      };

      return (
        <Button
          key={key}
          onClick={handleOnClick}
          variant='text'
          color={isCurrentButtonActive ? 'primary' : 'secondary'}
          startIcon={option.icon}
          size='large'
          sx={{
            marginLeft: theme.spacing(1.5),
            marginRight: theme.spacing(1.5),
          }}
        >
          {option.label}
        </Button>
      );
    });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100vw',
        height: theme.spacing(10),
        boxShadow: defaultShadow,
        background: 'white',
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      }}
    >
      <SwapEaseLogo />
      <Box
        sx={{
          height: '100%',
          border: `1px solid ${theme.palette.common.black}`,
          marginLeft: theme.spacing(3),
          marginRight: theme.spacing(3),
        }}
      />
      {renderNavBarButtons()}
    </Box>
  );
};
