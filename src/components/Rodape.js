import { Space, Typography } from "antd";

const { Text } = Typography;
const Rodape = () => {
  return (
    <Space direction="vertical">
      <Text style={{ fontSize: 10, color: "#626262" }}>
        Fernanda Marques © 2024 - Projeto TCC
      </Text>
      <Text style={{ fontSize: 10, color: "#626262" }}>
        version: {process.env.REACT_APP_VERSION}
      </Text>
    </Space>
  );
};

export default Rodape;
