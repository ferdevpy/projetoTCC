import { Handle, Position } from "reactflow";
import { Image, Input } from "antd";
import React, { memo } from "react";

export default memo(({ data }) => {
  return (
    <div style={{ textAlign: "center", paddingBlock: "10px" }}>
      <Handle
        className="customHandleLeft"
        type="target"
        position={Position.Left}
        isConnectable={true}
      />
      <div style={{ textAlign: "center" }}>
        <Image preview={false} src={data.image.url} style={data.image.size} />
        <Input
          style={{ fontSize: 8, width: 100 }}
          value={data.label}
          size="small"
          bordered={false}
        />
      </div>
    </div>
  );
});
