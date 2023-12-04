import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls } from 'react-flow-renderer';

const ReactFlowWrapper = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementClick = (_, element) => setSelectedElement(element);

  const onDragOver = (event) => event.preventDefault();

  const onDrop = (event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    const newNode = {
      id: Date.now().toString(),
      type: 'default',
      position: { x: clientX - 50, y: clientY - 25 },
      data: { label: 'New Node' },
    };
    setElements((els) => [...els, newNode]);
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementClick={onElementClick}
        snapToGrid={true}
      />
      <MiniMap />
      <Controls />
      {selectedElement && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <p>Selected: {selectedElement.data.label}</p>
        </div>
      )}
    </div>
  );
};

export default ReactFlowWrapper;
