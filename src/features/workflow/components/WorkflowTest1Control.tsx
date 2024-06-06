'use client'
import React, { useState } from 'react'
import { Button } from '@headlessui/react'
import { HeadlessSelect } from '@/features/common/components/HeadlessSelect'
import {
  ReactflowSettingProps,
  WorkflowTest1ReactflowSetting,
} from './WorkflowTest1ReactflowSetting'

interface TransitionProps extends ReactflowSettingProps {
  selectedSrcTransition: string
  setSelectedSrcTransition: React.Dispatch<React.SetStateAction<string>>
  selectedDstTransition: string
  setSelectedDstTransition: React.Dispatch<React.SetStateAction<string>>
  transitions: Array<string>
  transition: React.MouseEventHandler<HTMLButtonElement>
}

export const WorkflowTest1Control: React.FC<TransitionProps> = (props) => {
  return (
    <div className="w-full">
      <p className="font-bold">・変換元</p>
      <HeadlessSelect
        selected={props.selectedSrcTransition}
        setSelected={props.setSelectedSrcTransition}
        choices={props.transitions}
      />
      <p className="font-bold">・変換先</p>
      <HeadlessSelect
        selected={props.selectedDstTransition}
        setSelected={props.setSelectedDstTransition}
        choices={props.transitions}
      />
      <Button
        className="w-full inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-blue-500/50 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={props.transition}
      >
        変換
      </Button>
      <div className="border-3"></div>
      {props.selectedSrcTransition == 'Workflow' ? (
        <WorkflowTest1ReactflowSetting
          addNode={props.addNode}
          nodeType={props.nodeType}
          setNodeType={props.setNodeType}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
