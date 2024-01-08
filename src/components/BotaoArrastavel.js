// BotaoArrastavel.js
import React from "react";
import { Image, Space } from "antd";

const BotaoArrastavel = (props) => {
  const onDragStart = (event, nodeType, src, label) => {
    let data = {
      label: label,
      image: { url: src, size: props.style, tag: props.tag },
    };
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/json", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={(event) =>
        onDragStart(event, props.type, props.src, props.label)
      }
      draggable
      style={{ cursor: "grab" }}
    >
      <div>
        <Space direction="horizontal">
          <Image preview={false} src={props.src} style={props.style} />
          <div style={{ fontSize: 12 }}>{props.label}</div>
        </Space>
      </div>
    </div>
  );
};

export default BotaoArrastavel;
