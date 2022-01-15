Information in this Doc was guided through https://blog.alchemy.com/blog/why-you-should-configure-your-metamask-node-provider

# Setup Test Wallet (Rinkeby)

We need to setup a wallet that can interact with the Rinkeby test net we have setup in Alchemy. Interactions in this test net is how we will be developing things until otherwise.

### 1. Download MetaMask

Go ahead and download the extention on Google Chrome

### 2. Go To Alchemy Dashboard

Here we will need to click on the App we want to use this wallet in. In our case its `SwapEase`. On the dashboard for `SwapEase` we need to click on the `View Key` button and grab the HTTP URL. This is our app's custom RPC. We will need this to create our custom configuration on MetaMask.

### 3. Create Custom Network on MetaMask

Go into your new MetaMask wallet and create a custom network on the network selection panel. Type into the fields these values:

- Network Name: Alchemy - Rinkeby
- New RPC URL: (URL you grabbed in step two)
- Chain ID: 4 (for Rinkeby)
- - The chain ID is used for signing transactions. It must match the chain ID returned by the network. You can enter a decimal or '0x'-prefixed hexadecimal number.

Hit Save and you should now have a test wallet for our app.

### 4. Get Test Eth

We need some test ETH to be able to transact on the Rinkeby network. Go to a faucet that dispenses Rinkeby ETH.

- https://faucets.chain.link/rinkeby
- https://faucet.rinkeby.io/ (May be offline)
