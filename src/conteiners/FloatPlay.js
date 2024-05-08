import { Button, Tooltip } from "antd";
import {
  PauseOutlined,
  CaretRightFilled,
  BorderOutlined,
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";
const FloatPlay = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      setTimerId(id);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning]); // Executar o efeito quando o estado de isRunning mudar

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimer(0);
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
        right: "20px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "4px",
        padding: "8px",
        height: "30px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 1000, // Ajuste conforme necessário para garantir que a div flutuante esteja acima de outros elementos
        display: "flex", // Usando um layout flexível
        alignItems: "center", // Ajuste conforme necessário para garantir que a div flutuante esteja acima de outros elementos
      }}
    >
      <Tooltip title="Play">
        <Button
          type="text"
          shape="square"
          icon={<CaretRightFilled />}
          style={{ margin: "4px" }}
          onClick={handleStart}
          disabled={isRunning}
        />
      </Tooltip>
      <Tooltip title="Pause">
        <Button
          type="text"
          shape="square"
          icon={<PauseOutlined />}
          style={{ margin: "4px" }}
          onClick={handlePause}
          disabled={!isRunning}
        />
      </Tooltip>
      <Tooltip title="Stop">
        <Button
          type="text"
          shape="square"
          icon={<BorderOutlined />}
          style={{ margin: "4px" }}
          onClick={handleStop}
          disabled={!isRunning && timer === 0}
        />
      </Tooltip>
      <Tooltip title="Timer">
        <div style={{ marginLeft: "8px" }}>{formatTime(timer)}</div>
      </Tooltip>
    </div>
  );
};

export default FloatPlay;
