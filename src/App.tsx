import { ThemeProvider } from '@mui/material';
import { Navigator } from './navigation/navigator/navigator';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

function App() {
  return (
    <ThemeProvider theme={defaultMuiTheme}>
      <Navigator />
    </ThemeProvider>
  );
}

export default App;
