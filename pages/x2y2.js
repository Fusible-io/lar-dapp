import { message } from "antd";
import React from "react";
import { useAccount } from "wagmi";

const BASE_URL = "https://goerli-loan-api.x2y2.org/v1";
const GET_CURRENT_BORROW_LOANS = `${BASE_URL}/order/currentBorrowLoans`;
const GET_SYSTEM_PARAMS = `${BASE_URL}/sys/loanParam`;
// const API_KEY = "bfddc2254c12a306ba781854bb778ee7";
const API_KEY = "8923f924-1f00-4a6a-b484-088e6ffed7f3";
// 8923f924-1f00-4a6a-b484-088e6ffed7f3

export default function X2Y2() {
  const { address } = useAccount();

  const triggerClick = async () => {
    if (!address) return message.warning("please connect wallet");
    await getCurrentBorrowLoans();
    await getSystemParams();
  };

  const getCurrentBorrowLoans = async () => {
    const x_timestamp = Date.now();
    const options = {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        accept: "application/json",
        "x-timestamp": x_timestamp,
      },
    };

    fetch(
      `${GET_CURRENT_BORROW_LOANS}?userAddress=${address}&page=1&pageSize=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const getSystemParams = async () => {
    const x_timestamp = Date.now();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": API_KEY,
        "x-timestamp": x_timestamp,
      },
    };

    fetch(`${GET_SYSTEM_PARAMS}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return <div onClick={triggerClick}>click</div>;
}
