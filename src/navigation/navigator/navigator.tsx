import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { TradingScreen } from '../../components/screens/trading/trading.screen';
import { WalletScreen } from '../../components/screens/wallet/wallet.screen';
import { NavigationConfig } from './routes';

export const Navigator = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        background: '#F2F2F2',
      }}
    >
      <Router>
        <NavBar />
        <Routes>
          <Route
            path={NavigationConfig.root.route}
            element={<WalletScreen />}
          />
          <Route
            path={NavigationConfig.trading.route}
            element={<TradingScreen />}
          />
        </Routes>
      </Router>
    </Box>
  );
};
