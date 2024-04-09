import { Drawer, InputNumber, Input, Button, Form, Col, Checkbox } from "antd";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "flowData";

const Properties = (props) => {
  const [formProperties] = Form.useForm();

  useEffect(() => {
    formProperties.resetFields();
    formProperties.setFieldsValue(
      props.propertiesData[props.idNode] !== undefined
        ? props.propertiesData[props.idNode]
        : {}
    );
  }, [props.idNode]);

  const savePropertie = () => {
    let properties = props.propertiesData;
    properties[props.idNode] = formProperties.getFieldsValue();
    // props.setProperties(properties);
    console.log(properties);
    props.setUpdate(!props.update);
    localStorage.setItem("properties", JSON.stringify(properties));
  };
  const handleSaveProperties = () => {
    console.log("salvando");
    formProperties
      .validateFields()
      .then(() => {
        savePropertie();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const propertiesObjects = {
    MoinhoBolas: (
      <Form size="small" form={formProperties}>
        <Form.Item label={"Enable last mill"}>
          <Checkbox />
        </Form.Item>
        <Form.Item label={"Mill Power [kW]"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"Bond Multiplier"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"Bond Exponent"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"Bond Constant"}>
          <InputNumber />
        </Form.Item>
        {/* <Form.Item label={"Nome"} name={"nome"} rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label={"% Sólidos"}
          name={"porcentagemSolidos"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Top Size"}
          name={"topSize"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Minor Size"}
          name={"minorSize"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label={"F80"} name={"f80"} rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"P80"} name={"p80"} rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </Form>
    ),
    Alimentacao: (
      <Form size="small" form={formProperties}>
        <Form.Item label={"F50 Max"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"F50 Slope"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"F50 Intercept"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"F50 Slope"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"F50 Intercept"}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"% Sólidos"}
          name={"porcentagemSolidos"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Top Size"}
          name={"topSize"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Minor Size"}
          name={"minorSize"}
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    ),
  };

  const onCloseProperties = () => {
    formProperties.resetFields();
    props.onCloseProperties();
  };
  return (
    <Drawer
      title={`Propriedades ${props.label}`}
      autoFocus={false}
      onClose={onCloseProperties}
      open={props.visible}
      maskClosable={false}
      mask={false}
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
      {propertiesObjects[props.tag]}
    </Drawer>
  );
};
export default Properties;
