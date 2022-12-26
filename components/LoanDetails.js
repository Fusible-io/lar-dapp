import React from "react";
import ethIcon from "../public/assets/eth_icon.svg";
import Image from "next/image";

const LoanDetails = () => {
  return (
    <div className="mx-10 mt-5">
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Summary
      </h1>

      <div className="flex">
        <div className="mr-2 border border-[#303030CC] rounded-[20px] p-[18px] w-[195px]">
          <h3 className="text-base font-semibold leading-[150%] font-jakarta text-[#CECED0] mb-2">
            Active loans
          </h3>
          <h3 className="text-base font-normal leading-[150%] font-jakarta text-[#CECED0]">
            3
          </h3>
        </div>
        <div className="mr-2 border border-[#303030CC] rounded-[20px] p-[18px] w-[253px]">
          <h3 className="text-base font-semibold leading-[150%] font-jakarta text-[#CECED0] mb-2">
            Available to borrow
          </h3>
          <div className="flex mt-2 items-center">
            <h1 className="font-normal text-base mr-1 font-jakarta text-[#CECED0]">
              5.25
            </h1>
            <Image src={ethIcon} alt="ethIcon" width={12} height={19} />
            <span className="font-normal text-xs ml-2 -mb-[3px] font-jakarta text-[#CECED0]">
              $7,239
            </span>
          </div>
        </div>
        <div className="border border-[#303030CC] rounded-[20px] p-[18px] w-[253px]">
          <h3 className="text-base font-semibold leading-[150%] font-jakarta text-[#CECED0] mb-2">
            Current loan
          </h3>
          <div className="flex mt-2 items-center">
            <h1 className="font-normal text-base mr-1 font-jakarta text-[#CECED0]">
              0.37
            </h1>
            <Image src={ethIcon} alt="ethIcon" width={12} height={19} />
            <span className="font-normal text-xs ml-2 -mb-[3px] font-jakarta text-[#CECED0]">
              $460.23
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
