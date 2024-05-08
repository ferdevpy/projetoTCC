// BotaoArrastavel.js
import React from "react";
import { Image, Tooltip } from "antd";

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
        <Tooltip title={props.label}>
          <Image preview={false} src={props.src} style={props.style} />
        </Tooltip>
      </div>
    </div>
  );
};

export default BotaoArrastavel;
