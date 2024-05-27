"use client"
// コンポーネントのツリーに対してグローバルなデータとして使える。
import React, {createContext, useState} from 'react'
import { HookTestContext1 } from './HookTestContext1'

export const UserContext = createContext({name: "", age: 0})

export const HookTestContext = () => {
  const [user, setUser] = useState({
    name: 'セイラ',
    age: 17
  })
  return (
    <>
      <div>HookTestContext</div>
      <UserContext.Provider value={user}>
        <HookTestContext1/>
      </UserContext.Provider>
    </>
  )
}
