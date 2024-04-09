import React, { useState, useCallback, useMemo, useEffect } from "react";
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
import CustomUploadButton from "../components/CustomUploadButtom";
import MenuSimulador from "./MenuSimulador";

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

  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges || []);
  const [properties, setProperties] = useState(props.properties || {});
  const [update, setUpdate] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [tag, setTag] = useState(null);
  const [label, setLabel] = useState(null);
  const [openProperties, setOpenProperties] = useState(false);
  const [editing, setEditing] = useState(true);
  const [idNode, setIdNode] = useState("");
  const [flowData, setFlowData] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        const novoObjeto = JSON.parse(event.newValue);
        // Comparar o novo objeto com o estado atual
        if (JSON.stringify(novoObjeto) !== JSON.stringify(flowData)) {
          console.log("O objeto JSON foi alterado:", novoObjeto);
          setFlowData(novoObjeto);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [flowData]);

  useEffect(() => {
    if (flowData) {
      console.log(flowData);
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
      setProperties(flowData.properties);
    }
  }, [flowData]);

  useEffect(() => {
    if (editing) {
      let data = { nodes: nodes, edges: edges };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }, [edges, nodes]);

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
      setEditing(true);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClickHandle = (e, node) => {
    setEditing(false);
    let nodesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).nodes;
    setNodes(nodesData);
    nodesData.map((nds) => {
      if (node.id === nds.id) {
        setTag(nds.data.image.tag);
        setLabel(nds.data.label);
        setIdNode(nds.id);
        setOpenProperties(true);
      }
    });
  };

  const onCloseProperties = () => {
    setOpenProperties(false);
  };
  console.log(nodes);

  return (
    <div className="dndflow" style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => setReactFlowInstance(instance)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        elementsSelectable
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClickHandle}
      >
        <Background variant="lines" gap={16} size={1} color="#eee" />
        <Controls position="top" />
      </ReactFlow>
      <Properties
        visible={openProperties}
        onCloseProperties={onCloseProperties}
        tag={tag}
        label={label}
        update={update}
        setUpdate={setUpdate}
        idNode={idNode}
        nodes={nodes}
        edged={edges}
        propertiesData={properties}
      />
    </div>
  );
};

export default Grid;
