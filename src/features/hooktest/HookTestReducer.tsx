"use client"
import React, {useReducer} from 'react'

const initialState = {
  firstCounter: 0,
  secondCounter: 100
}

const reducerFunc = (countState, action) => {
  switch(action.type){
    case "increment1":
      return {...countState, firstCounter: countState.firstCounter + action.value}
    case "decrement1":
      return {...countState, firstCounter: countState.firstCounter - action.value}
    case "reset1":
      return {...countState, firstCounter: initialState.firstCounter}
    case "increment2":
      return {...countState, secondCounter: countState.secondCounter + action.value}
    case "decrement2":
      return {...countState, secondCounter: countState.secondCounter - action.value}
    case "reset2":
      return {...countState, secondCounter: initialState.secondCounter}
    default:
      return countState
  }
}

export const HookTestReducer = () => {
  const [count, dispatch] = useReducer(reducerFunc, initialState)
  return (
    <>
      <div>HookTestReducer</div>
      <p>{`counter1: ${count.firstCounter}`}</p>
      <button onClick={()=>dispatch({type: "increment1", value: 1})}>increment1</button>
      <button onClick={()=>dispatch({type: "decrement1", value: 1})}>decrement1</button>
      <button onClick={()=>dispatch({type: "reset1"})}>reset</button>
      <p>{`counter2: ${count.secondCounter}`}</p>
      <button onClick={()=>dispatch({type: "increment2", value: 100})}>increment2</button>
      <button onClick={()=>dispatch({type: "decrement2", value: 100})}>decrement2</button>
      <button onClick={()=>dispatch({type: "reset2"})}>reset</button>
    </>
  )
}
