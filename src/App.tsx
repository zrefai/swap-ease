import { ThemeProvider } from '@mui/material';
import { MoralisProvider } from 'react-moralis';
import { Navigator } from './navigation/navigator/navigator';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

function App() {
  const appId = process.env.REACT_APP_APP_ID;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  
  return (
    <MoralisProvider
      appId={appId as string}
      serverUrl={serverUrl as string}
    >
      <ThemeProvider theme={defaultMuiTheme}>
        <Navigator />
      </ThemeProvider>
    </MoralisProvider>
  );
}

export default App;
