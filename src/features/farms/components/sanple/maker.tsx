import { useEffect, useRef } from 'react'
import { Marker } from 'react-leaflet'

import L, { LeafletMouseEvent } from 'leaflet'

import { generateSeatPopup } from '../../../../../utils/logic/popupContentGenerator'

export const ResponsiveMarker = ({
  position,
  icon,
  seat,
  reserved_for,
  onClicked,
}: {
  position: [number, number]
  icon: L.DivIcon
  seat: Seat
  reserved_for?: User
  onClicked?: (event: LeafletMouseEvent) => void
}) => {
  const markerRef = useRef<L.Marker>(null)

  useEffect(() => {
    const marker = markerRef.current
    const { content, options } = generateSeatPopup(seat, reserved_for)
    if (marker) {
      marker.bindPopup(content, options)
      if (onClicked) {
        marker.on('click', (event) => onClicked(event))
      }
      marker.on('mouseover', (event) => event.target.openPopup())
      marker.on('mouseout', (event) => event.target.closePopup())
    }

    // クリーンアップ処理
    return () => {
      if (marker) {
        marker.unbindPopup()
        if (onClicked) {
          marker.off('click')
        }
        marker.off('mouseover')
        marker.off('mouseout')
      }
    }
  }, [icon, seat, onClicked])

  return <Marker ref={markerRef} position={position} icon={icon} id={seat.seat_id ?? -1}></Marker>
}