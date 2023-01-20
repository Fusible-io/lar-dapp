import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useProvider, useSigner, useAccount } from "wagmi";
import { useNFTFi, useAddressStore } from "../core/store/store";
import NFTfi from "@nftfi/js";

const Navbar = () => {
  const router = useRouter();

  const { nftfi, setNFTFi, clearNFTFi } = useNFTFi();

  const { address } = useAccount({
    // isConnected: () => {
    //   clearNFTFi();
    // },
    // onConnect: () => {
    //   clearNFTFi();
    // },
    onDisconnect: () => {
      clearNFTFi();
    },
    // isConnecting: () => {
    //   clearNFTFi();
    // }
  });
  const provider = useProvider();
  const { data: signer } = useSigner();

  const initNFTFI = async () => {
    const initNFTFI = await NFTfi.init({
      config: { api: { key: "AIzaSyC7ZjZ4mYLoyVmkl-Ch9yzfbMTgHqpy5iM" } },
      ethereum: {
        account: { signer, address },
        provider: {
          url: "https://eth-goerli.g.alchemy.com/v2/I8sUm_xAMMW6ZacAhq97c-l2rqwChRh7",
        },
      },
      web3: { provider },
      logging: { verbose: true },
    });

    setNFTFi(initNFTFI);
  };

  useEffect(() => {
    if (!window) return;
    if (!provider || !address || !signer) return;
    var token = window.localStorage.getItem("sdkToken");
    if (nftfi !== null) {
      console.log("TOken is valid->", token, nftfi.auth._isTokenValid(token));
    }
    //if(!nftfi.auth._isTokenValid(token))
    // ToDo: intialize NFTfi when account is changes, or network is changed, or the account is disconnected
    initNFTFI();
  }, [provider, address, signer]);

  useEffect(() => {
    var token = window.localStorage.getItem("sdkToken");
    if (nftfi !== null && token) {
      console.log("TOken", nftfi.auth._isTokenValid(token));
      if (!nftfi.auth._isTokenValid(token)) clearNFTFi();
    }

    console.log({
      nftfi,
    });
  }, [nftfi]);

  useEffect(() => {
    if (address) {
      //clearNFTFi();
      var token = window.localStorage.getItem("sdkToken");
      if (nftfi !== null && token) {
        console.log("TOken", nftfi.auth._isTokenValid(token));
      }
      // setAddress(address);
    }
  }, [address]);

  return (
    <div className="px-10 py-7 flex justify-between items-center mainContainer">
      <Link href="/">
        <Image src={Logo} alt="Logo" />
      </Link>

      <ul className="flex">
        <li
          className={
            router.pathname == "/"
              ? "mr-10 font-bold text-base font-jakarta"
              : "mr-10 font-normal text-base font-jakarta text-headTextC"
          }
        >
          <Link href="/">Dashboard</Link>
        </li>
        <li
          className={
            router.pathname == "/borrow"
              ? "mr-10 font-bold text-base font-jakarta"
              : "mr-10 font-normal text-base font-jakarta text-headTextC"
          }
        >
          <Link href="/borrow">Borrow</Link>
        </li>
        {/* <li
          className={
            router.pathname == "/list"
              ? "mr-10 font-bold text-base font-jakarta"
              : "mr-10 font-normal text-base font-jakarta text-headTextC"
          }
        >
          <Link href="/list">List</Link>
        </li> */}
      </ul>

      {/* <ConnectButton showBalance={false} /> */}

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      className="px-4 py-2 bg-[#141A29] rounded-xl font-inter font-semibold text-base"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex gap-3 px-4 py-2 bg-[#141A29] rounded-xl font-inter font-semibold text-base">
                    <button
                      onClick={openChainModal}
                      className="flex items-center"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={24}
                              height={24}
                            />
                          )}
                        </div>
                      )}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default Navbar;
