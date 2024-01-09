import React, { useState } from "react";
import { Tabs, Space, Button } from "antd";
import { ExportOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import MenuSimulador from "./MenuSimulador";
import CustomUploadButton from "../components/CustomUploadButtom";
import { saveAs } from "file-saver";
const LOCAL_STORAGE_KEY = "flowData";

const TopBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleDownloadJson = () => {
    const jsonContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    const blob = new Blob([jsonContent], { type: "application/json" });
    saveAs(blob, "fluxogramaUsina.json");
  };

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
            <CustomUploadButton />
            <div style={{ textAlign: "center" }}>
              <ExportOutlined
                size={"large"}
                style={{ fontSize: 20 }}
                onClick={handleDownloadJson}
              />
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
      <Tabs
        items={items}
        onChange={handleTabChange}
        type="card"
        style={{ padding: 10 }}
      />
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
