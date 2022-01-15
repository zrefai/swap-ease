import { Avatar, useTheme } from '@mui/material';
import { ReactElement } from 'react';
import Logo from '../../assets/logo/Logo.svg';

interface ILogo {
  width?: string;
  height?: string;
}

export const SwapEaseLogo = ({ width, height }: ILogo): ReactElement => {
  const theme = useTheme();
  const logoWidth = width ?? '100px';
  const logoHeight = height ?? '40px';
  return (
    <Avatar
      src={Logo}
      variant='square'
      alt='Swap Ease Logo'
      style={{
        width: logoWidth,
        height: logoHeight,
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
      }}
    />
  );
};
