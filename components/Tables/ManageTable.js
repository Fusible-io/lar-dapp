import { List } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Router from "next/router";

import Avatar from "/public/assets/avatar.jpg";
import nftfi_logo from "/public/assets/nftfi.png";
import StatusComp from "../StatusComp/StatusComp";
import moment from "moment";

import { formatCurrency } from "../core/utils/formatCurrency";
import { ERC20_MAP } from "../core/constant/nftFiConfig";
import { useLoan, useNFTFi } from "../core/store/store";

import { useAccount } from "wagmi";

const ManageTable = () => {
  const [loading, setLoading] = useState(false);
  const [activeLoansList, setActiveLoansList] = useState([]);
  const { nftfi } = useNFTFi();
  const { address } = useAccount();
  const { setLoan } = useLoan();

  useEffect(() => {
    if (!address) return;
    getActiveLoans();
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
        Manage your loans
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
          loadMore={loadMore}
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
                  {/* Optional: repay button hide style */}
                  {/* {item.status !== "repaid" && (
                    <button
                      onClick={() => onRepay(item)}
                      className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder"
                    >
                      Repay
                    </button>
                  )} */}

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
    </div>
  );
};

export default ManageTable;
