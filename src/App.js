import "./App.css";
import PageHeader from "./components/PageHeader";
import { Layout } from "antd";
import { Component } from "react";
import TopBar from "./conteiners/TopBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Grid from "./conteiners/Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const { Content } = Layout;
class App extends Component {
  render() {
    return (
      <Layout>
        <DndProvider backend={HTML5Backend}>
          <PageHeader />
          <Layout>
            <TopBar />
            <Content>
              <Router>
                <Routes>
                  <Route path="/" element={<Grid />} />
                </Routes>
              </Router>
            </Content>
          </Layout>
        </DndProvider>
      </Layout>
    );
  }
}

export default App;
