import React from "react";
import Image from "next/image";

import AllStarCardImg from "/public/assets/AllStarCardImg.png";
import nftfi from "/public/assets/nftfi.png";

const ListingSummary = () => {
  return (
    <div className="px-24 py-7">
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Listing summary
      </h1>

      <div className="flex justify-between items-center bg-darkBgBlack px-[17px] py-[18px] rounded-[20px] shadow-list filterCustom mb-10">
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

      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Listing summary
      </h1>

      <div className="flex justify-between items-center mb-4">
        <div className="bg-darkBgBlack p-5 border-borderGreen border-4 rounded-[20px] w-[82px] h-[82px] shadow-list filterCustom">
          <Image src={nftfi} alt="nftfi" className="rounded-lg" />
        </div>
        <button
          disabled
          className="h-[59px] w-[115px] rounded-lg bg-darkBg text-base font-jakarta font-semibold text-lightGreen border-[1.3px] border-borderGRGB mb-1 opacity-[0.4]"
        >
          List
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="bg-darkBgBlack p-5 border-borderRed border-4 rounded-[20px] w-[82px] h-[82px] shadow-list filterCustom">
          <Image src={nftfi} alt="nftfi" className="rounded-lg" />
        </div>
        <button className="h-[59px] w-[115px] rounded-lg bg-darkBg text-base font-jakarta font-semibold text-lightGreen border-[1.3px] border-borderGRGB mb-1 opacity-[0.6]">
          List
        </button>
      </div>
    </div>
  );
};

export default ListingSummary;
