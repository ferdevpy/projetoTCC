import { Form, Modal, TimePicker, Button, Col, InputNumber } from "antd";
import dayjs from "dayjs";

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
        <Form.Item label={"Intervalo de tempo monitorado"} name={"intervalo"}>
          <TimePicker
            defaultValue={dayjs("01:00", "HH:mm")}
            format={"HH:mm"}
            style={{ width: "88px" }}
          />
        </Form.Item>
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
