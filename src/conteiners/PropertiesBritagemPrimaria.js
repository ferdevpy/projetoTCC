import { InputNumber, Form, Select, Tabs } from "antd";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { getItemsFromLocalStorage } from "../scripts/CalculosGerais";

const PropertiesBritagemPrimaria = (props) => {
  const [caracteristica, setCaracteristica] = useState(<Select></Select>);
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
    const workIndexValue = props.formProperties.getFieldValue("workIndex");
    if (workIndexValue !== undefined) {
      onChangeWorkIndex(workIndexValue);
    }
  }, [props.idNode]);
  const onChangeWorkIndex = (event) => {
    if (event >= 5 && event <= 10) {
      setCaracteristica(
        <Select>
          <Select.Option value={0.9}>Macio</Select.Option>
          <Select.Option value={0.95}>Macio esponjoso</Select.Option>
        </Select>
      );
    } else if (event > 10 && event <= 13) {
      setCaracteristica(
        <Select>
          <Select.Option value={0.9}>Mediano</Select.Option>
          <Select.Option value={0.85}>Mediano esponjoso</Select.Option>
        </Select>
      );
    } else if (event > 13) {
      setCaracteristica(
        <Select>
          <Select.Option value={0.9}>Brita Dura</Select.Option>
          <Select.Option value={0.82}>Duro e tenaz</Select.Option>
          <Select.Option value={0.75}>Duro lamelar</Select.Option>
        </Select>
      );
    }
  };

  useEffect(() => {
    const workIndexValue = props.formProperties.getFieldValue("workIndex");
    if (workIndexValue !== undefined) {
      onChangeWorkIndex(workIndexValue);
    }
  }, [props.idNode]);

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
          title: { show: false, text: "Resultado Britagem Primária" },
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
                name={"oss"}
                label={"OSS(APA)"}
              >
                <InputNumber />
              </Form.Item>
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
                name={"workIndex"}
                label={"Work Index"}
              >
                <InputNumber onChange={onChangeWorkIndex} />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"Pt"}
                label={"Característica do Material"}
              >
                {caracteristica}
              </Form.Item>
            </Form>
          ),
        },
        {
          label: "Resultados",
          key: "2",
          children: (
            <Form size="small" form={props.formResults} {...formItemLayout}>
              <Form.Item style={{ textAlign: "end" }} name={"ku"} label={"Ku"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"pt"} label={"Pt"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"Pb"} label={"Pb"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"kl"} label={"KL"}>
                <InputNumber readOnly />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"p80"}
                label={"P80"}
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

export default PropertiesBritagemPrimaria;
