const NFTfi = require('@nftfi/js');
const ethersjs= require("ethers");
// import dotenv from 'dotenv';
// dotenv.config();
//let provider = new ethersjs.providers.getDefaultProvider(process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL);
let randomWallet = ethersjs.Wallet.createRandom();
let provider = ethersjs.getDefaultProvider();

let wallet = randomWallet.connect(provider);

console.log(NFTfi);

const nftfi = await NFTfi.init({

  //   //   account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
  //      account: {address:wallet.address},
  //       provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL },
  // //      web3:{provider:provider}
      config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
      ethereum: {
        account: { signer: wallet,address:wallet.address },
        provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
      },
      web3:{provider:provider},
      logging:{verbose:true}
});

async function run() {
  // Init the NFTfi SDK
  // const nftfi = await NFTfi.init({
  //   config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
  //   ethereum: {
  //     account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
  //     provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
  //   }
  // });
  // Get loans
  const loans = await nftfi.loans.get({
    filters: {
      counterparty: 'lender',
      status: 'escrow'
    }
  });
  console.log(`[INFO] found ${loans.length} active loan(s) for account ${nftfi.account.getAddress()}.`);
  // Proceed if we find loans
  if (loans.length > 0) {
    for (var i = 0; i < loans.length; i++) {
      const loan = loans[i];
      console.log(`[INFO] on ${nftfi.config.website.baseURI}/assets/${loan.nft.address}/${loan.nft.id}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
