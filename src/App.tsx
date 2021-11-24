import { Box, ThemeProvider, Typography } from '@mui/material';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

function App() {
  return (
    <ThemeProvider theme={defaultMuiTheme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 1,
          height: '100vh',
        }}
      >
        <Typography>SwapEase UX</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
