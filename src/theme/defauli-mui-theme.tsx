import { createTheme, ThemeOptions } from '@mui/material';

const spacingMultiplier = 4;

const spacingOverrideFunc = (factor: number) => `${factor * spacingMultiplier}px`;

const theme: ThemeOptions = {
  spacing: spacingOverrideFunc,
};

export const defaultMuiTheme = createTheme(theme);
