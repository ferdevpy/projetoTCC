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
            id + "labelUpdate",
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
      <div style={{ textAlign: "center" }}>
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
          className="customHandleRight"
          position={Position.Right}
          isConnectable={true}
        />
      </div>
    </div>
  );
});
