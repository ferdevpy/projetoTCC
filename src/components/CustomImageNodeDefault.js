import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { Image, Input, Space } from "antd";
import { getProperties } from "../conteiners/Properties";

export default memo(({ data }) => {
  return (
    <div>
      <div style={{ textAlign: "center", paddingBlock: "10px" }}>
        <Space direction="vertical" size={"small"}>
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
          <Input
            style={{ fontSize: 8, width: 100 }}
            value={data.label}
            size="small"
            bordered={false}
          />
        </Space>
      </div>
    </div>
  );
});
