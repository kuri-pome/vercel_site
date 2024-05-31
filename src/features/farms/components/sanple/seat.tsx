import React, { useCallback } from 'react'
import { Marker } from 'react-leaflet'

import L, { LeafletMouseEvent } from 'leaflet'

import { deleteReservationSelected } from '../../../../../api/reservation'
import { createImageSizeStyle, createSeatStyle } from '../../../../../utils/logic/seat/seatDynamicStyleController'
import { MethodTypeForUseArray } from '../../../parts/useArray'
import { ResponsiveMarker } from './responsiveMarker'

import styles from './seat.module.css'

const styleToText = function (style: object) {
  let styleText: string = JSON.stringify(style).slice(1, -1).replace(/"/g, '')
  styleText = styleText.replace(/,/g, ';')
  styleText = '"' + styleText + '"'
  return styleText
}
// 単一の座席ボタンを生成するコンポーネント
export const Seat = ({
  className,
  seat,
  searchedReservations,
  originX,
  originY,
  reservation,
  seatSize,
  baseName,
  floorName,
  updateLayoutAndHistoryList,
  seatsToReserve,
  changeSeatsToReserve,
  isMultiSeatReservationMode,
  setShowReservationCalendar,
  setSelectedSeatId,
}: {
  className: string
  seat: Seat
  searchedReservations: Reservation[]
  originX: number
  originY: number
  reservation: Reservation | undefined
  seatSize: number
  baseName: string
  floorName: string
  updateLayoutAndHistoryList: () => void
  seatsToReserve: ReducedSeat[]
  changeSeatsToReserve: (
    changeType: MethodTypeForUseArray,
    seat?: ReducedSeat,
    isEqualFunction?: (seatA: ReducedSeat, seatB: ReducedSeat) => boolean
  ) => void
  isMultiSeatReservationMode: boolean
  setShowReservationCalendar: SetState<boolean>
  setSelectedSeatId: SetState<number | null>
}) => {
  // 座席ボタンクリック時の処理
  const onSeatButtonClicked = useCallback(
    (event: LeafletMouseEvent) => {
      if (!isMultiSeatReservationMode) {
        // 単一座席予約モードの場合
        setSelectedSeatId(event.target.options.id)
        setShowReservationCalendar(true)
        return
      }

      // 以降、複数座席予約モードの場合
      if (seatsToReserve.some((seatInQueue) => seatInQueue.seat_id === seat.seat_id)) {
        // クリックした座席が追加済みならfilterにより削除
        changeSeatsToReserve('FILTER', seat, (seatA, seatB) => seatA.seat_id === seatB.seat_id)
      }
      // クリックした座席が予約済みでもpush可能
      else {
        changeSeatsToReserve('PUSH', seat)
      }
    },
    [isMultiSeatReservationMode, seatsToReserve, changeSeatsToReserve, reservation]
  )

  // 座席ボタンUIに必要なスタイルを生成
  const seatStyle: object = createSeatStyle(seatSize, seat.palette_id, seat.seat_id, seatsToReserve)

  // スタイルオブジェクトを文字列に展開
  const seatStyleText: string = styleToText(seatStyle)
  // 使用不可の座席Iconを定義
  const seatIconUnavailable = L.divIcon({
    html: `<button class=${styles.seatButton} style=${seatStyleText} name="unavailable">${seat.label}</button>`,
    className: `${className + '-seatIconUnavailable'}`,
    iconSize: [seatSize, seatSize],
  })
  // 未予約の座席Iconを定義
  const seatIconNotReserved = L.divIcon({
    html: `<button class=${styles.seatButton} style=${seatStyleText} name="not_reserved" data-testid="seat-${seat.label}">${seat.label}</button>`,
    className: `${className + '-seatIconNotReserved'}`,
    iconSize: [seatSize, seatSize],
  })

  let seatDescription: string = seat.attributes ? ${seat.label}<br/>${seat.attributes} : ${seat.label}
  seatDescription = seat.comment ? ${seatDescription}<br/>${seat.comment} : ${seatDescription}

  // 使用不可の席の場合
  if (!seat.is_available) {
    return <ResponsiveMarker position={[originY, originX]} icon={seatIconUnavailable} seat={seat} />
  }
  // 未予約の席の場合
  if (typeof reservation === 'undefined') {
    return (
      <ResponsiveMarker
        position={[originY, originX]}
        icon={seatIconNotReserved}
        onClicked={onSeatButtonClicked}
        seat={seat}
      />
    )
  }

  // 予約済み席のスタイルを取得
  const imageSizeStyle = createImageSizeStyle(
    seatSize,
    searchedReservations.some((searched) => searched.seat.seat_id === reservation.seat.seat_id),
    isMultiSeatReservationMode
  )
  // スタイルオブジェクトを文字列に展開
  const imageSizeStyleText: string = styleToText(imageSizeStyle)
  // 予約済みの座席アイコンを定義
  const seatIconReserved = L.divIcon({
    html: `<button class=${styles.seatButton} style=${seatStyleText} name="reserved" data-testid="seat-${seat.label}">
          <style> @keyframes highlight {
            0%, 100% {
              transform: scale(1.0,1.0);
            }
            50% {
              transform: scale(1.3,1.3);
            }
          </style>
          <img src=${
            reservation ? reservation.reserved_for.icon_uri : ${process.env.PUBLIC_URL}/user_no_image.svg
          } alt="reserved_user" class=${styles.img} style=${imageSizeStyleText} data-playwright-user-id=${
      reservation.reserved_for.user_id
    } />
          </button>`,
    className: `${className + '-seatIconReserved'}`,
    iconSize: [seatSize, seatSize],
  })

  // キャンセルボタンのアイコンを定義
  const cancelIcon = L.divIcon({
    html: `<button class=${styles.cancelButton} />`,
    className: `${className + '-cancelIcon'}`,
    iconSize: [seatSize * 0.5, seatSize * 0.5],
  })

  // 予約済みの席の場合
  return (
    <React.Fragment>
      {/*座席ボタン*/}
      <ResponsiveMarker
        position={[originY, originX]}
        icon={seatIconReserved}
        onClicked={onSeatButtonClicked}
        seat={seat}
        reserved_for={reservation.reserved_for}
      />
      {/*予約キャンセルボタン*/}
      <Marker
        position={[originY, originX]}
        icon={cancelIcon}
        zIndexOffset={250}
        eventHandlers={{
          click: () => {
            seat.seat_id && deleteReservationSelected(reservation, baseName, floorName, updateLayoutAndHistoryList)
          },
        }}
      ></Marker>
    </React.Fragment>
  )
}