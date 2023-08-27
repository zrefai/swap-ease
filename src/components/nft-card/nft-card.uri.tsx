import { Box, Typography, useTheme } from '@mui/material';
import { useTokenUri } from '../../hooks/use-token-uri';
import { NftData } from '../../models/nftData.model';
import { defaultShadow } from '../../theme/defauli-mui-theme';
import { getIpfsUrl } from './nft-card';

interface INftCardProps {
  data: NftData;
}

export const NftCardUri = ({ data }: INftCardProps) => {
  const theme = useTheme();
  const [result, error] = useTokenUri(data?.token_uri as string);
  const collectionName = data.name ?? '';
  const image = getIpfsUrl(result?.image);
  const name = result?.name ?? data.token_id;

  if (error) {
    console.error(error);
    return null;
  }

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
        {collectionName}
      </Typography>
      <Typography variant="body1">{name}</Typography>
    </Box>
  );
};
