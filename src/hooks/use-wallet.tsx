import { useEffect, useState } from 'react';

const { ethereum } = window;

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const onWalletChange = (accounts: string[]) => {
    setAddress(accounts[0]);
  };

  //   const chainId = await ethereum.request({ method: 'eth_chainId' });
  const onConnectWallet = async () => {
    await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: string[]) => {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
        }
      })
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log(
            'User rejected sign in. Please try connecting to MetaMask again.'
          );
        } else {
          console.error(err);
        }
      });
  };

  const onClearWallet = () => {
    setAddress(null);
  };

  const onChainIdChange = (chainId: string) => {
    setChainId(chainId);
  };

  useEffect(() => {
    if (!ethereum) {
      console.log('MetaMask was not found');
      return;
    }
    ethereum.on('accountsChanged', onWalletChange);
    ethereum.on('connect', onConnectWallet);
    // TODO: when chain changes, we should reload the page
    ethereum.on('chainChanged', onChainIdChange);
    ethereum.on('disconnect', onClearWallet);

    return () => {
      ethereum.removeListener('accountsChanged', onWalletChange);
      ethereum.removeListener('connect', onConnectWallet);
      ethereum.removeListener('chainChanged', onChainIdChange);
      ethereum.removeListener('disconnect', onClearWallet);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { address, chainId, onConnectWallet };
};
