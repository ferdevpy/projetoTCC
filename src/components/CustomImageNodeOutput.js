import { Handle, Position } from "reactflow";
import { Image, Input } from "antd";
import React, { memo } from "react";

export default memo(({ data }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Handle
        className="customHandleLeft"
        type="target"
        position={Position.Left}
        isConnectable={true}
      />
      <Image preview={false} src={data.image.url} style={data.image.size} />
    </div>
  );
});
