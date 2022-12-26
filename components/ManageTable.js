import { List } from "antd";
import Image from "next/image";
import React from "react";

import Avatar from "../public/assets/avatar.jpg";
import nftfi from "../public/assets/nftfi.jpg";
import Status from "./Status";

const data = [
  {
    key: "1",
    items: "DigiDaigaku #2004",
    principal: "9.23 WETH",
    duration: "30 d",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: "48h",
    expires: "12 Nov 22 19:35",
  },
  {
    key: "2",
    items: "DigiDaigaku #1319",
    principal: "5.34 WETH",
    duration: "30 d",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: "Soon",
    expires: "12 Nov 22 19:35",
  },
  {
    key: "3",
    items: "Renga #234",
    principal: "0.62 WETH",
    duration: "30 d",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: "Active",
    expires: "12 Nov 22 19:35",
  },
  {
    key: "4",
    items: "Bored Ape Yacht Club...",
    principal: "56.23 WETH",
    duration: "30 d",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: "Closed",
    expires: "12 Nov 22 19:35",
  },
];

const loadMore = (
  <div className="flex justify-center items-center absolute left-0 right-0 -bottom-5">
    <button className="bg-[#080B11] border-2 border-[#254134] py-[3px] px-[9px] rounded-lg text-[#8FFFAF] text-lg font-medium">
      See more
    </button>
  </div>
);

const ManageTable = () => {
  return (
    <div className="mx-10 mt-14">
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Manage your loans
      </h1>

      <div>
        <List
          header={
            <div className="flex">
              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-left w-3/12">
                Items
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12">
                Principal
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12">
                Duration
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12">
                Payoff
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12 pr-5">
                APR
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12">
                Status
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-2/12 pr-10">
                Expires
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12"></h1>

              <h1 className="font-medium text-sm font-jakarta text-[#C7D8C9] text-right w-1/12"></h1>
            </div>
          }
          bordered
          dataSource={data}
          loadMore={loadMore}
          renderItem={(item) => {
            return (
              <div className="flex justify-between items-center">
                <div className="flex items-center w-3/12 my-2">
                  <Image src={Avatar} alt="Avatar" className="rounded" />
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] ml-2">
                    {item.items}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] text-right ">
                    {item.principal}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] text-right ">
                    {item.duration}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] text-right ">
                    {item.payoff}
                  </p>
                </div>

                <div className="w-1/12 pr-5">
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] text-right ">
                    {item.apr}
                  </p>
                </div>

                <div className="w-1/12">
                  <Status status={item.status} />
                </div>

                <div className="w-2/12 pr-10">
                  <p className="font-semibold font-jakarta text-base text-[#F2F2F2] text-right">
                    {item.expires}
                  </p>
                </div>

                <div className="flex justify-center items-center w-1/12">
                  <Image src={nftfi} alt="nftfi" className="rounded-full" />
                </div>

                <div className="flex items-center justify-end w-1/12">
                  <button className="border-[#DDDDDD] border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-[#DDDDDD]">
                    Repay
                  </button>
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
