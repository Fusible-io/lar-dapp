import React from "react";

const StatusComp = ({ status }) => {
  if (status === "liquidated") {
    return (
      <div className="flex justify-end items-center">
        <span className="px-[5px] bg-soonBg rounded-full mr-2 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-base text-lightTextC">
          Soon
        </p>
      </div>
    );
  } else if (status === "escrow" || status === "Active") {
    return (
      <div className="flex justify-end items-center">
        <span className="px-[5px] bg-activeBg rounded-full mr-2 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-base text-lightTextC">
          Active
        </p>
      </div>
    );
  } else if (status === "repaid" || status === "Repaid") {
    return (
      <div className="flex justify-end items-center">
        <span className="px-[5px] bg-closeBg rounded-full mr-2 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-base text-lightTextC">
          Closed
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end items-center">
        <span className="px-[5px] bg-defaultBg rounded-full mr-2 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-defaultBg text-base">
          {status}
        </p>
      </div>
    );
  }
};

export default StatusComp;
