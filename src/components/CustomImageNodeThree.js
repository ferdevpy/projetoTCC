import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "antd";

export default memo(({ data }) => {
  return (
    <div style={{ textAlign: "center", paddingBlock: "10px" }}>
      <Handle
        type="target"
        position={Position.Left}
        className="customHandleLeft"
      />
      <Image preview={false} src={data.image.url} style={data.image.size} />
      <Handle
        type="source"
        position={Position.Right}
        id="output1"
        className="customHandleRight"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        id="output2"
        className="customHandleBottom"
        position={Position.Bottom}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
});
