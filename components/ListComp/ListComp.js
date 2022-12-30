import { List } from "antd";
import React from "react";

const ListComp = ({
  header,
  bordered = true,
  dataSource,
  renderItem,
  onLoadMore,
  initLoading,
  loading,
}) => {
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
    <List
      header={header}
      bordered={bordered}
      dataSource={dataSource}
      loadMore={loadMore}
      loading={initLoading}
      renderItem={renderItem}
    />
  );
};

export default ListComp;

// This is List reusable component it is created but not getting used atm please remove this commment whenever you are using it.
