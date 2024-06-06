'use client'
import React from 'react'
import { Tab } from '@headlessui/react'

export type HeadlessTabsProps = {
  tabs: Array<{ name: string; value: () => React.ReactNode }>
}

export const HeadlessTabs: React.FC<HeadlessTabsProps> = (props) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {props.tabs.map((tab, idx) => (
            <Tab
              key={tab.name}
              className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 bg-white text-blue-700 shadow"
            >
              <>{tab.name}</>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {props.tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              <>{tab.value()}</>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
