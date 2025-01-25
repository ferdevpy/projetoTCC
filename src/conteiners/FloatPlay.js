import { Button, Tooltip, notification } from "antd";

import {
  PauseOutlined,
  CaretRightFilled,
  BorderOutlined,
  SettingFilled,
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import SimulationSettings from "./SimulationSettings";

const FloatPlay = (props) => {
  const [showSimulationSettings, setShowSimulationSettings] = useState(false);

  const requiredFields = {
    Pilha: [],
    BritagemPrimaria: [
      "oss",
      "eficiencia",
      "capacidadeMaxima",
      "workIndex",
      "Pt",
    ],
    BritagemSecundaria: [
      "css",
      "eficiencia",
      "capacidadeMaxima",
      "a1",
      "a3",
      "b1",
      "b2",
      "b3",
      "b4",
      "phi",
      "gM",
      "beta",
      "tx",
      "q",
    ],
    Peneiramento: [
      "eficiencia",
      "capacidadeMaxima",
      "abertura",
      "sNb",
      "sP",
      "sLi",
    ],
    Alimentacao: [
      "porcentagemSolidos",
      "variabilidade",
      "densidade",
      "taxaAlimentacao",
    ],
  };
  useEffect(() => {
    if (!props.play) {
      props.setEdges(
        props.edges.map((edge) => {
          edge.animated = false;
          return edge;
        })
      );
    }
  }, [props.play, props.edges, props.setEdges]);

  const handleStart = () => {
    const flowData = JSON.parse(localStorage.getItem("flowData")) || {};
    const properties = JSON.parse(localStorage.getItem("properties")) || {};
    const nodes = flowData.nodes || [];
    let allFieldsFilled = true;
    let message = "";

    nodes.forEach((node) => {
      const nodeId = node.id;
      const nodeType = node.data.image.tag;

      const required = requiredFields[nodeType] || [];

      const missingFields = required.filter(
        (field) => !properties[nodeId]?.hasOwnProperty(field)
      );

      if (missingFields.length > 0) {
        allFieldsFilled = false;
        message += `No equipamento ${nodeId} (${nodeType}) está faltando os seguintes campos: ${missingFields.join(
          ", "
        )}\n`;
      }
    });

    if (!allFieldsFilled) {
      notification.error({
        message: "Campos obrigatórios ausentes",
        description: message,
        duration: 5,
      });
    } else {
      props.setPlay(true);
      props.setEdges(
        props.edges.map((edge) => {
          edge.animated = true;
          return edge;
        })
      );
    }
  };

  const handlePause = () => {
    props.setPlay(false);
    props.setEdges(
      props.edges.map((edge) => {
        edge.animated = false;
        return edge;
      })
    );
  };

  const handleStop = () => {
    props.setPlay(false);
    props.setEdges(
      props.edges.map((edge) => {
        edge.animated = false;
        return edge;
      })
    );
    props.setSimulationTime(0); // Resetar o tempo de simulação no circuito
  };

  const handleShowSettings = () => {
    setShowSimulationSettings(true);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "15%",
        right: "50px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "4px",
        padding: "8px",
        height: "30px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Tooltip title="Play">
        <Button
          type="text"
          shape="square"
          icon={<CaretRightFilled />}
          style={{ margin: "4px" }}
          onClick={handleStart}
          disabled={props.play}
        />
      </Tooltip>
      <Tooltip title="Pause">
        <Button
          type="text"
          shape="square"
          icon={<PauseOutlined />}
          style={{ margin: "4px" }}
          onClick={handlePause}
          disabled={!props.play}
        />
      </Tooltip>
      <Tooltip title="Stop">
        <Button
          type="text"
          shape="square"
          icon={<BorderOutlined />}
          style={{ margin: "4px" }}
          onClick={handleStop}
          disabled={!props.play && props.simulationTime === 0}
        />
      </Tooltip>
      <Tooltip title="Timer">
        <div style={{ marginLeft: "8px" }}>
          {formatTime(props.simulationTime)}
        </div>
      </Tooltip>
      <Button
        icon={<SettingFilled />}
        type="text"
        style={{ margin: "4px" }}
        onClick={handleShowSettings}
      />
      <SimulationSettings
        setShowSimulationSettings={setShowSimulationSettings}
        visible={showSimulationSettings}
      />
    </div>
  );
};

export default FloatPlay;
