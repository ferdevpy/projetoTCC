import React, { memo, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { Image, Input, Space, Tooltip, Row, Col } from "antd";

export default memo(({ data }) => {
  // const gridContent = (
  //   <div style={{ background: "transparent" }}>
  //     <Row
  //       gutter={[16, 16]}
  //       style={{ border: "solid 1px gray", width: "150px", color: "gray" }}
  //     >
  //       Massa
  //     </Row>
  //     <Row
  //       gutter={[16, 16]}
  //       style={{ border: "solid 1px gray", width: "150px", color: "gray" }}
  //     >
  //       %Solidos
  //     </Row>
  //     <Row
  //       gutter={[16, 16]}
  //       style={{ border: "solid 1px gray", width: "150px", color: "gray" }}
  //     >
  //       N/A
  //     </Row>
  //     <Row
  //       gutter={[16, 16]}
  //       style={{ border: "solid 1px gray", width: "150px", color: "gray" }}
  //     >
  //       N/A
  //     </Row>
  //   </div>
  // );

  return (
    // <Tooltip
    //   title={gridContent}
    //   color="#fafafa"
    //   arrow={false}
    //   placement="right"
    // >
    <div>
      <div style={{ textAlign: "center" }}>
        <Handle
          type="target"
          position={Position.Top}
          className="customHandleTop"
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
          className="customHandleBottom"
          type="source"
          position={Position.Bottom}
          onConnect={(params) => console.log("handle onConnect", params)}
        />
      </div>
    </div>
    // </Tooltip>
  );
});
