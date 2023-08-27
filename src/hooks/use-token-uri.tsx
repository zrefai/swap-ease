import { useEffect, useState } from 'react';
import { IPFS_BASE_URL, IPFS_SECONDARY } from '../constants/constants';

/*
Formats for TokenUri so far:
- IPFS CID
- Regular link
- https://ipfs.io/QmU8YNRbju5KrGgPKbQ529FhJsUnPuuHNwndu5x9fXZdSM/6812.png - missing ipfs/ before CID

*/

export const useTokenUri = (uri: string) => {
  const [results, setResults] = useState<any>({});
  const [error, setError] = useState('');

  const fetchMetadata = async (url: string) => {
    return await fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setResults(response);
      })
      .catch((error) => {
        setError(error);
        console.error('Error occured fetching metadata', error);
      });
  };

  useEffect(() => {
    if (uri.includes('https://')) {
      fetchMetadata(uri);
    } else if (uri.substring(0, 2) === 'Qm') {
      const ipfsUrl = IPFS_BASE_URL + IPFS_SECONDARY + uri;
      fetchMetadata(ipfsUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return [results, error];
};
