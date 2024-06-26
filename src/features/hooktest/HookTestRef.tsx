'use client'
import React, { useRef, useState } from 'react'

export const HookTestRef = () => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const handleClick = () => {
    if (inputEl == null) return
    if (inputEl.current == null) return
    setText(inputEl.current.value)
  }
  console.log('レンダリング！！')
  return (
    <>
      <div>HookTestRef</div>
      <input className="border-2" ref={inputEl} type="text" />
      <button onClick={handleClick}>set text</button>
      <p>テキスト : {text}</p>
    </>
  )
}
