'use client'
import React, { useState, useCallback } from 'react'
import WorkflowTest1Workflow from './WorkflowTest1Workflow'
import { WorkflowTest1Control } from './WorkflowTest1Control'
// import { ReactflowSettingProps } from './WorkflowTest1ReactflowSetting'
import { HeadlessModalAlert } from '@/features/common/components/HeadlessModalAlert'

import ReactFlow, { Edge, Node } from 'reactflow'
import { WorkflowTest1AirflowForm } from './WorkflowTest1AirflowForm'
import { WorkflowTest1WorkflowText } from './WorkflowTest1WorkflowText'

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
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e1-3', source: '1', target: '3', animated: true },
]

const transitions = ['Workflow', 'WorkflowText', 'AirflowText']

const WorkflowTest1Main = () => {
  // transition info
  const [selectedSrcTransition, setSelectedSrcTransition] = useState(
    transitions[0],
  )
  const [selectedDstTransition, setSelectedDstTransition] = useState(
    transitions[1],
  )
  const [isAlert, setIsAlert] = useState(false)

  // workflow info
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [nodeType, setNodeType] = useState<string>('bigquery')

  const addNode = useCallback(() => {
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        data: { label: `Node ${nds.length + 1}`, name: nodeType },
        position: { x: 100, y: 100 },
        type: 'custom',
      },
    ])
    console.log(nodes)
  }, [nodes])

  const transition = async () => {
    if (selectedSrcTransition == selectedDstTransition) {
      console.log('同じ')
      setIsAlert(true)
    } else {
      switch (selectedSrcTransition) {
        case 'Workflow':
          switch (selectedDstTransition) {
            case 'WorkflowText':
              console.log('Workflow to WorkflowText')
              const response = await fetch(
                `/api/v1/transition/workflowToAirflow`,
                {
                  method: 'POST',
                  cache: 'no-store', //SSR
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ stationName: 'hoge' }),
                },
              )
              const data = await response.json()
              console.log(data)
              break
            case 'AirflowText':
              console.log('Workflow to AirflowText')
              break
            default:
              setIsAlert(true)
          }
          break
        case 'WorkflowText':
          switch (selectedDstTransition) {
            case 'Workflow':
              console.log('WorkflowText to Workflow')
              break
            case 'AirflowText':
              console.log('WorkflowText to AirflowText')
              break
            default:
              setIsAlert(true)
          }
          break
        case 'AirflowText':
          switch (selectedDstTransition) {
            case 'Workflow':
              console.log('AirflowText to Workflow')
              break
            case 'WorkflowText':
              console.log('AirflowText to WorkflowText')
              break
            default:
              setIsAlert(true)
          }
          break
        default:
          break
      }
    }
  }

  return (
    <div className="flex-row h-full">
      <HeadlessModalAlert isAlert={isAlert} setIsAlert={setIsAlert} />
      <div className="h-full">
        <div className="flex h-full">
          <div className="h-full w-[300px] border-4">
            <WorkflowTest1Control
              selectedSrcTransition={selectedSrcTransition}
              setSelectedSrcTransition={setSelectedSrcTransition}
              selectedDstTransition={selectedDstTransition}
              setSelectedDstTransition={setSelectedDstTransition}
              transitions={transitions}
              transition={transition}
              addNode={addNode}
              nodeType={nodeType}
              setNodeType={setNodeType}
            />
          </div>
          <div className="border-1 w-[300px] grow">
            {selectedSrcTransition == 'Workflow' ? (
              <WorkflowTest1Workflow
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
                edges={edges}
              />
            ) : (
              <>
                {selectedSrcTransition == 'WorkflowText' ? (
                  <WorkflowTest1WorkflowText nodes={nodes} edges={edges} />
                ) : (
                  <WorkflowTest1AirflowForm />
                )}
              </>
            )}
          </div>
          <div className="border-1 w-[300px] grow">
            {selectedDstTransition == 'Workflow' ? (
              <WorkflowTest1Workflow
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
                edges={edges}
              />
            ) : (
              <>
                {selectedDstTransition == 'WorkflowText' ? (
                  <WorkflowTest1WorkflowText nodes={nodes} edges={edges} />
                ) : (
                  <WorkflowTest1AirflowForm />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowTest1Main
