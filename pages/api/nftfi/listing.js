import NFTfi from "@nftfi/js";
import { ethers as ethersjs } from "ethers";
// import dotenv from 'dotenv';
// dotenv.config();
//let provider = new ethersjs.providers.getDefaultProvider(process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL);
let randomWallet = ethersjs.Wallet.createRandom();
let provider = ethersjs.getDefaultProvider();

//import { ListData } from "../../components/Data/Data";
let wallet = randomWallet.connect(provider);

const nftfi = await NFTfi.init({
  //   //   account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
  //      account: {address:wallet.address},
  //       provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL },
  // //      web3:{provider:provider}
  config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
  ethereum: {
    account: { signer: wallet, address: wallet.address },
    provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL },
  },
  web3: { provider: provider },
  logging: { verbose: true },
});

async function run() {
  // Init the NFTfi SDK
  console.log(wallet.address);

  //Get listings
  const listings = await nftfi.listings.get({
    pagination: {
      limit: 5,
      page: 1,
    },
  });
  console.log(`[INFO] found ${listings.length} listing(s).`);
  // Proceed if we find listings
  // if (listings.length > 0) {
  //   for (var i = 0; i < listings.length; i++) {
  //     const listing = listings[i];
  //     console.log(`[INFO] listing #${i + 1}: ${JSON.stringify(listing)}`);
  //   }
  // }
  return listings;
}

export default function handler(req, res) {
  run().then((r) => {
    res.status(200).json(r);
  });
}
