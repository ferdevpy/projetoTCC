import React, { useEffect, useState } from "react";
import { FolderOpenOutlined } from "@ant-design/icons";
import { type } from "@testing-library/user-event/dist/type";
const LOCAL_STORAGE_KEY = "flowData";
const CustomUploadButton = (props) => {
  const handleFileChange = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const jsonData = JSON.parse(reader.result);
      const jsonStr = JSON.stringify(jsonData);
      // Salvar a string JSON no Local Storage
      localStorage.setItem(LOCAL_STORAGE_KEY, jsonStr);
      window.location.reload();
      console.log("Arquivo JSON enviado com sucesso!");
    };
    reader.readAsText(file);
  };

  return (
    <div tyle={{ textAlign: "center" }}>
      <label htmlFor="file-input" style={{ display: "inline-block" }}>
        <FolderOpenOutlined style={{ marginRight: "8px", fontSize: 25 }} />
      </label>
      <input
        type="file"
        id="file-input"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomUploadButton;
