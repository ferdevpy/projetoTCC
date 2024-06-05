import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "antd";

export default memo(({ data }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Handle
        type="target"
        id="input1"
        position={Position.Left}
        className="customHandleLeft"
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
      <Handle
        type="source"
        position={Position.Right}
        id="overflow"
        className="customHandleRight"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        id="underflow"
        className="customHandleBottom"
        position={Position.Bottom}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
});
