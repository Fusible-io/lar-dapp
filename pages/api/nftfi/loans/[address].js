import NFTfi from "@nftfi/js";
import { ethers as ethersjs } from "ethers";

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
  network: Network.ETH_GOERLI,
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
      url: "https://eth-goerli.g.alchemy.com/v2/I8sUm_xAMMW6ZacAhq97c-l2rqwChRh7",
    },
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
    return { error: "fuck api" };
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
