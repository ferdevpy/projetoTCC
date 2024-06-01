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
      <div
        style={{
          width: "50px",
          height: "50px",
          display: "grid",
          alignContent: "space-around",
          border: "0.00000001rem ridge gray",
          borderRadius: "4px",
        }}
      >
        <Image preview={false} src={data.image.url} style={data.image.size} />
      </div>
    </div>
  );
});
