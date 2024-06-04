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

type WorkflowProps = {
  nodes: Node[]
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  edges: Edge[]
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

const WorkflowTest1Workflow: React.FC<WorkflowProps> = (props) => {
  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      props.setNodes((nds) => applyNodeChanges(chs, nds))
    },
    [props.setNodes],
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      props.setEdges((eds) => applyEdgeChanges(chs, eds))
    },
    [props.setEdges],
  )

  const onConnect: OnConnect = useCallback(
    (params) => props.setEdges((eds) => addEdge(params, eds)),
    [props.setEdges],
  )
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={props.nodes}
          edges={props.edges}
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
