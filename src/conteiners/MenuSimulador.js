import { Space, Col, Row } from "antd";
import {
  ExportOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import BotaoArrastavel from "../components/BotaoArrastavel";
import CustomUploadButton from "../components/CustomUploadButtom";
import { saveAs } from "file-saver";
const LOCAL_STORAGE_KEY = "flowData";

const MenuSimulador = (props) => {
  const handleDownloadJson = () => {
    const jsonContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    const blob = new Blob([jsonContent], { type: "application/json" });
    saveAs(blob, "fluxogramaUsina.json");
  };

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
  const handleNewProject = () => {
    let data = { nodes: [], edges: [] };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    window.location.reload();
  };
  console.log(props);
  return (
    <Row gutter={20} style={{ marginLeft: 15 }}>
      <div style={{ textAlign: "left" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            textAlign: "left",
          }}
        >
          <Space direction="vertical">
            <div>
              <label
                htmlFor="file-input"
                style={{ fontSize: 12, display: "inline-block" }}
              >
                <FolderOpenOutlined
                  style={{ marginRight: "8px", fontSize: "25px" }}
                />
                Importar
              </label>
              <input
                type="file"
                id="file-input"
                accept=".json"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <ExportOutlined
                size={"large"}
                style={{ marginRight: "8px", fontSize: 25 }}
                onClick={handleDownloadJson}
              />
              <span style={{ fontSize: 12 }}>Exportar</span>
            </div>
            <div>
              <FileAddOutlined
                size={"large"}
                style={{ marginRight: "8px", fontSize: 25 }}
                onClick={handleNewProject}
              />
              <span style={{ fontSize: 12 }}>Novo</span>
            </div>
          </Space>
        </Col>
        <div style={{ fontSize: 12, textAlign: "center" }}>Projeto</div>
      </div>
      <div style={{ textAlign: "left" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            width: 150,
            textAlign: "left",
          }}
        >
          <Space direction="vertical">
            <BotaoArrastavel
              src={"alimentacao.png"}
              label={"Alimentação"}
              type={"imageInput"}
              tag={"Alimentacao"}
              style={{ width: 40, height: 40 }}
            />
            <BotaoArrastavel
              src={"pilha.png"}
              label={"Pilha"}
              type={"imageDefault"}
              tag={"Pilha"}
              style={{ width: 40, height: 30 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Alimentação</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            textAlign: "left",
          }}
        >
          <Space direction="vertical">
            <BotaoArrastavel
              src={"britador_mandibula.png"}
              label={"Britador de mandibula"}
              type={"imageDefault"}
              tag={"Britador"}
              style={{ width: 30, height: 30 }}
            />
            <BotaoArrastavel
              src={"britador_giratorio.png"}
              label={"Britador giratorio"}
              type={"imageDefault"}
              tag={"Britador"}
              style={{ width: 40, height: 40 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Britagem</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            textAlign: "left",
          }}
        >
          <Space direction="vertical">
            <BotaoArrastavel
              src={"moinho_barras.png"}
              label={"Moinho de Barras"}
              type={"imageDefaultMoagem"}
              tag={"Moinho"}
              style={{ width: 40, height: 30 }}
            />
            <BotaoArrastavel
              type={"imageDefaultMoagem"}
              label="Moinho de bolas"
              src="moinho_bolas.png"
              tag={"MoinhoBolas"}
              style={{ width: 40, height: 40 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Moagem</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            width: 250,
            textAlign: "left",
          }}
        >
          <Space direction="vertical" wrap>
            <Space direction="horizontal">
              <BotaoArrastavel
                type={"imageDefault"}
                label="Espiral Classificadora"
                src="espiral_classificadora.png"
                tag={"Espiral"}
                style={{ width: 20, height: 40 }}
              />

              <BotaoArrastavel
                type={"imageThree"}
                label="Hidrociclone"
                src="hidrociclone.png"
                tag={"Hidrociclone"}
                style={{ width: 20, height: 40 }}
              />
            </Space>
            <BotaoArrastavel
              type={"imageDefault"}
              label="Mesa Vibratória"
              src="mesa_vibratoria.png"
              tag={"Mesa"}
              style={{ width: 45, height: 20 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Classificação</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Col
          style={{
            borderRight: "1px solid #ddd",
            height: 100,
            width: 200,
            textAlign: "left",
          }}
        >
          <Space direction="vertical" wrap>
            <BotaoArrastavel
              type={"imageDefault"}
              label="Celula Atrição"
              src="celulas_atricao.png"
              tag={"CelulaAtricao"}
              style={{ width: 40, height: 40 }}
            />
            <BotaoArrastavel
              type={"imageThree"}
              label="Coluna Flotação"
              src="coluna_flotacao.png"
              tag={"CelulaFlotacao"}
              style={{ width: 20, height: 40 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Flotação</div>
      </div>
    </Row>
  );
};
export default MenuSimulador;
