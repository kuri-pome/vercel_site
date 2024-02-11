import React from 'react'
import { EvStationCardType } from '@/features/ev/constants/EvStationType';

export const EvCard = ({ evInfo }: { evInfo: EvStationCardType }) => {

  const stationStatusMap = {
    'AVAILABLE': {bgColor: "bg-blue-300", status: "利用可能"},
    'CHARGING': {bgColor: "bg-red-300", status: "充電中"},
    'FAULTED': {bgColor: "bg-gray-300", status: "故障"}
  };
  return (

    <li key={evInfo.stationId} className={`flex justify-between p-4 ${stationStatusMap[evInfo.stationStatus].bgColor} border-l-4 shadow rounded-none`}>
      <span>{evInfo.name}</span>
      <div>
        {stationStatusMap[evInfo.stationStatus].status}
      </div>
    </li>
  )
};