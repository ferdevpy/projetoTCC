import { InputNumber, Form, Tabs } from "antd";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { getItemsFromLocalStorage } from "../scripts/CalculosGerais";

const PropertiesPeneiramento = (props) => {
  const [activeKey, setActiveKey] = useState("1");

  const formItemLayout = {
    style: { width: "100%" },
    labelAlign: "left",
    labelCol: {
      xs: {
        span: 12,
      },
    },
    labelWrap: true,
    wrapperCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
    },
  };

  useEffect(() => {
    if (activeKey === "2") {
      let calculos = getItemsFromLocalStorage(props.idNode);
      props.formResults.setFieldsValue(calculos);
      const chartDom = document.getElementById("graficoResultados");
      if (chartDom) {
        var option;
        let resultadosSimulacao = JSON.parse(
          localStorage.getItem("resultadoSimulacao")
        )[props.idNode];
        var myChart = echarts.init(chartDom);
        option = {
          title: { show: false, text: "Resultado Peneiramento" },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["P80", "Massa Recebida Acumulada", "Massa Saída Acumulada"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            name: "Tempo (h)",
            nameLocation: "middle", // Localização do título
            nameTextStyle: {
              fontSize: 14,
              padding: [0, 0, 150, 0], // Ajuste do espaçamento
            },
            type: "category",
            boundaryGap: false,
            data: resultadosSimulacao.hora,
            axisLabel: {
              interval: Math.ceil(resultadosSimulacao.hora.length / 10), // Define o intervalo dos rótulos
            },
          },
          yAxis: {
            title: "Massa (t)",
            type: "value",
            axisLabel: {
              formatter: (value) => parseFloat(value).toFixed(0), // Sem casas decimais no eixo y
            },
          },
          series: [
            {
              name: "Massa Recebida Acumulada",
              type: "line",
              stack: "Total",
              data: resultadosSimulacao.massaRecebidaTotal.map((value) =>
                parseFloat(value).toFixed(2)
              ),
            },
            {
              name: "Massa Saída Acumulada",
              type: "line",
              stack: "Total",
              data: resultadosSimulacao.massaSaidaTotal.map((value) =>
                parseFloat(value).toFixed(2)
              ),
            },
          ],
        };
        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      }
    }
  }, [activeKey]);

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={setActiveKey}
      items={[
        {
          label: "Propriedades",
          key: "1",
          children: (
            <Form size="small" form={props.formProperties} {...formItemLayout}>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"eficiencia"}
                label={"Eficiencia"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"capacidadeMaxima"}
                label={"Capacidade Máxima (t/h)"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"abertura"}
                label={"Abertura (mm)"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"sNb"}
                label={"sNb (kg/m³)"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"sP"}
                label={"sP (kg/m³)"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"sLi"}
                label={"sLi (kg/m³)"}
              >
                <InputNumber />
              </Form.Item>
            </Form>
          ),
        },
        {
          label: "Resultados",
          key: "2",
          children: (
            <Form size="small" form={props.formResults} {...formItemLayout}>
              <Form.Item style={{ textAlign: "end" }} name={"k2"} label={"k2"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"k3"} label={"k4"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"k4"} label={"k4"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"k6"} label={"k6"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"produtorio"}
                label={"Produtório"}
              >
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"IUP"}
                label={"IUP"}
              >
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"RR"} label={"RR"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"e"} label={"e"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"1menose"}
                label={"1-e"}
              >
                <InputNumber readOnly />
              </Form.Item>

              <div
                id="graficoResultados"
                style={{ width: "700px", height: "400px" }}
              ></div>
            </Form>
          ),
        },
      ]}
    ></Tabs>
  );
};

export default PropertiesPeneiramento;
