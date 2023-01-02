import { Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";

import AllStarCardImg from "/public/assets/AllStarCardImg.png";
import nftfi from "/public/assets/nftfi.png";
import ethIcon from "/public/assets/eth_icon.svg";

const LoanSummary = ({ setIsModalOpen }) => {
  const [approve, setApprove] = useState(false);
  const [closeLoan, setCloseLoan] = useState(false);

  return (
    <div>
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Loan summary
      </h1>

      <div className="flex flex-wrap gap-[8px] mb-14">
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[251px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              Collateral
            </h2>
            <p className="font-inter font-normal text-base text-white80">
              Daigaiku #132
            </p>
          </div>
          <Image
            src={AllStarCardImg}
            alt="AllStarCardImg"
            className="rounded-xl"
            width={55}
            height={60}
          />
        </div>
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[168px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              Principal
            </h2>
            <div className="flex mt-2 items-center">
              <h1 className="font-normal text-base mr-1 font-inter text-white80">
                5.25
              </h1>
              <Image src={ethIcon} alt="ethIcon" width={12} height={19} />
              <span className="font-normal text-xs ml-2 -mb-[3px] font-inter text-white80">
                $7,239
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[168px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              Repayment
            </h2>
            <div className="flex mt-2 items-center">
              <h1 className="font-normal text-base mr-1 font-inter text-white80">
                5.25
              </h1>
              <Image src={ethIcon} alt="ethIcon" width={12} height={19} />
              <span className="font-normal text-xs ml-2 -mb-[3px] font-inter text-white80">
                $7,239
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[107px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              APR
            </h2>
            <p className="font-inter font-normal text-base text-white80">12%</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[134px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              Duration
            </h2>
            <p className="font-inter font-normal text-base text-white80">
              30 days
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[337px] h-[82px]">
          <div>
            <h2 className="font-inter font-semibold text-base text-white80 mb-1">
              Due (UTC)
            </h2>
            <p className="font-inter font-normal text-base text-white80">
              12th November 2023 at 4:20pm
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list w-[82px] h-[82px]">
          <Image
            src={nftfi}
            alt="nftfi"
            className="rounded-xl"
            width={41}
            height={41}
          />
        </div>
      </div>

      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Confirm
      </h1>

      {closeLoan === true ? (
        <div>
          <Button
            type="primary"
            className="h-[59px] rounded-lg bg-greenBtn w-full text-base font-jakarta font-bold text-white mb-[6px] border-none"
            onClick={() => {
              setIsModalOpen(false);
              setCloseLoan(false);
              setApprove(false);
            }}
          >
            Reapy and close loan
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className="h-[59px] rounded-lg bg-darkBg w-full text-base font-jakarta font-semibold text-lightGreenT border-borderGRGB border-[1.3px] border-darkBorderG mb-[17px]"
            onClick={() => setApprove(true)}
          >
            {approve === true ? "Collection Approved ✔︎" : "Approve Collection"}
          </Button>

          <Button
            disabled={approve === true ? false : true}
            type="primary"
            className="h-[59px] rounded-lg bg-greenBtn w-full text-base font-jakarta font-bold text-white mb-[6px] border-none"
            onClick={() => setCloseLoan(true)}
          >
            Issue Loan
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoanSummary;
