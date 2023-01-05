import { List } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Router from 'next/router'

import Avatar from "/public/assets/avatar.jpg";
import nftfi from "/public/assets/nftfi.png";
import StatusComp from "../StatusComp/StatusComp";
import { useAccount, useProvider, useSigner } from 'wagmi';
import moment from "moment";

import NFTfi from "@nftfi/js";
import { useLoan } from "../core/store/store";

const nftFi = async (a, s, p) => {
  const initNFTFI = await NFTfi.init({
    config: { api: { key: 'AIzaSyC7ZjZ4mYLoyVmkl-Ch9yzfbMTgHqpy5iM' } },
    ethereum: {
      account: { signer: s, address: a },
      provider: { url: 'https://goerli.infura.io/v3/d5a371cc71304b32ac4bf5c01281d388' }
    },
    web3: { provider: p },
    logging: { verbose: true }
  });
  window.initNFTFI = initNFTFI;
}

const listor = async (address, signer, provider, sLoad, sList) => {
  const initNFTFI = await nftFi(address, signer, provider);
  //sLoad(true);
  if (typeof window.initNFTFI == undefined) return;
  const listings = await initNFTFI.listings.get({
    pagination: {
      limit: 5,
      page: 1
    }
  });
  sLoad(false);
  sList(listings);
  console.log({ listings });

}
const getActiveLoans = async (address, signer, provider, sLoad, sList) => {
  sLoad(true);
  await nftFi(address, signer, provider);
  if (typeof window.initNFTFI == undefined) return;
  const loans = await window.initNFTFI.loans.get({
    filters: {
      counterparty: 'borrower',
      status: 'escrow'
    }
  });
  sLoad(false);
  sList(loans);
  console.log({ loans });
}

const getOffersOnNFTs = async (address, signer, provider, ownedNFTs) => {
  await nftFi(address, signer, provider);
  if (typeof window.initNFTFI == undefined) return;

  for (var i = 0; i < ownedNFTs.length; i++) {
    const nft = ownedNFTs[i];
    console.log({
      nft
    })
    const offers = await window.initNFTFI.offers.get(
      //   {
      //   filters: {
      //     nft: {
      //       contract: nft.contract.address,
      //       id: nft.tokenId
      //     }
      //   }
      // }
    );
    console.log({ offers });
  }


}

import Link from "next/link";

const ManageTable = () => {
  const [loading, setLoading] = useState(false);
  const [activeLoansList, setActiveLoansList] = useState([]);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { setLoan } = useLoan();


  useEffect(() => {

    //  console.log({address,signer,provider});
    if ((address, signer, provider) && typeof window != undefined) {
      if (typeof window.initNFTFI != undefined) {
        getActiveLoans(address, signer, provider, setLoading, setActiveLoansList);
      }
    }
  }, [
    address, provider, signer, window
  ]);

  useEffect(() => {
    if (address) {
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
          console.log({
            'ownedNFts': res.ownedNfts,
          })
        });
    }

  }, [address]);

  useEffect(() => {
    if (address, signer, provider, ownedNFTs) {
      getOffersOnNFTs(address, signer, provider, ownedNFTs);
    }
  }, [
    address, signer, provider, ownedNFTs,
  ]);


  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onRepay = (loan) => {
    setLoan(loan);
    // navigate to repay page
    Router.push('/repay');
  }

  const loadMore =
    !loading && !loading ? (
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
          dataSource={activeLoansList}
          loadMore={loadMore}
          loading={loading}
          renderItem={(item) => {
            return (
              <div className="flex justify-between items-center px-[18px] pb-4">
                <div className="flex items-center w-3/12 my-2">
                  <Image src={Avatar} alt="Avatar" className="rounded" />
                  <p className="font-semibold font-jakarta text-base text-lightTextC ml-2">
                    {item?.nft?.name}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {
                      (window.initNFTFI.utils.formatEther(item?.terms?.loan?.principal
                      )).toString().substring(0, 5)
                    }
                    {
                      ' wETH'
                    }
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {moment.duration(item?.terms?.loan?.duration, 'second').humanize()}
                  </p>
                </div>

                <div className="w-1/12">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {
                      (window.initNFTFI.utils.formatEther(item?.terms?.loan?.repayment
                      )).toString().substring(0, 5)
                    }
                    {
                      ' wETH'
                    }
                  </p>
                </div>

                <div className="w-1/12 pr-5">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right ">
                    {
                      (window.initNFTFI.utils.calcApr(item?.terms?.loan?.principal, item?.terms?.loan?.repayment, (item?.terms?.loan?.duration / (24 * 60 * 60)))).toString().substring(0, 5)
                    }
                  </p>
                </div>

                <div className="w-1/12">
                  <StatusComp status={item.status} />
                </div>

                <div className="w-2/12 pr-10">
                  <p className="font-semibold font-jakarta text-base text-lightTextC text-right">
                    {
                      moment(item?.date?.started).add(item?.terms?.loan?.duration, 'seconds').format('DD MMM YY HH:mm ').toString()
                    }
                  </p>
                </div>

                <div className="flex justify-center items-center w-1/12">
                  <Image
                    src={nftfi}
                    alt="nftfi"
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="flex items-center justify-end w-1/12">
                  {/* <Link href="/repay"> */}
                    <button
                    onClick={ () => onRepay(item)}
                    className="border-lightBorder border rounded-lg px-2 py-1 font-jakarta font-normal text-base text-lightBorder">
                      Repay
                    </button>
                  {/* </Link> */}
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
