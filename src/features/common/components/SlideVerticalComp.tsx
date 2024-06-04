'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useGetElementProperty } from '../hooks/GetElementProperty'

interface SlideVerticalCompProps {
  topComp: React.ReactNode
  bottomComp: React.ReactNode
  ratio: number
}

const SlideVerticalComp: React.FC<SlideVerticalCompProps> = (props) => {
  // 上下領域サイズ変更用のref
  const [splitRatio, setSplitRatio] = useState(props.ratio)
  const [isAvailableSplit, setIsAvailableSplit] = useState(false)
  const [pageHeight, setPageHeight] = useState(0)
  const pageRef = useRef(null)
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(pageRef)
  useEffect(() => {
    setPageHeight(getElementProperty('height'))
  }, [])
  var style = {
    split_top: {
      width: '100%',
      height: `${splitRatio * 100}%`,
    },
    split_bottom: {
      width: '100%',
      height: `${(1 - splitRatio) * 100}%`,
    },
    mover: {
      width: '100%',
      height: '5px',
      cursor: 'row-resize',
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
    // (マウスの座標-親要素の上端の座標)/親要素の幅
    // = 真ん中のwidgetの座標/親要素の幅
    const ratio = (e.clientY - rectParent.top) / rectParent.height
    setSplitRatio(ratio)
  }

  return (
    <div
      className="h-full flex-row"
      onMouseUp={handleSplitMouseUp}
      onMouseMove={handleSplitMouseMove}
    >
      <div style={style.split_top}>
        {/* <props.topComp /> */}
        {props.topComp}
      </div>
      <div style={style.mover} onMouseDown={handleSplitMouseDown}></div>
      <div style={style.split_bottom} ref={pageRef}>
        {/* <props.bottomComp /> */}
        {props.bottomComp}
      </div>
    </div>
  )
}

export default SlideVerticalComp
