import { useEffect } from "react";
import Head from "next/head";
import LoanDetails from "../components/LoanStatics/LoanDetails";
import ManageTable from "../components/Tables/ManageTable";
import BorrowTable from "../components/Tables/BorrowTable";
import { useNFTFi } from "../components/core/store/store";
import { useAccount } from "wagmi";

export default function Home() {
  const { nftfi } = useNFTFi();
  const { address } = useAccount();

  const isTokenValid = async () => {
    if (nftfi) {
      var token = await nftfi.auth.getToken();
      if (token) {
        return nftfi.auth._isTokenValid(token);
      }
    }
    return false;
  };

  return (
    <>
      <Head>
        <title>LAR - DAPP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-20">
        {address && nftfi && isTokenValid ? (
          <>
            <ManageTable />
            <BorrowTable />
          </>
        ) : (
          <>
            <h1 className="text-center text-xl">Please connect your wallet</h1>
          </>
        )}
      </main>
    </>
  );
}
