// https://eth-goerli.g.alchemy.com/v2/ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);


const getAllNFTS = async () => {
  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner("0xB71C355d2F672C679d13778D41e51de0D291f229");
  return nfts
};


export default function handler(req, res) {
  // call alechmy to get all nft for the wallet, and send it's data as json
  getAllNFTS().then(r=>{
    res.status(200).json(r);
  })


}