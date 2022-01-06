import { Box, useTheme } from '@mui/material';

interface IScreenContainerProps {
  children?: React.ReactNode;
}

export const ScreenContainer = ({ children }: IScreenContainerProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        marginTop: '84px',
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
      }}
    >
      {children}
    </Box>
  );
};
