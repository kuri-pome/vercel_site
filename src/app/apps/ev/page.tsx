import React from 'react'
import { fetchStationData} from '@/api/EvInfos'
import { EvInfos } from '@/features/ev/constants/EvStationInfos';
import { EvStationCardType, StationSocketType } from '@/features/ev/constants/EvStationType';
import EvList from '@/features/ev/components/EvList';

// Route Segment Config
// export const fetchCache = 'default-no-store';

const createStationData = async () => {
  const StationData: Array<EvStationCardType> = [];
  var sockets: Array<StationSocketType>
  for (const evInfo of EvInfos) {
      const data = await fetchStationData(evInfo.stationId);
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
        stationId: evInfo.stationId,
        caption: data.caption,
        addressAddress: data.addressAddress1,
        stationStatus: data.stationStatusId,
        sockets: sockets
      }
      StationData.push(StationDatum)
  }
  return StationData;
}


const page = async() => {
  const StationData: Array<EvStationCardType> = await createStationData();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className='text-4xl font-bold text-gray-700 -mt-32'>EV充電スポット状況</h1>
      <div className='w-full max-w-xl mt-5'>
        <div className='bg-white px-8 py-6 shadow-md rounded-lg'>
          <EvList stationData={StationData}/>
        </div>
      </div>
    </div>
  )
}

export default page