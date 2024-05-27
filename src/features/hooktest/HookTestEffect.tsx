"use client"
import React, { useState, useEffect } from 'react'

export const HookTestEffect = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    /* 第1引数には実行させたい副作用関数を記述*/
    console.log('副作用関数が実行されました！')
  },[count])
  return (
    <>
      <div>HookTestEffect</div>
      <p>{`${count}回クリックされました。`}</p>
      <button onClick={() => setCount((count) => count+1)}>加算</button>
      <button onClick={() => setCount((count) => count-1)}>減算</button>
    </>
  )
}
