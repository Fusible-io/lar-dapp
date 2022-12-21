import { Table } from "antd";
import Image from "next/image";
import React from "react";

import Avatar from "../public/assets/avatar.jpg";
import nftfi from "../public/assets/nftfi.jpg";

const data = [
  {
    key: "1",
    items: "DigiDaigaku #2004",
    principal: "9.23 WETH",
    duration: "30 days",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: ["48h max"],
    expires: "12 Nov 22 19:35",
  },
  {
    key: "2",
    items: "DigiDaigaku #1319",
    principal: "5.34 WETH",
    duration: "30 days",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: ["Close soon"],
    expires: "12 Nov 22 19:35",
  },
  {
    key: "3",
    items: "Renga #234",
    principal: "0.62 WETH",
    duration: "30 days",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: ["Active"],
    expires: "12 Nov 22 19:35",
  },
  {
    key: "4",
    items: "Bored Ape Yacht Club...",
    principal: "56.23 WETH",
    duration: "30 days",
    payoff: "3.82 WETH",
    apr: "46% ",
    status: ["Closed"],
    expires: "12 Nov 22 19:35",
  },
];

const columns = [
  {
    title: <h1 className="font-bold text-sm font-jakarta">Items</h1>,
    dataIndex: "items",
    key: "items",
    width: "15%",
    render: (text) => (
      <div className="flex items-center">
        <Image src={Avatar} alt="Avatar" />
        <p className="font-semibold font-jakarta text-xs ml-2">{text}</p>
      </div>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Principal</h1>,
    dataIndex: "principal",
    key: "principal",
    width: "10%",
    render: (text) => (
      <p className="font-semibold font-jakarta text-xs">{text}</p>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Duration</h1>,
    dataIndex: "duration",
    key: "duration",
    width: "10%",
    render: (text) => (
      <p className="font-semibold font-jakarta text-xs">{text}</p>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Payoff</h1>,
    dataIndex: "payoff",
    key: "payoff",
    width: "10%",
    render: (text) => (
      <p className="font-semibold font-jakarta text-xs">{text}</p>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">APR</h1>,
    dataIndex: "apr",
    key: "apr",
    width: "8%",
    render: (text) => (
      <p className="font-semibold font-jakarta text-xs">{text}</p>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Status</h1>,
    key: "status",
    dataIndex: "status",
    width: "10%",
    render: (_, { status }) => (
      <>
        {/* {status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            </>
          );
        })} */}
        <div className="flex items-center">
          <span className="px-[5px] bg-[#E45555] rounded-full mr-1 h-[10px] mb-0"></span>
          <p className="font-semibold font-jakarta text-xs">{status}</p>
        </div>
      </>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Expires</h1>,
    dataIndex: "expires",
    key: "expires",
    width: "10%",
    render: (text) => (
      <p className="font-semibold font-jakarta text-xs">{text}</p>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta">Source</h1>,
    dataIndex: "source",
    key: "source",
    width: "10%",
    render: () => (
      <div>
        <Image src={nftfi} alt="nftfi" />
      </div>
    ),
  },
  {
    title: <h1 className="font-bold text-sm font-jakarta"></h1>,
    key: "action",
    width: "10%",
    render: (_, record) => (
      <div className="flex items-end justify-end">
        <button className="border-black border px-2 py-1 font-jakarta font-medium text-xs text-black">
          Repay
        </button>
      </div>
    ),
  },
];

const ManageTable = () => {
  return (
    <div className="mx-10 mt-9 ">
      <div className="border-b-[1px] border-black py-4 px-5 bg-[#F2F2F2] mb-7 rounded-t">
        <h1 className="font-bold text-lg font-jakarta">
          Manage. <i className="font-extralight">Deal with your loans.</i>
        </h1>
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default ManageTable;
