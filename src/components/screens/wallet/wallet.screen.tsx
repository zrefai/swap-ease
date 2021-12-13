import { Box, Button, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { defaultShadow } from '../../../theme/defauli-mui-theme';

export const WalletScreen = () => {
  const theme = useTheme();
  const { authenticate, isAuthenticated, account, logout, isInitialized } =
    useMoralis();
  const { data } = useNFTBalances();

  console.log('Account: ', account);
  console.log('isAuthenticated: ', isAuthenticated);
  console.log('NFT data', data);

  const renderNFT = (data: any) => {
    if (data && data.result) {
      return data.result.map((nft: any, index: number) => {
        const image = nft.metadata?.image ?? '';
        const name = nft.metadata?.name ?? '';
        const key = `${index}${name}${nft.metadata?.token_id}`;

        return (
          <Box
            key={key}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '190px',
              height: '250px',
              background: 'white',
              boxShadow: defaultShadow,
              borderRadius: theme.spacing(4),
              padding: theme.spacing(2.5),
            }}
          >
            <img
              src={image}
              alt='nft'
              style={{ borderRadius: theme.spacing(4), height: '190px' }}
            />
            <Typography sx={{ marginTop: theme.spacing(2) }}>{name}</Typography>
          </Box>
        );
      });
    }
    return null;
  };

  useEffect(() => {
    if (isInitialized && account === null) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const authenticateWallet = () => {
    authenticate({ signingMessage: 'Swap Ease authentication' });
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography>
          Sign into your Meta Mask wallet to see your NFTs and more!
        </Typography>
        <Button
          onClick={authenticateWallet}
          variant='contained'
          sx={{ marginTop: theme.spacing(4) }}
        >
          Sign into MetaMask
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '84px',
        marginBottom: '84px',
        height: '100%',
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        flexWrap: 'wrap',
        gap: theme.spacing(4),
      }}
    >
      {renderNFT(data)}
    </Box>
  );
};
