import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "ZO2K8B4HiXAgQbx0F5Eywmn6W6Srfxmf",
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);


const getSingleNFTData = async ({
    contractAddress,
    tokenId
}) => {
    try {
        // const nft = await alchemy.nft.getNftMetadata({
        //     contractAddress: contractAddress.toString(),
        //     tokenId: tokenId.toString()
        // });
        const response = await alchemy.nft.getNftMetadata(
            "0x5180db8F5c931aaE63c74266b211F580155ecac8",
            "1590"
          );
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { contractAddress, tokenId } = req.body;
        console.log({
            body: req.body,
        })

        if (!contractAddress) {
            return res.status(400).json({ message: 'Contract address is required' });
        }
        if (!tokenId) {
            return res.status(400).json({ message: 'Token ID is required' });
        }
        const nft = await getSingleNFTData({
            contractAddress,
            tokenId
        });

        return res.status(200).json(nft);
    }
}