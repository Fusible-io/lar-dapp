import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="mx-10 my-8 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold tracking-[.01em] text-black font-jakarta">
          SOMETHING
        </h1>
      </Link>

      <ul className="flex">
        <li className="mr-10 font-medium underline text-base font-jakarta">
          <Link href="/">Dashboard</Link>
        </li>
        <li className="mr-10 font-medium text-base font-jakarta">Borrow</li>
        <li className="font-semibold text-base flex font-jakarta">
          <span className="bg-slate-600 w-6 h-6 rounded-full mr-2"></span>
          0x23...251
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
