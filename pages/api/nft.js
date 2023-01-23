// https://eth-goerli.g.alchemy.com/v2/ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf

import { Alchemy, Network } from "alchemy-sdk";

const getAllMainNFTS = async (address, contractAddresses = []) => {
  const configMAIN = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemyMAIN = new Alchemy(configMAIN);
  try {
    const nfts = await alchemyMAIN.nft.getNftsForOwner(address, {
      // contractAddresses,
      pageKey: 1,
      pageSize: 10,
    });
    return nfts;
  } catch (error) {
    console.log(error);
  }
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { address, contractAddresses } = req.body;
    if (!address) return res.status(400).json({ error: "address required" });

    getAllMainNFTS(address, contractAddresses).then((r) => {
      return res.status(200).json(r);
    });
  }
}
