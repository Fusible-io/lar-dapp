import { Button, Card } from "antd";
import Image from "next/image";
import React from "react";

const CardComp = ({
  img,
  listed,
  name,
  x2y2,
  borrowDay,
  weth,
  apr,
  acceptD,
  offerD,
  offerBtn,
}) => {
  return (
    <Card
      style={{ width: 185 }}
      cover={<Image src={img} alt="img" />}
      bordered={false}
      // className="CardDiv"
    >
      <span className="text-white bg-tagColor rounded absolute top-[14px] font-semibold font-jakarta text-[10px] px-[3px] py-[1px]">
        {listed}
      </span>
      <div className="mb-[10px] flex justify-between items-center">
        <p className="font-jakarta font-normal text-[10px] text-white leading-5">
          {name}
        </p>

        <Image src={x2y2} alt="x2y2" className="rounded" />
      </div>
      <div className="flex justify-between items-center mb-[2px]">
        <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
          Borrow
        </p>
        <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
          {borrowDay}
        </p>
      </div>
      <div className="flex justify-between items-center mb-[14px]">
        <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
          {weth}
        </h4>
        <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
          {apr}
        </h4>
      </div>

      <Button
        disabled={acceptD}
        type="primary"
        className="h-[33px] rounded-lg bg-greenBtn w-full text-xs font-jakarta font-bold text-white mb-[6px] border-none"
      >
        Accept
      </Button>

      <Button
        disabled={offerD}
        className="h-[33px] rounded-lg bg-transparent w-full text-xs font-jakarta font-semibold text-lightGreenT border border-darkBorderG mb-1"
      >
        {offerBtn}
      </Button>
    </Card>
  );
};

export default CardComp;
