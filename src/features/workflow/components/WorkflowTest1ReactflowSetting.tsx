'use client'
import React, { useState, useEffect } from 'react'
import { Button, Input } from '@headlessui/react'
import clsx from 'clsx'

export interface ReactflowSettingProps {
  addNode: React.MouseEventHandler<HTMLButtonElement>
  nodeType: string
  setNodeType: React.Dispatch<React.SetStateAction<string>>
}

export const WorkflowTest1ReactflowSetting: React.FC<ReactflowSettingProps> = (
  props,
) => {
  return (
    <div className="border-1 m-1 mt-4">
      <p className="font-bold">Workflow Setting</p>
      <Button
        className="w-full inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-blue-500/50 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={props.addNode}
      >
        AddNode
      </Button>
      <p className="font-bold">・node type</p>
      <Input
        // className={clsx(
        //   'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
        //   'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
        // )}
        onChange={(e) => {
          props.setNodeType(e.target.value)
        }}
        value={props.nodeType}
      />
    </div>
  )
}
