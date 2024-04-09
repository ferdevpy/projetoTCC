import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image, Input, Space } from "antd";

export default memo(({ data }) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Handle
          type="target"
          position={Position.Left}
          className="customHandleLeft"
        />
        <Image preview={false} src={data.image.url} style={data.image.size} />
        <Handle
          className="customHandleRight"
          type="source"
          position={Position.Right}
          onConnect={(params) => console.log("handle onConnect", params)}
        />
      </div>
    </div>
  );
});
