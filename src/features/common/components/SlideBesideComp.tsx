'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGetElementProperty } from '../hooks/GetElementProperty'

interface SlideBesideCompProps {
  leftComp: React.ReactNode
  rightComp: React.ReactNode
  ratio: number
}

const SlideBesideComp: React.FC<SlideBesideCompProps> = (props) => {
  // 領域サイズ変更用のref
  const [splitRatio, setSplitRatio] = useState(props.ratio)
  const [isAvailableSplit, setIsAvailableSplit] = useState(false)
  const [pageWidth, setPageWidth] = useState(0)
  const pageRef = useRef(null)
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(pageRef)
  useEffect(() => {
    setPageWidth(getElementProperty('width'))
  }, [])
  var style = {
    split_left: {
      width: `${splitRatio * 100}%`,
      height: '100%',
    },
    split_right: {
      width: `${(1 - splitRatio) * 100}%`,
      height: '100%',
    },
    mover: {
      width: '5px',
      height: '100%',
      cursor: 'col-resize',
    },
  }
  const handleSplitMouseDown = (e: React.MouseEvent) => {
    setIsAvailableSplit(true)
  }
  const handleSplitMouseUp = (e: React.MouseEvent) => {
    setIsAvailableSplit(false)
  }
  const handleSplitMouseMove = (e: React.MouseEvent) => {
    if (!isAvailableSplit) return
    if (!e.currentTarget.parentElement) return
    const rectParent = e.currentTarget.parentElement.getBoundingClientRect()
    // マウスの座標-親要素の左端の座標/親要素の幅
    // = 真ん中のwidgetの座標/親要素の幅
    const ratio = (e.clientX - rectParent.left) / rectParent.width
    setSplitRatio(ratio)
  }

  return (
    <div
      className="h-full flex"
      onMouseUp={handleSplitMouseUp}
      onMouseMove={handleSplitMouseMove}
    >
      <div style={style.split_left}>
        <props.leftComp />
        {/* {props.leftComp} */}
      </div>
      <div style={style.mover} onMouseDown={handleSplitMouseDown}></div>
      <div style={style.split_right} ref={pageRef}>
        <props.rightComp />
        {/* {props.rightComp} */}
      </div>
    </div>
  )
}

export default SlideBesideComp
