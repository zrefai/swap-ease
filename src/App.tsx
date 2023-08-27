import { ThemeProvider } from '@mui/material';
import { Navigator } from './navigation/navigator/navigator';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  // const network = 'mainnet';
  // const defaultProvider = ethers.getDefaultProvider(network, {
  //   etherscan: 'GKNH2UZYW4WEWDFAGPESGY29Y1F3CJMEFC',
  //   alchemy: 'sio3HfFITemtRtiw6OYIlwHvu1Ui68Ec',
  // });
  // const walletProvider = new ethers.providers.Web3Provider(ethereum);
  // const appId = process.env.REACT_APP_APP_ID;
  // const serverUrl = process.env.REACT_APP_SERVER_URL;

  return (
    <ThemeProvider theme={defaultMuiTheme}>
      <Navigator />
    </ThemeProvider>
  );
}

export default App;
