import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo.svg";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider, useSigner, useAccount } from 'wagmi';
import { useNFTFi } from "../core/store/store";
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
      config: { api: { key: 'AIzaSyC7ZjZ4mYLoyVmkl-Ch9yzfbMTgHqpy5iM' } },
      ethereum: {
        account: { signer, address },
        provider: { url: provider.connection.url }
      },
      web3: { provider },
      logging: { verbose: true }
    })
    setNFTFi(initNFTFI)
  };


  useEffect(() => {
    // if (!window) return
    if (!provider || !address || !signer) return

    // ToDo: intialize NFTfi when account is changes, or network is changed, or the account is disconnected
    initNFTFI();
  }, [
    provider, address, signer
  ]);


  useEffect(() => {
    console.log({
      nftfi
    })
  }, [nftfi]);





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
        <li
          className={
            router.pathname == "/list"
              ? "mr-10 font-bold text-base font-jakarta"
              : "mr-10 font-normal text-base font-jakarta text-headTextC"
          }
        >
          <Link href="/list">List</Link>
        </li>
      </ul>

      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Navbar;
