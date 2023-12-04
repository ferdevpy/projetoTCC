import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "antd";

export default memo(({ data }) => {
  const generateId = (() => {
    let count = 0;

    return () => {
      count += 1;
      return `defaultid_${count}`;
    };
  })();
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div style={{ textAlign: "center" }}>
        <Image preview={false} src={data.image.url} style={data.image.size} />
        <div style={{ fontSize: 8 }}>{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
});
