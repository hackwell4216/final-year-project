import React from "react";

function GroupBuyList({ allGroupBuys , renderGroupBuys }: any) {
  return <div className="w-[800px] mx-auto">{allGroupBuys.map(renderGroupBuys)}</div>;
}

export default GroupBuyList;
