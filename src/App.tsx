import { Box, ThemeProvider, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { defaultMuiTheme } from './theme/defauli-mui-theme';

// App should probably start with asking the user to sign into meta mask from the start or ask them
// to do so at some point later.
/**
 * https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
 // This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (provider) {
  // From now on, this should always be true:
  // provider === window.ethereum
  startApp(provider); // initialize your app
} else {
  console.log('Please install MetaMask!');
}
 */

// Ethers.js
// API key should be stored in DB and called, storing it in .env file can make it public upon inspecting
const url = 'https://eth-rinkeby.alchemyapi.io/v2/sio3HfFITemtRtiw6OYIlwHvu1Ui68Ec';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

function App() {
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    getBlockNumber();
  });

  const getBlockNumber = async () => {
    const response = await customHttpProvider.getBlockNumber();
    setBlockNumber(response);
  };

  return (
    <ThemeProvider theme={defaultMuiTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 1,
          height: '100vh',
          gap: '10px',
        }}
      >
        <Typography>SwapEase UX</Typography>
        <Box>
          <Typography>Block Number</Typography>
          <Typography>{blockNumber}</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
