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

// Do no persist nftfi instance

export const useNFTFi = create((set, get) => ({
  nftfi: null,
  setNFTFi: (nftfi) => set({ nftfi }),
  clearNFTFi: () => {
    set({ nftfi: null });
    window?.localStorage?.removeItem("sdkToken");
  },
}));

export const useAddressStore = create((set, get) => ({
  address: null,
  setAddress: (address) => set({ address }),
  clearAddress: () => set({ address: null }),
}));

// export const useMatch = create(
//     persist(
//         (set, get) => ({
//             match: null,
//             setMatch: (match) => set({ match }),
//             clearMatch: () => set({ match: null }),
//         }),
//         {
//             name: LOCAL_STORAGE_KEYS.MATCH,
//             getStorage: () => localStorage,
//         }
//     )
// );

// export const useEntry = create(
//     persist(
//         (set, get) => ({
//             entry: null,
//             setEntry: (entry) => set({ entry }),
//             clearEntry: () => set({ entry: null }),
//         }),
//         {
//             name: LOCAL_STORAGE_KEYS.ENTRY,
//             getStorage: () => localStorage,
//         }
//     )
// );

// export const useChain = create(
//     persist(
//         (set, get) => ({
//             chain: null,
//             setChain: (chain) => set({ chain }),
//             clearChain: () => set({ chain: null }),
//         }),
//         {
//             name: LOCAL_STORAGE_KEYS.CHAIN,
//             getStorage: () => localStorage,
//         }
//     )
// );

// export const useActiveKey = create(
//     persist(
//         (set, get) => ({
//             activeKey: MATCH_TYPES.UPCOMING,
//             setActiveKey: (activeKey) => set({ activeKey }),
//         }),
//         {
//             name: LOCAL_STORAGE_KEYS.ACTIVE_KEY,
//             getStorage: () => localStorage,
//         }
//     )
// );
