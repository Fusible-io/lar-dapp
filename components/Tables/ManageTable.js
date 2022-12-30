import { List } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Avatar from "/public/assets/avatar.jpg";
import nftfi from "/public/assets/nftfi.jpg";
import StatusComp from "../StatusComp/StatusComp";

const ManageTable = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/api")
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res);
        setList(res);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    fetch("/api/api")
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res);
        setData(newData);
        setList(newData);
        setLoading(false);
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div className="flex justify-center items-center absolute left-0 right-0 -bottom-5">
        <button
          onClick={onLoadMore}
          className="bg-darkBg border-2 border-darkBorder py-[3px] px-[9px] rounded-lg text-lightGreen text-lg font-medium"
        >
          See more
        </button>
      </div>
    ) : null;

  return (
    <div className="mx-10 mt-14">
      <h1 className="font-semibold text-[28px] leading-[44px] font-jakarta mb-5 text-white">
        Manage your loans
      </h1>

      <div>
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

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12 pr-5">
                APR
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12">
                Status
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-2/12 pr-10">
                Expires
              </h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>

              <h1 className="font-medium text-sm font-jakarta text-gTextColor text-right w-1/12"></h1>
            </div>
          }
          bordered
          dataSource={list}
          loadMore={loadMore}
          loading={initLoading}
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

                <div className="w-1/12 pr-5">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {item.apr}
                  </p>
                </div>

                <div className="w-1/12">
                  <StatusComp status={item.status} />
                </div>

                <div className="w-2/12 pr-10">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right">
                    {item.expires}
                  </p>
                </div>

                <div className="flex justify-center items-center w-1/12">
                  <Image src={nftfi} alt="nftfi" className="rounded-full" />
                </div>

                <div className="flex items-center justify-end w-1/12">
                  <button className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
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
