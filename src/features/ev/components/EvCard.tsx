"use client";

import React from 'react'
import { NextUIProvider, Accordion, AccordionItem } from "@nextui-org/react";
import { EvStationCardType } from '@/features/ev/constants/EvStationType';

export const EvCard = ({ evInfo }: { evInfo: EvStationCardType }) => {


  return (
    <div>aaa</div>
    // <div className={`flex justify-between p-4 ${stationStatusMap[evInfo.stationStatus].bgColor} border-l-4 shadow rounded-none`}>

    // </div>
    // <li key={evInfo.stationId} >
    //   <span>{evInfo.name}</span>
    //   <div>
    //     {stationStatusMap[evInfo.stationStatus].status}
    //   </div>
    // </li>
  )
};