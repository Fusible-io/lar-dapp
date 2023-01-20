import create from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants";

export const useLoan = create(
  persist(
    (set, get) => ({
      loan: null,
      setLoan: (loan) => set({ loan }),
      clearLoan: () => set({ loan: null }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.LOAN,
      getStorage: () => localStorage,
    }
  )
);

export const useAllNfts = create(
  persist(
    (set, get) => ({
      allNfts: null,
      setAllNfts: (allNfts) => set({ allNfts }),
      clearAllNfts: () => set({ allNfts: null }),
      getOneNft: (contractAddress, tokenId) => {
        const allNfts = get().allNfts;
        if (!allNfts) return null;
        return allNfts.find(
          (nft) =>
            nft.contractAddress === contractAddress && nft.tokenId === tokenId
        );
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.ALL_NFTS,
      getStorage: () => localStorage,
    }
  )
);

export const useOffer = create(
  persist(
    (set, get) => ({
      offer: null,
      setOffer: (offer) => set({ offer }),
      clearOffer: () => set({ offer: null }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.OFFER,
      getStorage: () => localStorage,
    }
  )
);


export const useNFTFi = create((set, get) => ({
  nftfi: null,
  setNFTFi: (nftfi) => set({ nftfi }),
  clearNFTFi: () => {
    set({ nftfi: null });
    window?.localStorage?.removeItem("sdkToken");
  },
}));



export const useNFTFiToken = create((set, get) => ({
  nftfiToken: null,
  setNFTFiToken: (nftfiToken) => set({ nftfiToken }),
  clearNFTFiToken: () => set({ nftfiToken: null }),
}));
