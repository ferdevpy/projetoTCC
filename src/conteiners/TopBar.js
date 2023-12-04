import React, { useState } from "react";
import { Tabs, Space, Upload, Button } from "antd";
import {
  FolderOpenOutlined,
  ExportOutlined,
  FileOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import MenuSimulador from "./MenuSimulador";


const TopBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const buttonCollapse = () => {
    return collapsed ? <UpOutlined /> : <DownOutlined />;
  };
  const items = [
    {
      label: "Arquivo",
      key: "arquivo",
      children: [
        collapsed ? (
          <Space direction="horizontal">
            {" "}
            <Upload>
              <div style={{ textAlign: "center" }}>
                <FolderOpenOutlined size={"large"} style={{ fontSize: 20 }} />
                <div style={{ fontSize: 12 }}>Abrir Projeto</div>
              </div>
            </Upload>
            <div style={{ textAlign: "center" }}>
              <FileOutlined size={"large"} style={{ fontSize: 20 }} />
              <div style={{ fontSize: 12 }}>Novo Projeto</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ExportOutlined size={"large"} style={{ fontSize: 20 }} />
              <div style={{ fontSize: 12 }}>Exportar Projeto</div>
            </div>
          </Space>
        ) : null,
      ],
    },
    { label: "Ajuda", key: "ajuda" },
    {
      label: "Simulador",
      key: "sim",
      children: [collapsed ? <MenuSimulador /> : null],
    },
  ];

  const handleTabChange = () => {
    setCollapsed(true);
  };

  return (
    <div>
      <Tabs items={items} onChange={handleTabChange} />
      {
        <div
          style={{ position: "absolute", top: 60, right: 0, padding: "10px" }}
        >
          <Button
            size="small"
            type="text"
            onClick={toggleCollapse}
            icon={buttonCollapse()}
          />
        </div>
      }
    </div>
  );
};
export default TopBar;
