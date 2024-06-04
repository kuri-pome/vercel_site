'use client'
import React, { useState, useCallback } from 'react'
import WorkflowTest1Workflow from './WorkflowTest1Workflow'
import { WorkflowTest1Control } from './WorkflowTest1Control'

import ReactFlow, { Edge, Node } from 'reactflow'

const initialNodes: Node[] = [
  // {
  //   id: '1',
  //   type: 'input',
  //   data: { label: 'Node 1' },
  //   position: { x: 250, y: 5 },
  // },
  // {
  //   id: '2',
  //   data: { label: 'Node 2' },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   data: { label: 'Node 3' },
  //   position: { x: 400, y: 100 },
  // },
]

const initialEdges: Edge[] = [
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e1-3', source: '1', target: '3', animated: true },
]

const WorkflowTest1Main = () => {
  // workflow info
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

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

  return (
    <div className="flex-row h-full">
      <div className="h-full grow">
        <div className="flex h-full">
          <div className="h-full w-[300px] border-4">
            <WorkflowTest1Control addNode={addNode} />
          </div>
          <WorkflowTest1Workflow
            nodes={nodes}
            setNodes={setNodes}
            setEdges={setEdges}
            edges={edges}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkflowTest1Main
