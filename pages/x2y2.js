import { message } from "antd";
import React from "react";
import { useAccount } from "wagmi";

// const BASE_URL = "https://goerli-loan-api.x2y2.org/v1";
const BASE_URL = "https://loan-api.x2y2.org/v1";
const GET_CURRENT_BORROW_LOANS = `${BASE_URL}/order/currentBorrowLoans`;
const GET_SYSTEM_PARAMS = `${BASE_URL}/sys/loanParam`;
const API_KEY = "6e8d6ebbc1941f8345eb661de9997fd6";
const ADDRESS = "0xC28F7Ee92Cd6619e8eEC6A70923079fBAFb86196";

export default function X2Y2() {
  const { address } = useAccount();

  const triggerClick = async () => {
    if (!address) return message.warning("please connect wallet");
    // await getCurrentBorrowLoans();
    const sysParams = await getSystemParams();
    console.log({
      sysParams: sysParams.data.collections,
    });
    const NFTS = await getAllNFTS(sysParams.data.collections);
    console.log({
      NFTS,
    });

    const offers = await Promise.all(
      NFTS.ownedNfts.map(async (item, idx) => {
        const offers = await getOffersForAnNFT(
          item.contract.address, 
          item.tokenId
        );
        NFTS.ownedNfts[idx].offers = offers.data?.list;
        return offers;
      })
    );

    console.log(NFTS.ownedNfts);
  };

  const getOffersForAnNFT = async (nftAddress, tokenId) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": API_KEY },
    };

    const response = await fetch(
      `https://loan-api.x2y2.org/v1/offer/list?nftAddress=${nftAddress}&tokenId=${tokenId}&isSufficient=1&duration=0&page=1&pageSize=10&sortField=createTime&sortDirection=desc&hasCollection=1`,
      options
    );
    const res = await response.json();
    console.log(res);
    return res;
  };

  const getAllNFTS = async (contractAddressesList = []) => {
    const res = await fetch("/api/nft", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: ADDRESS,
        contractAddresses: contractAddressesList.map((item) => item.nftAddress),
        network: "mainnet",
      }),
    });
    return res.json();
  };

  const getMyNFTOffers = async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": API_KEY },
    };

    fetch(
      `https://loan-api.x2y2.org/v1/offer/myOfferList?userAddress=${ADDRESS}&page=1&pageSize=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const getCurrentBorrowLoans = async () => {
    const x_timestamp = Date.now();
    const options = {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        accept: "application/json",
        "x-timestamp": x_timestamp,
      },
    };

    fetch(
      `${GET_CURRENT_BORROW_LOANS}?userAddress=${address}&page=1&pageSize=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const getSystemParams = async () => {
    const x_timestamp = Date.now();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": API_KEY,
        "x-timestamp": x_timestamp,
      },
    };

    const res = await fetch(`${GET_SYSTEM_PARAMS}`, options);
    return res.json();
  };

  return <div onClick={triggerClick}>click</div>;
}

export async function getDataX2y2(nft) {
  try {
    const now = Math.floor(Date.now() / 1e3);
    const res = await fetch(
      `https://loan-api.x2y2.org/v1/offer/list?nftAddress=${nft.toLowerCase()}&tokenId=0`,
      {
        headers: requestHeaders,
      }
    )
      .then((res) => res.json())
      .then((res) => res.data.list);
    const result = [];
    res.forEach((res) => {
      if (res.expireTime >= now) {
        result.push({
          token: res.erc20Address,
          amount: res.amount,
          repayment: res.repayment,
          apr: res.apr,
          expires: res.expireTime,
          adminFee: res.adminFee,
          duration: res.duration,
          url: "https://x2y2.io/loan",
        });
      }
    });
    return result;
  } catch (error) {
    console.error(`Failed to get X2Y2 data: ${error}`);
    return [];
  }
}
