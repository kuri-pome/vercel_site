'use client'
import React from 'react'
import ReactFlow, { Edge, Node } from 'reactflow'
import HeadlessModal from '@/features/common/components/HeadlessModal'
import { HeadlessTabs } from '@/features/common/components/HeadlessTabs'

type WorkflowTextProps = {
  nodes: Node[]
  edges: Edge[]
}

export const WorkflowTest1WorkflowText: React.FC<WorkflowTextProps> = (
  props,
) => {
  const json_nodes = () => {
    return <div className="h-ful">{JSON.stringify(props.nodes, null, 2)}</div>
  }
  const json_edges = () => {
    return <div className="h-ful">{JSON.stringify(props.edges, null, 2)}</div>
  }
  const ttt = [
    {
      name: 'Node',
      value: json_nodes,
    },
    {
      name: 'Edge',
      value: json_edges,
    },
  ]
  return (
    <>
      <HeadlessTabs tabs={ttt} />
    </>
  )
}
