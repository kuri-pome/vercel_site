"use client"
// コンポーネントのツリーに対してグローバルなデータとして使える。
import React, {useContext} from 'react'
import { UserContext } from './HookTestContext'

export const HookTestContext2 = () => {
  const user = useContext(UserContext)
  return (
    <div>{`名前は${user.name}です。年齢は${user.age}歳です。`}</div>
  )
}
