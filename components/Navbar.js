import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Logo from "../public/assets/logo.svg";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

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

      <button className="font-semibold text-base flex font-jakarta">
        <span className="bg-slate-600 w-6 h-6 rounded-full mr-2"></span>
        0x23...251
      </button>
    </div>
  );
};

export default Navbar;
