import { InputNumber, Form, Select, Tabs } from "antd";
import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { getItemsFromLocalStorage } from "../scripts/CalculosGerais";

const PropertiesBritagemPrimaria = (props) => {
  const [caracteristica, setCaracteristica] = useState(<Select></Select>);

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

  const onChangeActiveKey = (event) => {
    console.log(event);
    if (event === "2") {
      let calculos = getItemsFromLocalStorage(props.idNode);
      props.formResults.setFieldsValue(calculos);
      const chartDom = document.getElementById("graficoResultados");
      if (chartDom) {
        const resultadosSimulacao = JSON.parse(
          localStorage.getItem("resultadoSimulacao")
        )[props.idNode];
        // Encontrar o maior valor em cada conjunto de dados
        const maxRecebidaTotal = Math.max(
          ...resultadosSimulacao.massaRecebidaTotal
        );
        const maxSaidaTotal = Math.max(...resultadosSimulacao.massaSaidaTotal);
        const myChart = echarts.init(chartDom);
        // Determinar a proporção entre os dois maiores valores
        const scaleFactor = maxRecebidaTotal / maxSaidaTotal;

        const option = {
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["Massa Recebida Acumulada", "Massa Saída Acumulada"],
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
            type: "category",
            boundaryGap: false,
            data: resultadosSimulacao.hora,
          },
          yAxis: [
            {
              type: "value",
              name: "Massa Recebida (t)",
              position: "left",
            },
            {
              type: "value",
              name: "Massa Saída (t)",
              position: "right",
              offset: 0, // Posiciona ao lado direito
              scale: true, // Permite a escala
            },
          ],
          series: [
            {
              name: "Massa Recebida Acumulada",
              type: "line",
              data: resultadosSimulacao.massaRecebidaTotal.map((value) =>
                parseFloat(value).toFixed(2)
              ),
              yAxisIndex: 0, // Usa o eixo Y primário
            },
            {
              name: "Massa Saída Acumulada",
              type: "line",
              data: resultadosSimulacao.massaSaidaTotal.map(
                (value) => parseFloat(value * scaleFactor).toFixed(2) // Aplica o fator de escala
              ),
              yAxisIndex: 1, // Usa o eixo Y secundário
            },
          ],
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      }
    }
  };

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChangeActiveKey}
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
