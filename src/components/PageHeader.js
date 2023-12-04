import { Layout, Typography } from "antd";
const { Header } = Layout;
const { Title } = Typography;
const PageHeader = () => {
  return (
    <Header
      style={{
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Title level={3} color="#FFFFFF">
        {" "}
        Plant Simulator
      </Title>
    </Header>
  );
};
export default PageHeader;
