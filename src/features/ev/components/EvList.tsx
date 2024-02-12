"use client";

import React from 'react'
import Link from "next/link"
import { NextUIProvider, Accordion, AccordionItem } from "@nextui-org/react";
import { EvStationCardType } from '@/features/ev/constants/EvStationType';
import { EvCard } from './EvCard';

const EvList = ({ stationData }: { stationData: EvStationCardType[] }) => {
  // const ariaLabel = `Accordion ${evInfo.stationId}`

  const stationStatusMap = {
    'AVAILABLE': { bgColor: "bg-blue-200", status: "利用可能" },
    'CHARGING': { bgColor: "bg-red-200", status: "充電中" },
    'FAULTED': { bgColor: "bg-gray-200", status: "故障" }
  };
  return (
    <div className="max-h-96 overflow-y-auto">
      <NextUIProvider>
        <Accordion variant="light">
          {stationData.map((datum) => (
            < AccordionItem key={datum.stationId} title={datum.name} className={`${stationStatusMap[datum.stationStatus].bgColor}`}>
              <p>状況：{stationStatusMap[datum.stationStatus].status}</p>
              <p>kw：{datum.sockets[0].power}</p>
              <p>住所：{datum.addressAddress}</p>
              <div className="py-1 hover:ring-4 text-blue">
                <Link href={datum.googleMap} rel="noopener noreferrer" target="_blank">
                  GoogleMapを開く
                </Link>
              </div>
            </ AccordionItem>
          ))}
        </Accordion>
      </NextUIProvider >
    </div>
  )
}

export default EvList