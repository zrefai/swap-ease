import { Box, Typography, useTheme } from '@mui/material';
import {
  IPFS_BASE_URL,
  IPFS_SECONDARY,
  IPFS_URL_PREFIX,
} from '../../constants/constants';
import { defaultShadow } from '../../theme/defauli-mui-theme';
import { Nft, GetNftMetadataResponse } from '@alch/alchemy-web3';
import { useEffect, useState } from 'react';

interface INftCardProps {
  web3: any;
  nft: Nft;
}

export const NftCard = ({ web3, nft }: INftCardProps) => {
  const theme = useTheme();
  const [nftData, setNftData] = useState<GetNftMetadataResponse | null>(null);
  // const metadata = data.metadata as NftMetadata;
  // const collectionName = data.name ?? '';
  // const image = getIpfsUrl(metadata?.image);
  // const name = metadata?.name ?? data.token_id;

  useEffect(() => {
    async function getNftMetadata() {
      const response = await web3.alchemy.getNftMetadata({
        contractAddress: nft.contract.address,
        tokenId: nft.id.tokenId,
      });

      setNftData(response);
    }

    getNftMetadata();
  }, []);

  if (nftData) {
    console.log(nftData);
    const image = nftData.metadata?.image ?? nftData.tokenUri?.gateway ?? '';
    const name = nftData.title;
    return (
      <Box
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '240px',
          }}
        >
          <img
            src={image}
            alt="nft"
            style={{
              borderRadius: theme.spacing(4),
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </Box>
        <Typography
          variant="caption"
          color="GrayText"
          sx={{ marginTop: theme.spacing(2) }}
        >
          {''}
        </Typography>
        <Typography variant="body1">{name}</Typography>
      </Box>
    );
  }
  return null;
};

export function getIpfsUrl(currentUrl = ''): string {
  if (currentUrl.includes('ipfs://') && !currentUrl.includes(IPFS_SECONDARY)) {
    const cid = currentUrl.slice(IPFS_URL_PREFIX.length);
    console.log(IPFS_BASE_URL + IPFS_SECONDARY + cid);
    return IPFS_BASE_URL + IPFS_SECONDARY + cid;
  } else if (currentUrl.includes('ipfs://')) {
    const cid = currentUrl.slice(IPFS_URL_PREFIX.length);
    return IPFS_BASE_URL + cid;
  } else if (currentUrl.substring(0, 2) === 'Qm') {
    return IPFS_BASE_URL + IPFS_SECONDARY + currentUrl;
  }
  return currentUrl;
}
