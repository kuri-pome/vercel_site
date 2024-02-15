import React from 'react'
import { headers } from "next/headers";
import { EvInfos } from '@/features/ev/constants/EvStationInfos';
import { EvStationType, EvStationCardType, StationSocketType } from '@/features/ev/constants/EvStationType';
import EvList from '@/features/ev/components/EvList';

// Route Segment Config
// export const fetchCache = 'default-no-store';

const createApiBase = () => {
  const headersData = headers()
  const host = headersData.get('host')
  var apiBase = "http:localhost"
  if (host) {
    const protocol = headersData.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
    apiBase = `${protocol}://${host}`
  }
  return apiBase;
}

const fetchStationId = async (stationName: string) => {
  const apiBase = createApiBase()
  const response = await fetch(`${apiBase}/api/ev/findPlacesByQuery`, {
    method: 'POST',
    cache: "no-store", //SSR
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ stationName: stationName }),
  })
  const data = await response.json();
  const stationId = data[0].stationId
  return stationId;
}

const fetchStationData = async (stationId: number) => {
  const apiBase = createApiBase()
  const response = await fetch(`${apiBase}/api/ev/fetchStationData?stationId=${stationId}`, {
    method: 'GET',
    cache: "no-store", //SSR
  })
  const data = await response.json();
  return data;
}

const createStationData = async () => {
  const StationData: Array<EvStationCardType> = [];
  var sockets: Array<StationSocketType>
  // const newEvInfos: Array<EvStationType> = []
  for (const evInfo of EvInfos) {
    // const stationId = await fetchStationId(evInfo.stationName);
    const stationId = evInfo.stationId
    const data = await fetchStationData(stationId);
    sockets = []

    for (const stationSocket of data.stationSockets) {
      sockets.push({
        socketId: stationSocket.id,
        socketStatusId: stationSocket.socketStatusId,
        power: stationSocket.maximumPower,

      })
    }
    const StationDatum: EvStationCardType = {
      name: evInfo.name,
      googleMap: evInfo.googleMap,
      stationName: evInfo.stationName,
      stationId: stationId,
      caption: data.caption,
      addressAddress: data.addressAddress1,
      stationStatus: data.stationStatusId,
      sockets: sockets
    }
    StationData.push(StationDatum)
    // const newEvInfo: EvStationType = {
    //   name: evInfo.name,
    //   googleMap: evInfo.googleMap,
    //   stationName: evInfo.stationName,
    //   stationId: stationId,
    // }
    // newEvInfos.push(newEvInfo)
  }
  // console.log(newEvInfos)
  return StationData;
}


const page = async () => {
  const StationData: Array<EvStationCardType> = await createStationData();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className='text-4xl font-bold text-gray-700 -mt-32'>EV充電スポット状況</h1>
      <div className='w-full max-w-xl mt-5'>
        <div className='bg-white px-8 py-6 shadow-md rounded-lg'>
          <EvList stationData={StationData} />
        </div>
      </div>
    </div>
  )
}

export default page