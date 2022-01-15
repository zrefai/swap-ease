import { ThemeProvider } from '@mui/material';
import { MoralisProvider } from 'react-moralis';
import { Navigator } from './navigation/navigator/navigator';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

function App() {
  return (
    <MoralisProvider
      appId={'YCs243vRMJ2l1SBq8IG95EnSa7EroUWsgPnpAcy8'}
      serverUrl={'https://dfyfnzksvmcm.usemoralis.com:2053/server'}
    >
      <ThemeProvider theme={defaultMuiTheme}>
        <Navigator />
      </ThemeProvider>
    </MoralisProvider>
  );
}

export default App;
