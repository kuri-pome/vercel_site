import React from 'react'
import { EvStationCardType } from '@/features/ev/constants/EvStationType';
import { EvCard } from './EvCard';

const EvList = ({ stationData }: { stationData: EvStationCardType[] }) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      <ul className='space-y-3'>
        {stationData.map((datum) => (
          < EvCard key={datum.stationId} evInfo={datum} />
        ))}
      </ul>
    </div>
  )
}

export default EvList