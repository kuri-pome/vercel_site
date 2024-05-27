"use client"
// コンポーネントのツリーに対してグローバルなデータとして使える。
import React from 'react'
import { HookTestContext2 } from './HookTestContext2'

export const HookTestContext1 = () => {
  return (
    <div>
      <HookTestContext2/>
    </div>
  )
}
