import { InputNumber, Form, Tabs } from "antd";
import * as echarts from "echarts";
import { getItemsFromLocalStorage } from "../scripts/CalculosGerais";

const PropertiesBritagemSecundaria = (props) => {
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

  const onChangeActiveKey = (event) => {
    if (event === "2") {
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
          title: { show: false, text: "Resultado Britagem Secundária" },
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
                name={"css"}
                label={"CSS"}
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
              <Form.Item style={{ textAlign: "end" }} name={"a1"} label={"A1"}>
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"a3"} label={"A3"}>
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"b1"} label={"B1"}>
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"b2"} label={"B2"}>
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"b3"} label={"B3"}>
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"b4"} label={"B4"}>
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"phi"}
                label={"phi"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"gM"} label={"gM"}>
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"beta"}
                label={"beta"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                style={{ textAlign: "end" }}
                name={"tx"}
                label={"T(x)"}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item style={{ textAlign: "end" }} name={"q"} label={"q"}>
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

export default PropertiesBritagemSecundaria;
