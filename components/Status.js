import React from "react";

const Status = (status) => {
  if (status === "Close soon") {
    return (
      <div className="flex items-center">
        <span className="px-[5px] bg-[#F1A33B] rounded-full mr-1 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-xs">{status}</p>
      </div>
    );
  } else if (status === "Active") {
    return (
      <div className="flex items-center">
        <span className="px-[5px] bg-[#16B57F] rounded-full mr-1 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-xs">{status}</p>
      </div>
    );
  } else if (status === "Closed") {
    return (
      <div className="flex items-center">
        <span className="px-[5px] bg-[#4F4F4F] rounded-full mr-1 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-xs">{status}</p>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        <span className="px-[5px] bg-[#E45555] rounded-full mr-1 h-[10px] mb-0"></span>
        <p className="font-semibold font-jakarta text-xs">{status}</p>
      </div>
    );
  }
};

export default Status;
