import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
// import  { Background, Controls } from "react-flow-renderer";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

import "../index.css";
import "reactflow/dist/style.css";
import "../App.css";
import CustomImageNodeInput from "../components/CustomImageNodeInput";
import CustomImageNodeOutput from "../components/CustomImageNodeOutput";
import CustomImageNodeDefault from "../components/CustomImageNodeDefault";
import CustomImageNodeThree from "../components/CustomImageNodeThree";
import Properties from "./Properties";
import CustomImageNodeDefaultMoagem from "../components/CustomImageNodeDefaultMoagem";

const LOCAL_STORAGE_KEY = "flowData";

const Grid = (props) => {
  let id = 0;
  const getId = () => `${id++}`;

  const nodeTypes = useMemo(
    () => ({
      imageInput: CustomImageNodeInput,
      imageOutput: CustomImageNodeOutput,
      imageDefault: CustomImageNodeDefault,
      imageThree: CustomImageNodeThree,
      imageDefaultMoagem: CustomImageNodeDefaultMoagem,
    }),
    []
  );

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [properties, setProperties] = useState({});
  const [update, setUpdate] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [tag, setTag] = useState(null);
  const [label, setLabel] = useState(null);
  const [openProperties, setOpenProperties] = useState(false);
  const [idNode, setIdNode] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setNodes(JSON.parse(storedData).nodes);
      setEdges(JSON.parse(storedData).edges);
      setProperties(JSON.parse(storedData).properties);
    }
  }, [update]);
  
  useEffect(() => {
    let data = { nodes: nodes, edges: edges, properties: properties };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [edges, nodes, properties]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        type: "step",
        // animated: true, // Adiciona um efeito animado à aresta
        // label: 'Sua seta personalizada',
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));
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
        id: `${data.image.tag}${getId()}`,
        type,
        position,
        data: data,
        smoothStep: 0,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClickHandle = (e, node) => {
    setTag(node.data.image.tag);
    setLabel(node.data.label);
    setIdNode(node.id);
    setOpenProperties(true);
  };

  const onCloseProperties = () => {
    setOpenProperties(false);
  };

  console.log("properties filled", properties);
  return (
    <div className="dndflow" style={{ width: "100%", height: "100vh" }}>
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
        onNodeClick={onNodeClickHandle}
      >
        <Background variant="lines" gap={16} size={1} color="#eee" />
        <Controls />
      </ReactFlow>
      <Properties
        visible={openProperties}
        onCloseProperties={onCloseProperties}
        tag={tag}
        label={label}
        update={update}
        idNode={idNode}
        nodes={nodes}
        edged={edges}
        propertiesData={properties}
      />
    </div>
  );
};

export default Grid;
