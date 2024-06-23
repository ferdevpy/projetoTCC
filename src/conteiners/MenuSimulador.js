import { Space, Col, Row, Tooltip } from "antd";
import {
  ExportOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import BotaoArrastavel from "../components/BotaoArrastavel";
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
    let data = { nodes: [], edges: [], properties: {} };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    window.location.reload();
  };
  console.log(props);
  return (
    <Row gutter={20} style={{ marginLeft: 15 }}>
      <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <Space direction="inline" size={"middle"}>
            <Tooltip title="Importar projeto">
              <div>
                <label
                  htmlFor="file-input"
                  style={{ fontSize: 12, display: "inline-block" }}
                >
                  <FolderOpenOutlined
                    style={{ marginRight: "8px", fontSize: "25px" }}
                  />
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept=".json"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </Tooltip>
            <div>
              <Tooltip title="Exportar projeto">
                <ExportOutlined
                  size={"large"}
                  style={{ marginRight: "8px", fontSize: 25 }}
                  onClick={handleDownloadJson}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Novo Projeto">
                <FileAddOutlined
                  size={"large"}
                  style={{ marginRight: "8px", fontSize: 25 }}
                  onClick={handleNewProject}
                />
              </Tooltip>
            </div>
          </Space>
        </Col>
        <div style={{ fontSize: 12, textAlign: "center" }}>Projeto</div>
      </div>
      <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <Space direction="inline" size={"middle"}>
            <BotaoArrastavel
              src={"alimentacao.png"}
              label={"Alimentação"}
              type={"imageInput"}
              tag={"Alimentacao"}
              style={{ width: 40, height: 40 }}
            />
            {/* <BotaoArrastavel
              src={"pilha.png"}
              label={"Pilha"}
              type={"imageDefault"}
              tag={"Pilha"}
              style={{ width: 40, height: 30 }}
            /> */}
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Alimentação</div>
      </div>
      <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <Space direction="inline" size={"middle"}>
            <BotaoArrastavel
              src={"britador_mandibula.png"}
              label={"Britagem Primária"}
              type={"imageDefault"}
              tag={"BritagemPrimaria"}
              style={{ width: 30, height: 30 }}
            />
            <BotaoArrastavel
              src={"britador_giratorio.png"}
              label={"Britagem Secundária"}
              type={"imageDefault"}
              tag={"BritagemSecundaria"}
              style={{ width: 40, height: 40 }}
            />
            {/* <BotaoArrastavel
              src={"Grelha.png"}
              label={"Grelha"}
              type={"imageThree"}
              tag={"Grelha"}
              style={{ width: 40, height: 40 }}
            /> */}
            <BotaoArrastavel
              src={"Peneira.png"}
              label={"Peneiramento"}
              type={"imageThree"}
              tag={"Peneiramento"}
              style={{ width: 40, height: 30 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Britagem</div>
      </div>
      {/* <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <Space direction="inline" size={"middle"}>
            <BotaoArrastavel
              src={"moinho_barras.png"}
              label={"Moinho SAG"}
              type={"imageDefaultMoagem"}
              tag={"SAG"}
              style={{ width: 40, height: 30 }}
            />
            <BotaoArrastavel
              type={"imageDefaultMoagem"}
              label="Moinho de bolas"
              src="moinho_bolas.png"
              tag={"Moagem"}
              style={{ width: 40, height: 40 }}
            />
            <BotaoArrastavel
              type={"imageThree"}
              label="Hidrociclone"
              src="hidrociclone.png"
              tag={"Hidrociclone"}
              style={{ width: 40, height: 40 }}
            />
            <BotaoArrastavel
              src={"Peneira.png"}
              label={"Peneira"}
              type={"imageThree"}
              tag={"Peneiramento"}
              style={{ width: 40, height: 30 }}
            />
          </Space>
        </Col>
        <div style={{ fontSize: 12 }}>Moagem</div>
      </div> */}
      {/* <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <Space direction="inline" size={"middle"}>
            <BotaoArrastavel
              type={"imageDefault"}
              label="Espiral Concentradora"
              src="espiral_classificadora.png"
              tag={"Espiral"}
              style={{ width: 20, height: 40 }}
            />
            <BotaoArrastavel
              type={"imageDefault"}
              label="Celula Convencional"
              src="celulas_atricao.png"
              tag={"CelulaConvencional"}
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
        <div style={{ fontSize: 12 }}>Concentração</div>
      </div> */}
      <div style={{ borderRight: "1px solid #ddd", textAlign: "center" }}>
        <Col
          style={{
            width: "auto",
            height: 50,
            borderBottom: "1px solid #ddd",
            textAlign: "center",
            paddingInline: "10px",
          }}
        >
          <BotaoArrastavel
            src={"pilha.png"}
            label={"Pilha"}
            type={"imageOutput"}
            tag={"Pilha"}
            style={{ width: 40, height: 30 }}
          />
        </Col>
        <div style={{ fontSize: 12 }}>Saída</div>
      </div>
    </Row>
  );
};
export default MenuSimulador;
