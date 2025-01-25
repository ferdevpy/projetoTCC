import {
  Drawer,
  InputNumber,
  Input,
  Button,
  Form,
  Col,
  Checkbox,
  Select,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import PropertiesBritagemPrimaria from "./PropertiesBritagemPrimaria";
import PropertiesPeneiramento from "./PropertiesPeneiramento";
import PropertiesBritagemSecundaria from "./PropertiesBritagemSecundaria";

const LOCAL_STORAGE_KEY = "flowData";
const Properties = (props) => {
  const [formProperties] = Form.useForm();
  const [formResults] = Form.useForm();
  const [variablePower, setVariablePower] = useState(
    <>
      <InputNumber style={{ width: 100 }} />
    </>
  );
  const [variablePowerRules, setVariablePowerRules] = useState("");

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
    let storageAnterior = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    let propertiesStorageAnterior = JSON.parse(
      localStorage.getItem("properties")
    )
      ? JSON.parse(localStorage.getItem("properties"))
      : {};

    storageAnterior.properties = properties;
    propertiesStorageAnterior[props.idNode] = formProperties.getFieldsValue();
    localStorage.setItem(
      "properties",
      JSON.stringify(propertiesStorageAnterior)
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageAnterior));
    window.location.reload();
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

  const onChangeVariablePower = (event) => {
    if (event.target.checked) {
      setVariablePower(
        <>
          <InputNumber style={{ width: "40%" }} />
          {"-"}
          <InputNumber style={{ width: "40%" }} />
        </>
      );
      setVariablePowerRules({
        rules: [
          {
            type: "array",
          },
        ],
      });
    } else {
      setVariablePowerRules({
        rules: [
          {
            type: "number",
          },
        ],
      });
      setVariablePower(
        <>
          <InputNumber style={{ width: 100 }} />
        </>
      );
    }
  };
  const propertiesObjects = {
    MoinhoBolas: (
      <Form size="small" form={formProperties} {...formItemLayout}>
        <Form.Item
          name={"enableBallMill"}
          label={"Enable Ball mill"}
          style={{ textAlign: "end" }}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"designBallMill"}
          label={"Design Ball mill"}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"millPower"}
          label={"Mill Power [kW]"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"bondRelationship"}
          label={"Bond Relationship"}
        >
          <Select></Select>
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"bondMultiplier"}
          label={"Bond Multiplier"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"bondExponent"}
          label={"Bond Exponent"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"bondConstant"}
          label={"Bond Constant"}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    ),
    Alimentacao: (
      <Form size="small" form={formProperties} {...formItemLayout}>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"porcentagemSolidos"}
          label={"Porcentagem de Sólidos"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"densidade"}
          label={"Densidade"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"taxaAlimentacao"}
          label={"Taxa de Alimentação (t/h)"}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"variabilidade"}
          label={"Variabilidade (%)"}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    ),
    BritagemPrimaria: (
      <PropertiesBritagemPrimaria
        formProperties={formProperties}
        formResults={formResults}
        idNode={props.idNode}
      />
    ),
    BritagemSecundaria: (
      <PropertiesBritagemSecundaria
        formProperties={formProperties}
        formResults={formResults}
        idNode={props.idNode}
      />
    ),
    Peneiramento: (
      <PropertiesPeneiramento
        formProperties={formProperties}
        formResults={formResults}
        idNode={props.idNode}
      />
    ),
    SAG: (
      <Form size="small" form={formProperties} {...formItemLayout}>
        <Form.Item
          name={"enableSAG"}
          label={"Enable AG/SAG"}
          style={{ textAlign: "end" }}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"millType"}
          label={"Mill Type"}
        >
          <Select></Select>
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"steelLoad"}
          label={"Steel Load [%]"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"designSAGMillPower"}
          label={"Design Autogenous Mill Power"}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"variablePower"}
          label={"Variable Power"}
        >
          <Checkbox onChange={onChangeVariablePower} />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"millPower"}
          label={"Mill Power [kW]"}
          {...variablePowerRules}
        >
          {variablePower}
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"spiRange"}
          label={"SPI Range"}
        >
          <>
            <InputNumber style={{ width: "40%" }} />
            {"-"}
            <InputNumber min={0} style={{ width: "40%" }} />
          </>
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"efficiencyFactor"}
          label={"Efficiency Factor"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"sagFactorSlope"}
          label={"SAG/AG Factor Slope"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"sagFactorIntercept"}
          label={"SAG/AG Factor Intercept"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"designGrateSize"}
          label={"Design Grate Size"}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"grateSize"}
          label={"Grate Size [mm]"}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    ),
    BritadorGiratorio: (
      <Form size="small" form={formProperties} {...formItemLayout}>
        <Form.Item
          name={"enablePebbleCrusher"}
          label={"Enable Pebble Crusher Parameters"}
          style={{ textAlign: "end" }}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item style={{ textAlign: "end" }} name={"pc50"} label={"PC50"}>
          <InputNumber />
        </Form.Item>
        <Form.Item style={{ textAlign: "end" }} name={"pc80"} label={"PC80"}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"pcclSlope"}
          label={"PCCL Slope"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"pcclIntercept"}
          label={"PCCL Intercept"}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    ),
    Hidrociclone: (
      <Form size="small" form={formProperties} {...formItemLayout}>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"targetP80Min"}
          label={"Target P80 Min"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"targetP80Max"}
          label={"Target P80 Max"}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ textAlign: "end" }}
          name={"targetTPHMax"}
          label={"Target TPH Max"}
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
      size="large"
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
