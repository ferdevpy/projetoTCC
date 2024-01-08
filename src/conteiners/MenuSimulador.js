import { Space, Col, Row } from "antd";

import BotaoArrastavel from "../components/BotaoArrastavel";

const MenuSimulador = (props) => {
  return (
    <Row gutter={20} style={{ marginLeft: 15 }}>
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
              tag={"Moinho"}
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
