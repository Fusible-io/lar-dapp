// https://eth-goerli.g.alchemy.com/v2/ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);


const getAllNFTS = async (address) => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: ['0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b'],
      pageKey: 1,
      pageSize: 100,
    });
    // console.log({nfts})
    return nfts
  }
  catch (error) {
    console.log(error)
  }
};


export default function handler(req, res) {
  if (req.method === 'POST') {

    const { address } = req.body;
    if (!address) {
      res.status(400).json({ message: 'Address is required' });
    }
    getAllNFTS(address).then(r => {
      res.status(200).json(r);
    })
  }
}