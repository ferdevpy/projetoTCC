import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
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
      label: "Simulador",
      key: "sim",
      children: [collapsed ? <MenuSimulador /> : null],
    },
    { label: "Ajuda", key: "ajuda" },
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
