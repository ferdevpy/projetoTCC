import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { Image, Input, Space } from "antd";

export default memo(({ data }) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Handle
          type="target"
          position={Position.Top}
          className="customHandleTop"
        />
        <Image preview={false} src={data.image.url} style={data.image.size} />
        <Handle
          className="customHandleBottom"
          type="source"
          position={Position.Bottom}
          onConnect={(params) => console.log("handle onConnect", params)}
        />
      </div>
    </div>
  );
});
