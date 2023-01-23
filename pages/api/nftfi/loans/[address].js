import NFTfi from "@nftfi/js";
import { ethers as ethersjs } from "ethers";

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MAINNET,
};
const alchemy = new Alchemy(config);
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
    provider: {
      url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL,
    },
  },
  web3: { provider: provider },
  logging: { verbose: true },
});

/***
 * Get Active Loans of a given address
 * @param: address
 */
async function activeLoans(address) {
  try {
    const loans = await nftfi.loans.get({
      filters: {
        counterparty: "borrower",
        address: address,
      },
    });

    return loans;
  } catch (err) {
    console.log(err);
  }
}

async function getNFTMetaDataForLoans(loans) {
  const options = loans.map((loan) => {
    return {
      contractAddress: loan.nft.address,
      tokenId: loan.nft.id,
    };
  });

  try {
    const nfts = await alchemy.nft.getNftMetadataBatch(options);
    // console.log(nfts);
    return nfts;
  } catch (err) {
    console.log(err);
  }
}
/***
 * Get Active Offers of a given address
 * @param: address
 */
async function activeOffers(options) {
  try {
    const offers = await nftfi.offers.get({
      filters: {
        nft: {
          //id: nft.tokenId,
          address: options.nft,
        },
        //lender?.address?.eq
        lender: {
          address: {
            ne: options.address,
          },
        },
        //    validation: {
        //      check: false
        //    }
      },
    });
    //console.log(offers);
    return offers;
  } catch (err) {
    console.log(err);
    return err;
  }
}
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { address } = req.query;

    const response = await activeLoans(address);
    const nfts = await getNFTMetaDataForLoans(response);

    const loans = response.map((loan, index) => {
      const nft = nfts.find((nft) => nft.tokenId === loan.nft.id);

      return {
        ...loan,
        nft: {
          ...loan.nft,
          rawMetadata: nft.rawMetadata,
        },
      };
    });

    res.status(200).json(loans);

    // activeLoans(req.query.address).then((r) => {
    //   res.status(200).json(r);
    // });

    // activeOffers( {address:req.query.address,nft:req.query.nft}).then(r=>{
    //   res.status(200).json(r);
    // });
  }
}
