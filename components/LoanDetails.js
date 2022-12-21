import React from "react";
import ethIcon from "../public/assets/eth_icon.svg";
import Image from "next/image";

const LoanDetails = () => {
  return (
    <div className="mx-10 mt-1 flex">
      <div className="mr-[60px]">
        <h3 className="text-base font-bold text-[#0E0E0E] leading-[150%] font-jakarta">
          Active loans
        </h3>
        <h1 className="font-bold text-[#333333] text-4xl mt-2 font-jakarta">
          3
        </h1>
      </div>
      <div className="mr-[123px]">
        <h3 className="text-base font-bold text-[#0E0E0E] leading-[150%] font-jakarta">
          Available to borrow
        </h3>
        <div className="flex mt-2 items-end">
          <h1 className="font-bold text-[#333333] text-4xl mr-1 -mb-[6px] font-jakarta">
            5.25
          </h1>
          <Image src={ethIcon} alt="ethIcon" />
          <span className="font-bold text-base text-[#0E0E0E] ml-2 -mb-[3px] font-jakarta">
            $7,239
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold text-[#0E0E0E] leading-[150%] font-jakarta">
          Current loan
        </h3>
        <div className="flex mt-2 items-end">
          <h1 className="font-bold text-[#333333] text-4xl mr-1 -mb-[6px] font-jakarta">
            0.29
          </h1>
          <Image src={ethIcon} alt="ethIcon" />
          <span className="font-bold text-base text-[#0E0E0E] ml-2 -mb-[3px] font-jakarta">
            $302
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
