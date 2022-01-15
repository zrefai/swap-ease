import { Box, Button, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { NFTMetadata } from '../../../models/NFTMetadata/NFTMetadata';
import { defaultShadow } from '../../../theme/defauli-mui-theme';
import { ScreenContainer } from '../../screen-container/screen-container';
import { walletScreenContent } from './wallet.screen.content';

export const WalletScreen = () => {
  const theme = useTheme();
  const { data } = useNFTBalances();
  const { authenticate, isAuthenticated, account, logout, isInitialized } =
    useMoralis();

  const renderNFT = (data: any) => {
    if (data && data.result) {
      return data.result.map((nft: any, index: number) => {
        const metadata: NFTMetadata = nft.metadata;
        const collectionName = nft.name ?? '';
        const image = metadata?.image ?? '';
        const name = metadata?.name ?? '';
        const key = `${index}${name}${nft.token_id}`;

        if (nft.is_valid) {
          return (
            <Box
              key={key}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '240px',
                height: '300px',
                background: 'white',
                boxShadow: defaultShadow,
                borderRadius: theme.spacing(4),
                padding: theme.spacing(2.5),
              }}
            >
              <img
                src={image}
                alt='nft'
                style={{ borderRadius: theme.spacing(4), height: '240px' }}
              />
              <Typography
                variant='caption'
                color='GrayText'
                sx={{ marginTop: theme.spacing(2) }}
              >
                {collectionName}
              </Typography>
              <Typography variant='body1'>{name}</Typography>
            </Box>
          );
        }
        return null;
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
    authenticate({ signingMessage: walletScreenContent.authenticationMessage });
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
        <Typography>{walletScreenContent.signInLabel}</Typography>
        <Button
          onClick={authenticateWallet}
          variant='contained'
          sx={{ marginTop: theme.spacing(4) }}
        >
          {walletScreenContent.signInButtonLabel}
        </Button>
      </Box>
    );
  }

  return (
    <ScreenContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: theme.spacing(4),
          paddingBottom: theme.spacing(12),
        }}
      >
        {renderNFT(data)}
      </Box>
    </ScreenContainer>
  );
};
