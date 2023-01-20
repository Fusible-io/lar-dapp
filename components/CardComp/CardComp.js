import { Button, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatCurrency } from "../core/utils/formatCurrency";
import { ERC20_MAP } from "../core/constant/nftFiConfig";
import { useNFTFi } from "../core/store/store";
import moment from "moment";

const CardComp = ({ id, item }) => {
  const { nftfi } = useNFTFi();

  if (item && item?.offers?.length === 0) return null;

  return (
    <Card
      id={id}
      style={{ width: 185 }}
      cover={
        <Image
          // src={img}
          src={item?.rawMetadata?.image}
          width={185}
          height={185}
          alt="img"
        />
      }
      bordered={false}
    >
      <span className="text-white bg-tagColor rounded absolute top-[14px] font-semibold font-jakarta text-[10px] px-[3px] py-[1px]">
        {/* {listed} */}
      </span>
      <div className="mb-[10px] flex justify-between items-center">
        <p className="font-jakarta font-normal text-[10px] text-white leading-5">
          {item?.title}
          {" #"}
          {item?.tokenId}
        </p>
      </div>
      <div className="flex justify-between items-center mb-[2px]">
        <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
          Borrow
        </p>
        <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
          {moment
            .duration(item?.offers[0]?.terms?.loan?.duration, "second")
            .humanize()}
        </p>
      </div>
      <div className="flex justify-between items-center mb-[14px]">
        <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
          {formatCurrency(
            item?.offers[0]?.terms?.loan?.principal,
            item?.offers[0]?.terms?.loan?.currency
          )}{" "}
          {ERC20_MAP[item?.offers[0]?.terms?.loan?.currency]?.symbol}
        </h4>
        <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
          {nftfi.utils
            .calcApr(
              item?.offers[0]?.terms?.loan?.principal,
              item?.offers[0]?.terms?.loan?.repayment,
              item?.offers[0]?.terms?.loan?.duration / (24 * 60 * 60)
            )
            .toString()
            .substring(0, 5)}
        </h4>
      </div>

      <Link href="/cardDetail">
        <Button
          // disabled={acceptD}
          type="primary"
          className="h-[33px] rounded-lg bg-greenBtn w-full text-xs font-jakarta font-bold text-white mb-[6px] border-none"
        >
          Accept
        </Button>
      </Link>

      {/* <Button
        disabled={offerD}
        className="h-[33px] rounded-lg bg-transparent w-full text-xs font-jakarta font-semibold text-lightGreenT border border-darkBorderG mb-1"
      >
        {offerBtn}
      </Button> */}
    </Card>
  );
};

export default CardComp;
