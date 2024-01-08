import { Drawer, InputNumber, Input, Button, Form, Col } from "antd";
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
    formProperties.getFieldsValue();
  }, [props.idNode]);

  const handleSaveProperties = () => {
    formProperties
      .validateFields()
      .then((values) => {
        let properties = props.propertiesData;
        properties[props.idNode] = formProperties.getFieldsValue();
        props.setProperties(properties);
        let nodes = updateValues(properties);
        let flowData = {
          properties: properties,
          nodes: nodes,
          edges: props.edges,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flowData));
      })
      .catch((errorInfo) => {});
  };

  const updateValues = (properties) => {
    if (props.nodes) {
      let teste = props.nodes.map((no) => {
        let nodeData = no;
        if (properties[no.id] !== undefined) {
          nodeData.data.label = properties[no.id].nome;
          console.log("entrou propertie");
        }

        return nodeData;
      });
    }
  };
  const propertiesObjects = {
    Moinho: (
      <Form size="small" form={formProperties}>
        <Form.Item label={"WI"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"Nome"} name={"nome"} rules={[{ required: true }]}>
          <Input />
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
        <Form.Item label={"WI"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"Nome"} name={"nome"} rules={[{ required: true }]}>
          <Input />
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
        <Form.Item label={"F80"} name={"f80"} rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label={"P80"} name={"p80"} rules={[{ required: true }]}>
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
      title={"Propriedades " + props.label}
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
