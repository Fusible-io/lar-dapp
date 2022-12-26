import { Card, List } from "antd";
import Image from "next/image";
import React, { useState } from "react";

import Avatar from "../public/assets/avatar.jpg";
import nftfi from "../public/assets/nftfi.jpg";
import DownArrow from "../public/assets/downArrow.svg";
import ListView from "../public/assets/listIcon.svg";
import GridView from "../public/assets/gridIcon.svg";
import ListActiveIcon from "../public/assets/listActiveIcon.svg";
import GridActiveIcon from "../public/assets/gridActiveIcon.svg";
import CardImage from "../public/assets/CardImage.png";
import x2y2 from "../public/assets/x2y2.svg.svg";

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
    <button className="bg-darkBg border-2 border-darkBorder py-[3px] px-[9px] rounded-lg text-lightGreen text-lg font-medium">
      See more
    </button>
  </div>
);

const BorrowTable = () => {
  const [listView, setListView] = useState(true);

  return (
    <div className="mx-10 mt-14">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
          Borrow instantly
        </h1>

        <div className="flex items-center rounded-2xl border border-darkGreenB px-[7px] py-[5px]">
          <button
            onClick={() => setListView(true)}
            className={
              listView === true
                ? "w-[37px] h-9 rounded-xl bg-darkGrey p-3"
                : "w-[37px] h-9 p-3"
            }
          >
            <Image
              src={listView === true ? ListActiveIcon : ListView}
              alt="ListIcon"
              className="w-[13px] h-3"
            />
          </button>
          <button
            onClick={() => setListView(false)}
            className={
              listView === false
                ? "w-[37px] h-9 rounded-xl bg-darkGrey px-[10px] py-[9px]"
                : "w-[37px] h-9 px-[10px] py-[9px]"
            }
          >
            <Image
              src={listView === false ? GridActiveIcon : GridView}
              alt="GridView"
            />
          </button>
        </div>
      </div>

      <div>
        {listView === true ? (
          <List
            header={
              <div className="flex">
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

                <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                  APR
                </h1>

                <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>

                <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-4/12"></h1>
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
                    <p className="font-semibold font-jakarta text-base text-lightTextC ml-2">
                      {item.items}
                    </p>
                  </div>

                  <div className="w-1/12">
                    <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                      {item.principal}
                    </p>
                  </div>

                  <div className="w-1/12">
                    <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                      {item.duration}
                    </p>
                  </div>

                  <div className="w-1/12">
                    <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                      {item.payoff}
                    </p>
                  </div>

                  <div className="w-1/12">
                    <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                      {item.apr}
                    </p>
                  </div>

                  <div className="flex justify-center items-center w-1/12">
                    <Image src={nftfi} alt="nftfi" className="rounded-full" />
                  </div>

                  <div className="flex items-center justify-end w-4/12">
                    <button className="flex justify-center items-center font-normal font-jakarta text-base text-lightTextC mr-5 border-b border-lightBorder">
                      View 9 offers{" "}
                      <Image
                        src={DownArrow}
                        alt="DownArrow"
                        className="ml-[6px]"
                      />
                    </button>
                    <button className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                      Accept
                    </button>
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <div>
            <Card
              style={{ width: 185 }}
              cover={<Image src={CardImage} alt="CardImage" />}
              bordered={false}
            >
              <span className="text-white bg-tagColor rounded absolute top-[14px] font-semibold font-jakarta text-[10px] px-[3px] py-[1px]">
                Listed 3/3
              </span>
              <div className="mb-[10px] flex justify-between items-center">
                <p className="font-jakarta font-normal text-[10px] text-white leading-5">
                  DigiDaigaku #235
                </p>

                <Image src={x2y2} alt="x2y2" className="rounded" />
              </div>
              <div className="flex justify-between item-center mb-[2px]">
                <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
                  Borrow
                </p>
                <p className="font-jakarta font-extralight text-[10px] text-white leading-3">
                  30 days
                </p>
              </div>
              <div className="flex justify-between item-center mb-[14px]">
                <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
                  9.80 WETH
                </h4>
                <h4 className="font-jakarta font-semibold text-[14px] text-white leading-4">
                  28% APR
                </h4>
              </div>

              <button className="h-[33px] rounded-lg bg-greenBtn w-full text-xs font-jakarta font-bold text-white mb-[6px]">
                Accept
              </button>

              <button className="h-[33px] rounded-lg bg-transparent w-full text-xs font-jakarta font-semibold text-lightGreenT border border-darkBorderG mb-1">
                View 9 offers
              </button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowTable;
