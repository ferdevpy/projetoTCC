import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image, Space, Input } from "antd";

export default memo(({ data }) => {
  const generateId = (() => {
    let count = 0;

    return () => {
      count += 1;
      return `inputid_${count}`;
    };
  })();
  return (
    <div>
      <div style={{ textAlign: "center", paddingBlock: "10px" }}>
        <Space direction={"vertical"} size={"small"}>
          <Image preview={false} src={data.image.url} style={data.image.size} />
          <Input
            style={{ fontSize: 8, width: 100 }}
            value={data.label}
            size="small"
            bordered={false}
          />
        </Space>
      </div>
      <Handle
        type="source"
        className="customHandleRight"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
});
