import { message } from "antd";
import React from "react";
import { useAccount } from "wagmi";

const ARCADE_BASE_URL = "https://api-v2.arcade.xyz/api/v2";
// const ARCADE_BASE_URL = "https://api-goerli.arcade.xyz/api/v2";
const ARCADE_GET_LISTING_URL = `${ARCADE_BASE_URL}/lend`;
const ARCADE_GET_ACCOUNT_URL = `${ARCADE_BASE_URL}/accounts`;
const ARCADE_GET_COLLECTION_URL = `${ARCADE_BASE_URL}/collections`;
const GET_LOAN_ACTIVITY_URL = `https://protocol-sg.xyz/subgraphs/name/arcade/protocol-v2`;

const API_KEY = "8oxZonLw41aVdBqJxvcHE4CbJKmlrX5yQXApYaOOAi0MIBxJi";

export default function Arcade() {
  const { address } = useAccount();

  const triggerAracde = async () => {
    if (!address) return message.warning("Please connect your wallet first");

    // await getAccountDetails();
    // await getCollection();
    //     await getListing();
    //    await getLoanTerms();
    //    await getAssestsDetails();
    await getLoanActivity();
  };

  const getAccountDetails = async () => {
    const url = `${ARCADE_GET_ACCOUNT_URL}/${address}`;

    const expiresAt = (Date.now() + 10 * 1000).toString();

    // TODO: hide api key

    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "x-expires-at": expiresAt,
      },
    });
    const data = await res.json();
    console.log({ data });
  };

  const getListing = async () => {
    const url = `${ARCADE_GET_LISTING_URL}`;

    const expiresAt = (Date.now() + 10 * 1000).toString();
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "x-expires-at": expiresAt,
      },
    });
    const data = await res.json();
    console.log({ data });

    const fileredData = data.filter(
      (item) => item.collateralOwnerId.toLowerCase() === address.toLowerCase()
    );

    console.log({ fileredData });
  };

  const getCollection = async () => {
    const url = `${ARCADE_GET_COLLECTION_URL}`;

    const expiresAt = (Date.now() + 10 * 1000).toString();
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "x-expires-at": expiresAt,
      },
    });
    const data = await res.json();
    console.log({ data });
  };

  const getLoanTerms = async () => {
    const ARCADE_GET_COLLECTION_URL = `${ARCADE_BASE_URL}/accounts/${address}/loanterms`;
    const expiresAt = (Date.now() + 10 * 1000).toString();
    const res = await fetch(ARCADE_GET_COLLECTION_URL, {
      headers: {
        "x-api-key": API_KEY,
        "x-expires-at": expiresAt,
      },
    });
    const data = await res.json();
    console.log({ data });
  };

  const getAssestsDetails = async () => {
    // https://shuttle-goerli.arcade.xyz/api/v2/accounts/0xF8a406465e9360E7a69f04b35c290891093E147b/assets
    const GET_ASSETS_URL = `${ARCADE_BASE_URL}/accounts/${address}/assets`;
    const expiresAt = (Date.now() + 10 * 1000).toString();
    const res = await fetch(GET_ASSETS_URL, {
      headers: {
        "x-api-key": API_KEY,
        "x-expires-at": expiresAt,
      },
    });
    const data = await res.json();
    console.log({ data });
  };

  const getLoanActivity = async () => {
    // https://goerli-sg.arcade.xyz/subgraphs/name/arcade/protocol-v2
    // https://protocol-sg.arcade.xyz/subgraphs/name/arcade/protocol-v2

    const payload = {
      query:
        "\n  query GetActivity($id: String!) {\n    account(id: $id) {\n      loanAsBorrower {\n        id\n        state\n        createdAt\n        createdAtTx\n        loanCoreLoanId\n        lender {\n          id\n        }\n        borrower {\n          id\n        }\n        loanTerms {\n          collateralKind\n          loanCoreLoanId\n          principal\n          durationSecs\n          interestRate\n          payableCurrency\n          collateralBundleSnapshot {\n            tokenId\n            vaultAddress\n            collateral {\n              contract\n              tokenId\n              type\n            }\n          }\n          collateralSnapshot {\n            contract\n            tokenId\n            type\n            amount\n          }\n        }\n      }\n\n      loanAsLender {\n        id\n        state\n        createdAt\n        createdAtTx\n        loanCoreLoanId\n        borrower {\n          id\n        }\n        lender {\n          id\n        }\n        loanTerms {\n          collateralKind\n          loanCoreLoanId\n          principal\n          durationSecs\n          interestRate\n          payableCurrency\n          collateralBundleSnapshot {\n            tokenId\n            vaultAddress\n            collateral {\n              contract\n              tokenId\n              type\n            }\n          }\n          collateralSnapshot {\n            contract\n            tokenId\n            type\n            amount\n          }\n        }\n      }\n    }\n  }\n",
      variables: {
        id: address.toLowerCase(),
      },
      operationName: "GetActivity",
    };

    const res = await fetch(GET_LOAN_ACTIVITY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log({ data });
  };

  const getNFTMetadata = async (contract, tokenId) => {

    const GET_NFT_METADATA_URL = `${ARCADE_BASE_URL}/collections/${contract}/assets/${tokenId}`;
    const res = await fetch(GET_NFT_METADATA_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await res.json();
    console.log({ data });
  };

  return (
    <>
      <button onClick={triggerAracde}>click</button>
    </>
  );
}
