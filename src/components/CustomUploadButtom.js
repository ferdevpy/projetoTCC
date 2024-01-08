import React from "react";
import { Upload, message } from "antd";
import { FolderOpenOutlined } from "@ant-design/icons";
const LOCAL_STORAGE_KEY = "flowData";
const CustomUploadButton = () => {
  const props = {
    beforeUpload: (file) => {
      // Sua lógica existente para verificar o arquivo
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Data = e.target.result;
        localStorage.setItem(LOCAL_STORAGE_KEY, base64Data);

        alert("Arquivo carregado com sucesso!");
      };

      reader.readAsText(file);

      // Retornar false para evitar o envio padrão do Ant Design
      return false;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} enviado com sucesso`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} falhou ao enviar`);
      }
    },
  };

  return (
    <Upload {...props} showUploadList={false}>
      <div style={{ textAlign: "center" }}>
        <FolderOpenOutlined size="large" style={{ fontSize: 20 }} />
        <div style={{ fontSize: 12 }}>Abrir Projeto</div>
      </div>
    </Upload>
  );
};

export default CustomUploadButton;
