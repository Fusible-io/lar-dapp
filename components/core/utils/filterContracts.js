// filter all the whiltested contracts from the list of contracts
import { whitelistNFTAddresList } from "../constant/whitelistNFTAddress";

export const filterContracts = (address) => {
  return whitelistNFTAddresList.includes(address);
};
