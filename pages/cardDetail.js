import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, List, Select } from "antd";

import CardImage from "/public/assets/CardImage.png";
import Verify from "/public/assets/Verify.svg";
import Nftifi from "/public/assets/nftfi.png";
import UpDownArrow from "/public/assets/updown_arrow.svg";

import ModalComp from "../components/Modal/ModalComp";
import ListingSummary from "../components/ListingSummary/ListingSummary";
import Head from "next/head";
import { useOffer, useNFTFi } from "../components/core/store/store";
import { formatCurrency } from "../components/core/utils/formatCurrency";
import { ERC20_MAP } from "../components/core/constant/nftFiConfig";
import moment from "moment";

const CardDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { offer, setOffer } = useOffer();
  const { nftfi } = useNFTFi();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onIssueLoan = async () => {
    try {
      setLoading(true);
      const result = await nftfi.loans.begin({
        offer: {
          ...offer.offer,
          nft: {
            id: offer?.nft.tokenId,
            address: offer?.nft?.contract?.address,
          },
        },
      });
      setLoading(false);
      console.log({ result });
    }
    catch (err) {
      console.log(err);
    }

  };

  const onAccept = (item) => {
    setOffer({ ...offer, offer: item });
  };

  useEffect(() => {
    console.log({ offer });
  }, [offer])

  return (
    <>
      <Head>
        <title>LAR - DAPP - Borrow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-10 flex justify-between py-10 mt-5">
        <div>
          <Link href="/">
            <button className="bg-[#0D151C] border-none text-white rounded-xl px-4 py-2 font-inter text-base font-normal">
              Back
            </button>
          </Link>
        </div>
        <div>
          <div className="flex gap-[46px] mb-10">
            <div className="relative">
              <Image
                src={CardImage}
                alt="CardImage"
                className="rounded-xl"
                style={{ height: "435px", width: "395px" }}
              />
              <span className="text-white bg-tagColor rounded absolute top-[18px] left-[17px] font-semibold font-jakarta text-[11px] px-[3px] py-[1px]">
                Listed 1/3
              </span>
            </div>
            <div>
              <h3 className="flex items-center font-jakarta text-base font-normal mb-2">
                {offer?.nft?.contract?.name}
                <Image src={Verify} alt="Verify" />
              </h3>
              <h1 className="font-jakarta text-[28px] font-medium mb-[47px]">
                {offer?.nft?.title} #{offer?.nft?.tokenId}
              </h1>
              <div className="bg-[#090C12] border-[#1B2236] border shadow-list rounded-2xl">
                <div className="border-b border-[#1B2236] px-[22px] py-[17px]">
                  <h1 className="text-[#76D191] font-jakarta text-base font-medium mb-[13px]">
                    Blitz Loan
                  </h1>

                  <Select
                    defaultValue="Rank: best loan value"
                    className="w-full h-11"
                    onChange={(e) => console.log(e)}
                    showArrow={false}
                    options={[
                      {
                        value: "Rank: low loan value",
                        label: (
                          <div className="flex">
                            <Image src={UpDownArrow} alt="UpDownArrow" />
                            <p className="ml-2 font-jakarta font-semibold text-base text-white">
                              Rank: low loan value
                            </p>
                          </div>
                        ),
                      },
                      {
                        value: "Rank: best loan value",
                        label: (
                          <div className="flex">
                            <Image src={UpDownArrow} alt="UpDownArrow" />
                            <p className="ml-2 font-jakarta font-semibold text-base text-white">
                              Rank: best loan value
                            </p>
                          </div>
                        ),
                      },
                      {
                        value: "Rank: high loan value",
                        label: (
                          <div className="flex">
                            <Image src={UpDownArrow} alt="UpDownArrow" />
                            <p className="ml-2 font-jakarta font-semibold text-base text-white">
                              Rank: high loan value
                            </p>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="px-[22px] py-[21px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-end mr-12">
                      <h1 className="font-jakarta text-2xl font-semibold mr-2">
                        {formatCurrency(
                          offer?.offer?.terms?.loan?.principal,
                          offer?.offer?.terms?.loan?.currency
                        )}{" "}
                        {ERC20_MAP[offer?.offer?.terms?.loan?.currency]?.symbol}
                      </h1>
                      <span className="font-jakarta text-sm font-normal text-[#5D6785]">
                        $10,084.83
                      </span>
                    </div>
                    <Image src={Nftifi} alt="Nftifi" width={20} height={20} />
                  </div>
                  <p className="font-jakarta text-sm font-normal leading-5 mb-5">
                    34% APY <span className="text-[#5D6785]">for</span>{" "}
                    {moment
                      .duration(offer?.offer?.terms?.loan?.duration, "second")
                      .humanize()}
                    <br /> <span className="text-[#5D6785]">You repay</span>{" "}
                    {formatCurrency(
                      offer?.offer?.terms?.loan?.repayment,
                      offer?.offer?.terms?.loan?.currency
                    )}{" "}
                    {ERC20_MAP[offer?.offer?.terms?.loan?.currency]?.symbol}
                  </p>
                  <Button
                    loading={loading}
                    onClick={() => onIssueLoan()}
                    type="primary"
                    className="h-[44px] rounded-lg bg-greenBtn w-full text-base font-jakarta font-bold text-white mb-[6px] border-none"
                  >
                    Issue Loan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <List
              header={
                <div className="flex">
                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6">
                    Principal
                  </h1>

                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6">
                    Duration
                  </h1>

                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6">
                    Payoff
                  </h1>

                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6">
                    APR
                  </h1>

                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6"></h1>

                  <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/6"></h1>
                </div>
              }
              bordered
              dataSource={offer?.nft?.offers}
              renderItem={(item) => {
                return (
                  <div
                    className="flex justify-between items-center pb-3 first:pt-2"
                    key={item.id}
                  >
                    <div className="w-1/6">
                      <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                        {formatCurrency(
                          item?.terms?.loan?.principal,
                          item?.terms?.loan?.currency
                        )}{" "}
                        {ERC20_MAP[item?.terms?.loan?.currency]?.symbol}
                      </p>
                    </div>

                    <div className="w-1/6">
                      <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                        {moment
                          .duration(item?.terms?.loan?.duration, "second")
                          .humanize()}
                      </p>
                    </div>

                    <div className="w-1/6">
                      <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                        {formatCurrency(
                          item?.terms?.loan?.repayment,
                          item?.terms?.loan?.currency
                        )}{" "}
                        {ERC20_MAP[item?.terms?.loan?.currency]?.symbol}
                      </p>
                    </div>

                    <div className="w-1/6">
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

                    <div className="flex justify-center items-center w-1/6">
                      <Image
                        src={Nftifi}
                        alt="nftfi"
                        className="rounded-full"
                        width={20}
                        height={20}
                      />
                    </div>

                    <div className="flex items-center justify-end w-1/6">
                      <button
                        onClick={() => onAccept(item)}
                        className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={showModal}
            className="text-white font-inter text-base font-normal"
          >
            List ↗
          </button>
        </div>
      </div>

      <ModalComp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        content={<ListingSummary />}
      />
    </>
  );
};

export default CardDetail;
