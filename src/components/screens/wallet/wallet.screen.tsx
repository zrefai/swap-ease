import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { useWallet } from '../../../hooks/use-wallet';
import { ScreenContainer } from '../../screen-container/screen-container';
import { walletScreenContent } from './wallet.screen.content';
import { createAlchemyWeb3, GetNftsResponse, Nft } from '@alch/alchemy-web3';
import { useEffect, useState } from 'react';
import { NftCard } from '../../nft-card/nft-card';

const apiKey = 'sio3HfFITemtRtiw6OYIlwHvu1Ui68Ec';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`
);

export const WalletScreen = () => {
  const theme = useTheme();
  const { address, onConnectWallet } = useWallet();
  const [nfts, setNfts] = useState<GetNftsResponse>();
  console.log(nfts);

  useEffect(() => {
    async function fetchNftData() {
      // You can await here
      if (address) {
        const nftData = await web3.alchemy.getNfts({
          owner: address,
        });
        setNfts(nftData);
      }
    }
    fetchNftData();
  }, [address]);

  if (!address) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography>{walletScreenContent.signInLabel}</Typography>
        <Button
          onClick={onConnectWallet}
          variant="contained"
          sx={{ marginTop: theme.spacing(4) }}
        >
          {walletScreenContent.signInButtonLabel}
        </Button>
      </Box>
    );
  }

  return (
    <ScreenContainer>
      {nfts ? (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={theme.spacing(4)}
          paddingBottom={theme.spacing(12)}
        >
          {nfts.ownedNfts.map((nft: Nft, index: number) => {
            // const metadata = nft.metadata as NftMetadata;
            // if (metadata) {
            return <NftCard key={`${index}${nft.id}`} web3={web3} nft={nft} />;
            // } else if (nft?.token_uri) {
            //   return <NftCardUri key={key} data={nft} />;
            // }
            // return null;
          })}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
    </ScreenContainer>
  );
};
