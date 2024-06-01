import React from 'react'
import WorkflowTest1Workflow from './WorkflowTest1Workflow'

const WorkflowTest1Main = () => {
  return (
    <div className="flex-row h-full">
      <div className="text-center">
        <h1>react flow</h1>
      </div>
      <div className="h-full grow">
        <WorkflowTest1Workflow />
      </div>
    </div>
  )
}

export default WorkflowTest1Main
