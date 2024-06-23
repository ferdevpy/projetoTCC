import { Button, Tooltip } from "antd";
import {
  PauseOutlined,
  CaretRightFilled,
  BorderOutlined,
  SettingFilled,
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import SimulationSettings from "./SimulationSettings";

const FloatPlay = (props) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [showSimulationSettings, setShowSimulationSettings] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerId(id);
    } else if (timerId) {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    if (!(props.isRunning && props.play)) {
      setIsRunning(false);
      props.setEdges(
        props.edges.map((edge) => {
          edge.animated = false;
          return edge;
        })
      );
    }
  }, [props.isRunning, props.play]);

  const handleStart = () => {
    setTimer(0);
    props.setPlay(true);
    setIsRunning(true);
    props.setIsRunning(true);
    props.setEdges(
      props.edges.map((edge) => {
        edge.animated = true;
        return edge;
      })
    );
  };

  const handlePause = () => {
    props.setPlay(false);
    setIsRunning(false);
    props.setIsRunning(false);
    props.setEdges(
      props.edges.map((edge) => {
        edge.animated = false;
        return edge;
      })
    );
  };

  const handleStop = () => {
    props.setPlay(false);
    props.setIsRunning(false);
    setIsRunning(false);
    props.setEdges(
      props.edges.map((edge) => {
        edge.animated = false;
        return edge;
      })
    );
    setTimer(0);
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
          disabled={isRunning && props.isRunning}
        />
      </Tooltip>
      <Tooltip title="Pause">
        <Button
          type="text"
          shape="square"
          icon={<PauseOutlined />}
          style={{ margin: "4px" }}
          onClick={handlePause}
          disabled={!(isRunning && props.isRunning)}
        />
      </Tooltip>
      <Tooltip title="Stop">
        <Button
          type="text"
          shape="square"
          icon={<BorderOutlined />}
          style={{ margin: "4px" }}
          onClick={handleStop}
          disabled={!(isRunning && props.isRunning) && timer === 0}
        />
      </Tooltip>
      <Tooltip title="Timer">
        <div style={{ marginLeft: "8px" }}>{formatTime(timer)}</div>
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
