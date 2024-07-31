import { Tooltip } from "antd";

import React from "react";

const CustomTooltip = ({ children, title, color }) => {
  return (
    <Tooltip arrow={false} title={title} color={!color ? "#008999" : color}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
