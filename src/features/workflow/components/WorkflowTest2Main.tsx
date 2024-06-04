'use client'
import React from 'react'
import SlideBesideComp from '@/features/common/components/SlideBesideComp'
import SlideVerticalComp from '@/features/common/components/SlideVerticalComp'

const top = <div className="h-full bg-gray-100">top</div>

const bottom = <div className="h-full max-w-max">bottom</div>

const left = () => {
  return <div className="h-full bg-gray-100">left</div>
}

const right = () => {
  return (
    <div className="h-full max-h-max">
      right
      <SlideVerticalComp topComp={top} bottomComp={bottom} ratio={0.3} />
    </div>
  )
}

const WorkflowTest2Main = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none p-3 underline border-y-2 text-center">
        random_check
      </div>
      <div className="grow h-full">
        <SlideBesideComp leftComp={left} rightComp={right} ratio={0.3} />
      </div>
    </div>
  )
}

export default WorkflowTest2Main
