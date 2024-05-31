'use client'
import React from 'react'
import WorkflowTest2Setting from './WorkflowTest2Setting'
import WorkflowPage from './WorkflowPage'
import SlideBesideComp from '@/features/common/components/SlideBesideComp'

const WorkflowTest2Main = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none p-3 underline border-y-2 text-center">
        random_check
      </div>
      <div className="grow h-full">
        <SlideBesideComp
          leftComp={WorkflowTest2Setting}
          rightComp={WorkflowPage}
          ratio={0.3}
        />
      </div>
    </div>
  )
}

export default WorkflowTest2Main
