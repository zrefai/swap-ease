### Adding Ethereum to window globally

// declare global {
// interface Window {
// ethereum: any;
// }
// }

// App should probably start with asking the user to sign into meta mask from the start or ask them
// to do so at some point later.

- https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents

### Checking for metamask provider from window

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

### Using AlchemyProvider from ethers to create a rinkeby network

// Ethers.js
// API key should be stored in DB and called, storing it in .env file can make it public upon inspecting
// const AlchemyProvider = ethers.providers.AlchemyProvider;

// const alchemyProvider = new AlchemyProvider(
// 'rinkeby',
// 'sio3HfFITemtRtiw6OYIlwHvu1Ui68Ec'
// );

To get all NFT tokens in a wallet: - Keep a running list of all token contract addresses and check a wallet address across all those contract addresses - Go through transaction logs of an address and mark down token contract addresses. Either query those contract addresses against the wallet, or try to find balances through transaction log deciphering - Use third party API, - moralis.io

### Create a default provider in rinkeby from etherscan and alchemy api

// const network = 'rinkeby';
// const defaultProvider = ethers.getDefaultProvider(network, {
// etherscan: 'GKNH2UZYW4WEWDFAGPESGY29Y1F3CJMEFC',
// alchemy: 'sio3HfFITemtRtiw6OYIlwHvu1Ui68Ec',
// });
// const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = walletProvider.getSigner();

// if (typeof ethereum !== 'undefined') {
// console.log('MetaMask is installed!');
// }

// window.ethereum.enable();

### Getting address and block number from provider

// const { ethereum } = window;
// const [blockNumber, setBlockNumber] = useState(0);
// const [address, setAddress] = useState('');

// useEffect(() => {
// getBlockNumber();
// });

#### Block number via default provider

// const getBlockNumber = async () => {
// const response = await defaultProvider.getBlockNumber();
// setBlockNumber(response);
// };

#### Connect via MetaMask

// const connect = async () => {
// await ethereum
// .request({ method: 'eth_requestAccounts' })
// .then(handleAccountsChanged)
// .catch((err: any) => {
// if (err.code === 4001) {
// // EIP-1193 userRejectedRequest error
// // If this happens, the user rejected the connection request.
// console.log('Please connect to MetaMask.');
// } else {
// console.error(err);
// }
// });
// };

// const handleAccountsChanged = (accounts: string[]) => {
// if (accounts.length === 0) {
// console.log('Please connect to MetaMask.');
// } else if (accounts[0] !== address) {
// // This set is actually more like a redux change in the bigger picture
// setAddress(accounts[0]);
// }
// };
