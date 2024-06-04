import React from 'react'
import WorkflowTest1Workflow from './WorkflowTest1Workflow'
import { WorkflowTest1Control } from './WorkflowTest1Control'

const WorkflowTest1Main = () => {
  return (
    <div className="flex-row h-full">
      <div className="text-center">
        <h1>react flow</h1>
      </div>
      <div className="h-full grow">
        <div className="flex h-full">
          <div className="h-full w-[300px] border-4">
            <WorkflowTest1Control />
          </div>
          <WorkflowTest1Workflow />
        </div>
      </div>
    </div>
  )
}

export default WorkflowTest1Main
