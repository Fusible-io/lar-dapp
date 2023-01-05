// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NFTfi from "@nftfi/js";
import {ethers as ethersjs} from "ethers";
// import dotenv from 'dotenv';
// dotenv.config();
//let provider = new ethersjs.providers.getDefaultProvider(process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL);
let randomWallet = ethersjs.Wallet.createRandom();
let provider = ethersjs.getDefaultProvider();

let wallet = randomWallet.connect(provider);

const nftfi = await NFTfi.init({
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
  console.log(wallet.address);
 
 
  //Get listings
  const listings = await nftfi.listings.get({
    pagination: {
      limit: 5,
      page: 1
    }
  });
  console.log({
    listings
  })
  console.log(`[INFO] found ${listings.length} listing(s).`);
  return listings;
}

export default function handler(req, res) {
  run().then(r=>{
    res.status(200).json(r);
  });
  
}
