'use client'
import React, { useState, useCallback } from 'react'
import ReactFlow, {
  Edge,
  Node,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'

import CustomNode from './CustomNode'

const nodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
]

const WorkflowTest1Workflow = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes((nds) => applyNodeChanges(chs, nds))
    },
    [setNodes],
  )

  const addNode = useCallback(() => {
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        data: { label: `Node ${nds.length + 1}` },
        position: { x: 300, y: 300 },
        width: 100,
        height: 300,
        // size: {
        //   width: 100,
        //   height: 40,
        // },
        type: 'custom',
        className: 'border-12',
      },
    ])
    console.log(nodes)
  }, [nodes])

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      setEdges((eds) => applyEdgeChanges(chs, eds))
    },
    [setEdges],
  )

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <>
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <button onClick={addNode}>add</button>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>
    </>
  )
}

export default WorkflowTest1Workflow
