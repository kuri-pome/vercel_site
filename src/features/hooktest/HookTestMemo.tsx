"use client"
import React, {useMemo, useState} from 'react'

export const HookTestMemo = () => {
  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)

  const result01 = () => setCount01(count01 + 1)
  const result02 = () => setCount02(count02 + 1)

  // const square = () => {
  //   let i = 0
  //   while (i < 2) i++
  //   return count02 * count02
  // }

  const square = useMemo(() => {
    let i = 0
    return count02 * count02
  }, [count02])

  return (
    <>
      <div>HookTestMemo</div>
      <div>result01: {count01}</div>
      <div>result02: {count02}</div>
      {/* <div>square: {square()}</div> */}
      <div>square: {square}</div>
      <button onClick={result01}>increment</button>
      <button onClick={result02}>increment</button>
    </>
  )
}
