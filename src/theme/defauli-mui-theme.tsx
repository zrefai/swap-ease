import { createTheme, ThemeOptions } from '@mui/material';

const spacingMultiplier = 4;

export const defaultShadow = '0px 2px 4px rgba(0, 0, 0, 0.14)';

const spacingOverrideFunc = (factor: number) =>
  `${factor * spacingMultiplier}px`;

const theme: ThemeOptions = {
  spacing: spacingOverrideFunc,
  breakpoints: {
    values: {
      xs: 360,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#00000',
    },
  },
};

export const defaultMuiTheme = createTheme(theme);
