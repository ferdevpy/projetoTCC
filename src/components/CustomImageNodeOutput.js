import { Handle, Position } from "reactflow";
import { Image } from "antd";
import React, { memo } from "react";

export default memo(({ data }) => {
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
      />
      <div style={{ textAlign: "center" }}>
        <Image preview={false} src={data.image.url} style={data.image.size} />
        <div style={{ fontSize: 8 }}>{data.label}</div>
      </div>
    </div>
  );
});
