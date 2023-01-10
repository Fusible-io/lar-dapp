import { Collapse, List } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import Avatar from "/public/assets/avatar.jpg";
import nftfi_logo from "/public/assets/nftfi.png";
import DownArrow from "/public/assets/downArrow.svg";
import UpArrow from "/public/assets/upArrow.svg";
import ListView from "/public/assets/listIcon.svg";
import GridView from "/public/assets/gridIcon.svg";
import ListActiveIcon from "/public/assets/listActiveIcon.svg";
import GridActiveIcon from "/public/assets/gridActiveIcon.svg";

import { formatCurrency } from "../core/utils/formatCurrency";
import { ERC20_MAP } from "../core/constant/nftFiConfig";
import moment from "moment";
import Router from 'next/router'


import { useOffer, useNFTFi } from "../core/store/store";
import { useAccount } from 'wagmi';




import CardComp from "../CardComp/CardComp";

import { CardData } from "../Data/Data";

const { Panel } = Collapse;


const BorrowTable = () => {
  const [listView, setListView] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [nftOffers, setNFTOffers] = useState([]);

  const { setOffer } = useOffer();
  const { nftfi } = useNFTFi();
  const { address } = useAccount();



  const [activeKey, setActiveKey] = useState([]);

  const handleCollapseActiveKey = (key) => {
    console.log("selected key", key)
    if (activeKey.includes(key)) {
      setActiveKey(activeKey.filter((item) => item !== key));
    } else {
      setActiveKey([...activeKey, key]);
    }
  };

  const onAcceptOffer = (nft, offer) => {
    console.log('onaccept offer', offer)
    setOffer({
      nft,
      offer
    })
    Router.push('/cardDetail')
  }


  const getOffersOnNFTs = async () => {
    if (window && window.localStorage.getItem('sdkToken')) {
      const response = (ownedNFTs.map(async (nft) => {
        const offers = await nftfi.offers.get({
          filters: {
            nft: {
              id: nft.tokenId,
              address: nft.contract.address,
            }
          }
        });
        // set offers to ownedNFTs offers

        const updatedNFTs = ownedNFTs.map((item) => {
          if (item.tokenId == nft.tokenId && item.contract.address === nft.contract.address) {
            item.offers = offers
            return item;
          } else {
            return item;
          }
        });
        setNFTOffers(updatedNFTs)
        setLoading(false)
        return offers;
      }));
    }
  }

  useEffect(() => {
    console.log("nft with offers", nftOffers)
  }, [nftOffers])

  useEffect(() => {
    if (address) {
      setLoading(true);
      fetch('/api/nft',
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setOwnedNFTs(res.ownedNfts);
          console.log(res.ownedNfts)
        });
    }

  }, [address]);


  useEffect(() => {
    if (ownedNFTs.length > 0) {
      getOffersOnNFTs()
    }

  }, [
    ownedNFTs,
  ]);



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
              <div className="flex px-[18px]">
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
            dataSource={nftOffers}
            loadMore={loadMore}
            loading={loading}
            renderItem={(item, idx) => {
              if (item?.offers?.length > 0) return (
                <Collapse ghost activeKey={activeKey}>
                  <Panel
                    showArrow={false}
                    header={
                      <div className="flex justify-between items-center px-[18px] pb-4">
                        <div className="flex items-center w-3/12 my-2">

                          <Image
                            src={item?.rawMetadata?.image}
                            // alt="Avatar"
                            width={150}
                            height={150}
                            className="rounded"
                          />
                          <p className="font-semibold font-jakarta text-base text-lightTextC ml-2">
                            {item?.title}
                            {' #'}
                            {item?.tokenId}
                          </p>
                        </div>

                        <div className="w-1/12">
                          <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                            {
                              formatCurrency(item?.offers[0]?.terms?.loan?.principal, item?.offers[0]?.terms?.loan?.currency)
                            }
                            {
                              ' '
                            }
                            {
                              ERC20_MAP[item?.offers[0]?.terms?.loan?.currency].symbol
                            }
                          </p>
                        </div>

                        <div className="w-1/12">
                          <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                            {moment.duration(item?.offers[0]?.terms?.loan?.duration, 'second').humanize()}
                          </p>
                        </div>

                        <div className="w-1/12">
                          <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                            {
                              formatCurrency(item?.offers[0]?.terms?.loan?.repayment, item?.offers[0]?.terms?.loan?.currency)
                            }
                            {
                              ' '
                            }
                            {
                              ERC20_MAP[item?.offers[0]?.terms?.loan?.currency]?.symbol
                            }
                          </p>
                        </div>

                        <div className="w-1/12">
                          <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                            {
                              (nftfi.utils.calcApr(item?.offers[0]?.terms?.loan?.principal, item?.offers[0]?.terms?.loan?.repayment, (item?.offers[0]?.terms?.loan?.duration / (24 * 60 * 60)))).toString().substring(0, 5)
                            }
                          </p>
                        </div>

                        <div className="flex justify-center items-center w-1/12">
                          <Image
                            src={nftfi_logo}
                            alt="nftfi"
                            className="rounded-full"
                            width={20}
                            height={20}
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
                                handleCollapseActiveKey(idx);
                              }}
                              className="flex justify-center items-center font-normal font-jakarta text-base text-lightTextC mr-5 border-b border-lightBorder"
                            >
                              View {item.length} offers{" "}
                              <Image
                                src={DownArrow}
                                alt="DownArrow"
                                className="ml-[6px]"
                              />
                            </button>
                          )}

                          <button
                            className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                            Accept
                          </button>
                        </div>
                      </div>
                    }
                    key={idx}
                    style={{
                      backgroundColor: activeKey.includes(item.key)
                        ? "#121A21"
                        : "transparent",
                    }}
                  >
                    {item?.offers?.map((items) => {
                      return <>
                        <div
                          className="flex justify-between items-center pb-3 first:pt-2"
                          key={items.id}
                        >
                          <div className="flex items-center w-3/12 my-2"></div>

                          <div className="w-1/12">
                            <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                              {
                                formatCurrency(items?.terms?.loan?.principal, items?.terms?.loan?.currency)
                              }
                              {
                                ' '
                              }
                              {
                                ERC20_MAP[items?.terms?.loan?.currency].symbol
                              }
                            </p>
                          </div>

                          <div className="w-1/12">
                            <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                              {moment.duration(items?.terms?.loan?.duration, 'second').humanize()}

                            </p>
                          </div>

                          <div className="w-1/12">
                            <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                              {
                                formatCurrency(items?.terms.loan?.repayment, items?.terms?.loan?.currency)
                              }
                              {
                                ' '
                              }
                              {
                                ERC20_MAP[items?.terms.loan.currency].symbol
                              }
                            </p>
                          </div>

                          <div className="w-1/12">
                            <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">

                              {
                                (nftfi.utils.calcApr(items?.terms?.loan?.principal, items?.terms?.loan?.repayment, (items?.terms?.loan?.duration / (24 * 60 * 60)))).toString().substring(0, 5)
                              }
                            </p>
                          </div>

                          <div className="flex justify-center items-center w-1/12">
                            <Image
                              src={nftfi_logo}
                              alt="nftfi"
                              className="rounded-full"
                            />
                          </div>

                          <div className="flex items-center justify-end w-4/12">
                            <button
                              onClick={() => onAcceptOffer(item, items)}

                              className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                              Accept
                            </button>
                          </div>
                        </div></>
                    })}
                  </Panel>
                </Collapse>
              );
            }}
          />
        ) : (
          <div className="mb-14 flex gap-4">
            {nftOffers.map((item) => {
              return (
                <CardComp
                  key={item.id}
                  item={item}
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
