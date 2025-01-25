import {
  ConfigProvider,
  Form,
  Modal,
  TimePicker,
  Button,
  Col,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br"; // Localização do dayjs
import ptBR from "antd/lib/locale/pt_BR";

dayjs.locale("pt-br");

dayjs.extend(utc);
dayjs.extend(timezone);

const SimulationSettings = (props) => {
  const [formPropertiesSimulacao] = Form.useForm();
  const formItemLayout = {
    style: { width: "100%" },
    labelAlign: "left",
    labelCol: {
      xs: {
        span: 18,
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
  const time = dayjs.tz("01:00", "HH:mm", "America/Sao_Paulo");
  const handleSaveProperties = () => {
    localStorage.setItem(
      "propertiesSimulacao",
      JSON.stringify(formPropertiesSimulacao.getFieldsValue())
    );
    props.setShowSimulationSettings(false);
  };

  const onClose = () => {
    props.setShowSimulationSettings(false);
  };
  return (
    <Modal
      open={props.visible}
      onCancel={onClose}
      onOk={onClose}
      style={{ width: "600px" }}
      footer={
        <Col
          style={{ alignContent: "end", alignItems: "end", display: "flex" }}
        >
          <Button type="primary" onClick={handleSaveProperties}>
            Salvar
          </Button>
        </Col>
      }
    >
      <Form form={formPropertiesSimulacao} {...formItemLayout}>
        <ConfigProvider locale={ptBR}>
          <Form.Item label={"Intervalo de tempo monitorado"} name={"intervalo"}>
            <TimePicker
              initialValues={dayjs("01:00", "HH:mm")}
              format="HH:mm"
              onChange={(time) => {
                if (time) {
                  const hours = time.hour(); // Extraindo apenas a hora
                  const minutes = time.minute(); // Extraindo apenas os minutos
                  console.log(`Hora selecionada: ${hours}`);
                  console.log(`Minutos selecionados: ${minutes}`);
                  const proportionalValue = hours + minutes / 60; // Calcula o valor proporcional
                  console.log(`Valor proporcional: ${proportionalValue}`);
                }
              }}
              style={{ width: "88px" }}
            />
          </Form.Item>
        </ConfigProvider>
        <Form.Item label={"Dias simulação"} name={"dias"}>
          <InputNumber min={0} defaultValue={1} />
        </Form.Item>
        <Form.Item label={"Horas simulação"} name={"horas"}>
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>
        <Form.Item label={"Minutos simulação"} name={"minutos"}>
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SimulationSettings;
