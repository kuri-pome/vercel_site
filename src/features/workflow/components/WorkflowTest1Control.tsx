'use client'
import React, { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition, Button } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const mode = [{ name: 'UiToText' }, { name: 'TextToUi' }]

type ControlProps = {
  addNode: React.MouseEventHandler<HTMLButtonElement>
}

type SelectProps = {
  selected: { name: string }
  setSelected: React.Dispatch<React.SetStateAction<{ name: string }>>
}

const SelectMode: React.FC<SelectProps> = (props) => {
  return (
    <div className="">
      <Listbox value={props.selected} onChange={props.setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{props.selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {mode.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
export const WorkflowTest1Control: React.FC<ControlProps> = (props) => {
  // mode info
  const [selected, setSelected] = useState(mode[0])

  useEffect(() => {
    console.log(selected.name)
  }, [selected])
  return (
    <div className="w-full">
      <p className="font-bold">・実行モード</p>
      <SelectMode selected={selected} setSelected={setSelected} />
      <Button
        className="w-full inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-blue-500/50 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={props.addNode}
      >
        AddNode
      </Button>
    </div>
  )
}
