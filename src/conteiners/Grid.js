import React, { useState, useRef, useCallback, useMemo } from "react";
// import  { Background, Controls } from "react-flow-renderer";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import "../index.css";
import "reactflow/dist/style.css";
import "../App.css";
import CustomImageNodeInput from "../components/CustomImageNodeInput";
import CustomImageNodeOutput from "../components/CustomImageNodeOutput";
import CustomImageNodeDefault from "../components/CustomImageNodeDefault";
import CustomImageNodeThree from "../components/CustomImageNodeThree";

const Grid = (props) => {
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const nodeTypes = useMemo(
    () => ({
      imageInput: CustomImageNodeInput,
      imageOutput: CustomImageNodeOutput,
      imageDefault: CustomImageNodeDefault,
      imageThree: CustomImageNodeThree
    }),
    []
  );

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      console.log("onConnect event:", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const data = JSON.parse(event.dataTransfer.getData("application/json"));
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: data,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div className="dndflow" style={{ width: "100%", height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background variant="lines" gap={16} size={1} color="#eee" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Grid;
