"use client";
import { useEffect, useRef, useState } from "react";
import {  } from 'react';
import React from 'react'
import WorkflowTest2Setting from './WorkflowTest2Setting'
import WorkflowPage from './WorkflowPage'
import { useGetElementProperty } from '../hooks/GetElementProperty'

const WorkflowTest2Main = () => {
    // 顧客データ
    const [customerData, setCustomerData] = useState([])
    // settingとチラシ領域の分割比率
    const [splitRatio, setSplitRatio] = useState(0.3);
    const [isAvailableSplit, setIsAvailableSplit] = useState(false);
    // チラシ領域サイズ変更用のref
    const [flyerPageWidth, setFlyerPageWidth] = useState(0);
    const [flyerPageHeight, setFlyerPageHeight] = useState(0);
    const flyerPageRef = useRef(null);
    const { getElementProperty } = useGetElementProperty<HTMLDivElement>(flyerPageRef);
    useEffect(() => {
        setFlyerPageWidth(getElementProperty("width"));
        setFlyerPageHeight(getElementProperty("height"));
    }, []);
    var style = {
        split_left: {
            width: `${splitRatio * 100}%`,
            height: "100%",
        },
        split_right: {
            width: `${(1 - splitRatio) * 100}%`,
            height: "100%",
        },
        mover: {
            width: "5px",
            height: "100%",
            cursor: "col-resize",
        }
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
        <div className='h-full flex flex-col'>
            <div className='flex-none p-3 underline border-y-2 text-center'>random_check</div>
            <div className="grow">
                <div className='h-full flex'
                    onMouseUp={handleSplitMouseUp}
                    onMouseMove={handleSplitMouseMove}
                >
                    <div style={style.split_left}>
                        <WorkflowTest2Setting
                            setCustomerData={setCustomerData}
                            flyerPageWidth={flyerPageWidth}
                            setFlyerPageWidth={setFlyerPageWidth}
                            flyerPageHeight={flyerPageHeight}
                            setFlyerPageHeight={setFlyerPageHeight}
                        />
                    </div>
                    <div
                        style={style.mover}
                        onMouseDown={handleSplitMouseDown}
                    ></div>
                    <div style={style.split_right} ref={flyerPageRef}>
                        <WorkflowPage
                            customerData={customerData}
                            flyerPageWidth={flyerPageWidth}
                            flyerPageHeight={flyerPageHeight}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkflowTest2Main