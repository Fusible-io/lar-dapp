// https://eth-goerli.g.alchemy.com/v2/ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);


const getAllNFTS = async () => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner("0x898C148439e6E1F53EC4565662841b1B62AF8687");
    return nfts
  }
  catch (error) {
    console.log(error)
  }
};


export default function handler(req, res) {
  // call alechmy to get all nft for the wallet, and send it's data as json
  getAllNFTS().then(r=>{
    res.status(200).json(r);
  })


}