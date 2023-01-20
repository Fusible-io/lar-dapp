// https://eth-goerli.g.alchemy.com/v2/ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf

import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const getAllNFTS = async (address, contractAddresses) => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses,
      pageKey: 1,
      pageSize: 100,
    });
    // console.log({nfts})
    return nfts;
  } catch (error) {
    console.log(error);
  }
};

const getAllMainNFTS = async (address, contractAddresses = []) => {
  const configMAIN = {
    apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
    network: Network.ETH_MAINNET,
  };
  const alchemyMAIN = new Alchemy(configMAIN);
  try {
    const nfts = await alchemyMAIN.nft.getNftsForOwner(address, {
      contractAddresses,  
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
    if (req.body.network === "mainnet") {
      const { address, contractAddresses } = req.body;
      if (!address) return res.status(400).json({ error: "address required" });

      getAllMainNFTS(address, contractAddresses).then((r) => {
        return res.status(200).json(r);
      });
    } else {
      const {
        address,
        contractAddresses = ["0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b"],
      } = req.body;
      getAllNFTS(address, contractAddresses).then((r) => {
        return res.status(200).json(r);
      });
    }
  }
}
