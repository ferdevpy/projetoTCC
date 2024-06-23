import { Layout, Typography, Image, Space } from "antd";
const { Header } = Layout;
const { Title } = Typography;
const PageHeader = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffbc51",
        height: "60px",
        textAlign: "center",
      }}
    >
      <Image
        src="logo.png"
        style={{
          alignContent: "center",
          flexWrap: "wrap",
          position: "relative",
          placeContent: "center",
          display: "flex",
        }}
        height={55}
        preview={false}
      />
      <Title
        level={3}
        title="Simulador Geometalúrgico de Usina"
        style={{
          top: "-10%",
          left: "40%",
          alignContent: "center",
          flexWrap: "wrap",
          position: "relative",
          placeContent: "center",
          display: "flex",
          color: "#FFFFFF",
        }}
      >
        Simulador Geometalúrgico de Usina
      </Title>
    </Header>
  );
};
export default PageHeader;
