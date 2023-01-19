import { List } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import Avatar from "/public/assets/avatar.jpg";
import nftfi_logo from "/public/assets/nftfi.png";
import arcade_logo from "/public/assets/arcade.png";
import StatusComp from "../StatusComp/StatusComp";
import moment from "moment";

import { formatCurrency } from "../core/utils/formatCurrency";
import { ERC20_MAP } from "../core/constant/nftFiConfig";
import { useLoan, useNFTFi } from "../core/store/store";

import { useAccount } from "wagmi";
const BASE_URL = "https://api-goerli.arcade.xyz/api/v2";
const API_KEY = "4LFr808gFjR1XEQ4He2wwlF3IPrCEFgee7JjATN7jEEoes0F3";

const ManageTable = () => {
  const [loading, setLoading] = useState(false);
  const [loadingArcade, setLoadingArcade] = useState(false);
  const [activeLoansList, setActiveLoansList] = useState([]);
  const [activeLoansListArcade, setActiveLoansListArcade] = useState([]);
  const { nftfi } = useNFTFi();
  const { address } = useAccount();
  const { setLoan } = useLoan();

  useEffect(() => {
    if (!address) return;
    getActiveLoans();
    getLoanActivityArcade();
  }, [address]);

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onRepay = (loan) => {
    setLoan(loan);
    Router.push("/repay");
  };

  const onAracdeRepay = (loan) => {
    // https://goerli.arcade.xyz/terms/loan/0x398deeb51c56819880f2a2343705510a0c868747-61
    const url = `https://goerli.arcade.xyz/terms/loan/${loan.id}`;
    window.open(url, "_blank");
  }

  const getNFTMetadata = async (contract, tokenId) => {
    // https://shuttle-goerli.arcade.xyz/api/v2/collections/0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b/assets/2740179

    const GET_NFT_METADATA_URL = `${BASE_URL}/collections/${contract}/assets/${tokenId}`;
    const res = await fetch(GET_NFT_METADATA_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    if (!res) return null;
    const data = await res.json();
    if (!data) return null;
    return data;
  };

  const getLoanActivityArcade = async () => {
    setLoadingArcade(true);
    // https://goerli-sg.arcade.xyz/subgraphs/name/arcade/protocol-v2

    const GET_LOAN_ACTIVITY_URL = `https://goerli-sg.arcade.xyz/subgraphs/name/arcade/protocol-v2`;
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

    if (
      data &&
      data.data &&
      data.data.account &&
      data.data.account.loanAsBorrower
    ) {
      // const resultArray = await Promise.all(inputArray.map(async (i) => someAsyncFunction(i)));

      const updatedList = await Promise.all(
        data.data.account.loanAsBorrower.map(async (item) => {
          // fetch metadata for nft

          // check if loanTerms.collateralKind === ASSET than call getNFTMetadata by passing loanTerms.collateralSnapshot.contract & loanTerms.collateralSnapshot.tokenId
          if (item.loanTerms.collateralKind === "ASSET") {
            const nftMetadata = await getNFTMetadata(
              item.loanTerms.collateralSnapshot.contract,
              item.loanTerms.collateralSnapshot.tokenId
            );
            item.metadata = nftMetadata.metadata;
          }

          return {
            ...item,
            createdAt: moment.unix(item.createdAt),
          };
        })
      );

      console.log(updatedList);
      setActiveLoansListArcade(updatedList);
      setLoading(false);
    }

    setLoadingArcade(false);
  };

  const getActiveLoans = async () => {
    try {
      setLoading(true);
      // http://localhost:3000/api/nftfi/loans/0xB71C355d2F672C679d13778D41e51de0D291f229
      fetch(`/api/nftfi/loans/${address}`, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log({ res });
          setActiveLoansList(res);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore =
    !loading && !loading ? (
      <div className="flex justify-center items-center absolute left-0 right-0 -bottom-5">
        <button
          onClick={onLoadMore}
          className="bg-darkBg border-2 border-darkBorder py-[3px] px-[9px] rounded-lg text-lightGreen text-lg font-medium"
        >
          See more
        </button>
      </div>
    ) : null;

  return (
    <div className="mx-10 mt-14">
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Manage your loans NFT Fi
      </h1>

      <div>
        <List
          header={
            <div className="flex px-[18px]">
              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-left w-3/12">
                Items
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Principal
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Duration
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Payoff
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12 pr-5">
                APR
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Status
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-2/12 pr-10">
                Expires
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>
            </div>
          }
          bordered
          dataSource={activeLoansList}
          // loadMore={loadMore}
          loading={loading}
          renderItem={(item) => {
            if (item.borrower.address.toLowerCase() !== address.toLowerCase())
              return null;
            return (
              <div className="flex justify-between items-center px-[18px] pb-4">
                <div className="flex items-center w-3/12 my-2">
                  <Image
                    src={item?.nft?.rawMetadata?.image}
                    width={20}
                    height={20}
                    alt="Avatar"
                    className="rounded"
                  />
                  <p className="font-semibold font-jakarta text-base text-lightTextC ml-2">
                    {item?.nft?.name} #{item?.nft?.id}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {formatCurrency(
                      item.terms.loan.principal,
                      item.terms.loan.currency
                    )}{" "}
                    {ERC20_MAP[item.terms.loan.currency].symbol}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {moment
                      .duration(item?.terms?.loan?.duration, "second")
                      .humanize()}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {formatCurrency(
                      item.terms.loan.repayment,
                      item.terms.loan.currency
                    )}{" "}
                    {ERC20_MAP[item.terms.loan.currency].symbol}
                  </p>
                </div>

                <div className="w-1/12 pr-5">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {nftfi.utils
                      .calcApr(
                        item?.terms?.loan?.principal,
                        item?.terms?.loan?.repayment,
                        item?.terms?.loan?.duration / (24 * 60 * 60)
                      )
                      .toString()
                      .substring(0, 5)}
                  </p>
                </div>

                <div className="w-1/12">
                  <StatusComp status={item.status} />
                </div>

                <div className="w-2/12 pr-10">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right">
                    {moment(item?.date?.started)
                      .add(item?.terms?.loan?.duration, "seconds")
                      .format("DD MMM YY HH:mm ")
                      .toString()}
                  </p>
                </div>

                <div className="flex justify-center items-center w-1/12">
                  <Image
                    src={nftfi_logo}
                    alt="nftfi"
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="flex items-center justify-end w-1/12">
                  {item.status === "repaid" ? (
                    <button
                      disabled
                      onClick={() => onRepay(item)}
                      className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder cursor-not-allowed opacity-[0.2]"
                    >
                      Repay
                    </button>
                  ) : (
                    <button
                      onClick={() => onRepay(item)}
                      className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder"
                    >
                      Repay
                    </button>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Arcade Table */}
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Manage your loans Arcade
      </h1>

      <div>
        <List
          header={
            <div className="flex px-[18px]">
              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-left w-3/12">
                Items
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Principal
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Duration
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Payoff
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12 pr-5">
                APR
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Status
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-2/12 pr-10">
                Expires
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>
            </div>
          }
          bordered
          dataSource={activeLoansListArcade}
          // loadMore={loadMore}
          loading={loadingArcade}
          renderItem={(item) => {
            return (
              <div className="flex justify-between items-center px-[18px] pb-4">
                <div className="flex items-center w-3/12 my-2">
                  <Image
                    src={item?.metadata?.image || arcade_logo}
                    width={20}
                    height={20}
                    alt="Avatar"
                    className="rounded"
                  />
                  <p className="font-semibold font-jakarta text-base text-lightTextC ml-2">
                    {item?.loanTerms?.collateralKind === "ASSET" ? (
                      <>
                        {item?.metadata?.name}
                        {" #"}
                        {item?.loanTerms?.collateralSnapshot?.tokenId}
                      </>
                    ) : (
                      <>Asset Vault</>
                    )}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {formatCurrency(
                      item?.loanTerms?.principal,
                      item?.loanTerms?.payableCurrency
                    )}{" "}
                    {ERC20_MAP[item?.loanTerms?.payableCurrency]?.symbol}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {moment
                      .duration(item?.loanTerms?.durationSecs, "second")
                      .humanize()}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {/* {formatCurrency(
                      item.terms.loan.repayment,
                      item.terms.loan.currency
                    )}{" "}
                    {ERC20_MAP[item.terms.loan.currency].symbol} */}
                  </p>
                </div>

                <div className="w-1/12 pr-5">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {nftfi.utils
                      .calcApr(
                        item?.terms?.loan?.principal,
                        item?.terms?.loan?.repayment,
                        item?.terms?.loan?.duration / (24 * 60 * 60)
                      )
                      .toString()
                      .substring(0, 5)}
                  </p>
                </div>

                <div className="w-1/12 flex justify-end items-center">
                  <StatusComp status={item.state} />
                </div>

                <div className="w-2/12 pr-10">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right">
                    {moment(item?.createdAt)
                      .add(item?.loanTerms?.durationSecs, "seconds")
                      .format("DD MMM YY HH:mm ")
                      .toString()}
                  </p>
                </div>

                <div className="flex justify-center items-center w-1/12">
                  <Image
                    src={arcade_logo}
                    alt="arcade"
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="flex items-center justify-end w-1/12">
                  {item.state === "Repaid" ? (
                    <button
                      disabled
                      // onClick={() => onRepay(item)}
                      className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder cursor-not-allowed opacity-[0.2]"
                    >
                      Repay
                    </button>
                  ) : (
                    <button
                      onClick={() => onAracdeRepay(item)}
                      className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder"
                    >
                      Repay
                    </button>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManageTable;
