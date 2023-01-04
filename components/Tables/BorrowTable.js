import { Collapse, List } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import Avatar from "/public/assets/avatar.jpg";
import nftfi from "/public/assets/nftfi.jpg";
import DownArrow from "/public/assets/downArrow.svg";
import UpArrow from "/public/assets/upArrow.svg";
import ListView from "/public/assets/listIcon.svg";
import GridView from "/public/assets/gridIcon.svg";
import ListActiveIcon from "/public/assets/listActiveIcon.svg";
import GridActiveIcon from "/public/assets/gridActiveIcon.svg";

import CardComp from "../CardComp/CardComp";

import { CardData } from "../Data/Data";

const { Panel } = Collapse;

const BorrowTable = () => {
  const [listView, setListView] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [activeKey, setActiveKey] = useState([]);

  const handleCollapseActiveKey = (key) => {
    if (activeKey.includes(key)) {
      setActiveKey(activeKey.filter((item) => item !== key));
    } else {
      setActiveKey([...activeKey, key]);
    }
  };

  useEffect(() => {
    // fetch("/api/api")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setInitLoading(false);
    //     setData(res);
    //     setList(res);
    //   });
  }, []);

  const onLoadMore = () => {
    // setLoading(true);
    // fetch("/api/api")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const newData = data.concat(res);
    //     setData(newData);
    //     setList(newData);
    //     setLoading(false);
    //   });
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
            dataSource={list}
            loadMore={loadMore}
            loading={initLoading}
            renderItem={(item) => {
              return (
                <Collapse ghost activeKey={activeKey}>
                  <Panel
                    showArrow={false}
                    header={
                      <div className="flex justify-between items-center">
                        <div className="flex items-center w-3/12 my-2">
                          <Image
                            src={Avatar}
                            alt="Avatar"
                            className="rounded"
                          />
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
                          <Image
                            src={nftfi}
                            alt="nftfi"
                            className="rounded-full"
                          />
                        </div>

                        <div className="flex items-center justify-end w-4/12">
                          {activeKey.includes(item.key) ? (
                            <button
                              onClick={() => {
                                handleCollapseActiveKey(item.key);
                              }}
                              className="flex justify-center items-center font-normal font-jakarta text-base text-lightTextC mr-5 border-b border-lightBorder"
                            >
                              View less{" "}
                              <Image
                                src={UpArrow}
                                alt="UpArrow"
                                className="ml-[6px]"
                              />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleCollapseActiveKey(item.key);
                              }}
                              className="flex justify-center items-center font-normal font-jakarta text-base text-lightTextC mr-5 border-b border-lightBorder"
                            >
                              View 9 offers{" "}
                              <Image
                                src={DownArrow}
                                alt="DownArrow"
                                className="ml-[6px]"
                              />
                            </button>
                          )}

                          <button className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                            Accept
                          </button>
                        </div>
                      </div>
                    }
                    key={item.key}
                    style={{
                      backgroundColor: activeKey.includes(item.key)
                        ? "#121A21"
                        : "transparent",
                    }}
                  >
                    {item.offerData?.map((item) => (
                      <div
                        className="flex justify-between items-center pb-3 first:pt-2"
                        key={item.id}
                      >
                        <div className="flex items-center w-3/12 my-2"></div>

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
                          <Image
                            src={nftfi}
                            alt="nftfi"
                            className="rounded-full"
                          />
                        </div>

                        <div className="flex items-center justify-end w-4/12">
                          <button className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </Panel>
                </Collapse>
              );
            }}
          />
        ) : (
          <div className="mb-14 flex gap-4">
            {CardData.map((e) => {
              return (
                <CardComp
                  key={e.id}
                  img={e.img}
                  listed={e.listed}
                  name={e.name}
                  x2y2={e.x2y2}
                  borrowDay={e.borrowDay}
                  weth={e.weth}
                  apr={e.apr}
                  acceptD={e.acceptD}
                  offerD={e.offerD}
                  offerBtn={e.offerBtn}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowTable;
