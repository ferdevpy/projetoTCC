import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image, Space, Input } from "antd";

export default memo(({ data, id }) => {
  const handleLabelChange = (e) => {
    const flowData = JSON.parse(localStorage.getItem("flowData"));
    if (flowData.nodes) {
      let newNodesData = flowData.nodes.map((nds) => {
        if (nds.id === id) {
          localStorage.setItem(
            id+"labelUpdate",
            JSON.stringify({ id: id, label: e.target.value })
          );
          nds.data.label = e.target.value;
          return nds;
        } else {
          return nds;
        }
      });
      flowData.nodes = newNodesData;
      localStorage.setItem("flowData", JSON.stringify(flowData));
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center", paddingBlock: "10px" }}>
        <Space direction={"vertical"} size={"small"}>
          <Image preview={false} src={data.image.url} style={data.image.size} />
          <Input
            style={{ fontSize: 8, width: 100 }}
            defaultValue={data.label}
            size="small"
            bordered={false}
            onPressEnter={handleLabelChange}
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
