import { useState, useCallback, useEffect, useRef, useMemo, useContext } from 'react'
import { ImageOverlay, MapContainer, Polygon, LayerGroup } from 'react-leaflet'

import L from 'leaflet'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { Base, FloorDetail } from '../../../../api/office'
import { getRoomList } from '../../../../api/room'
import { LayoutHook } from '../../../../hooks/useLayout'
import { SearchHook } from '../../../../hooks/useSearch'
import { MyselfContext } from '../../../../router'
import { calcImageBounds } from '../../../../utils/logic/calcImageBounds'
import { getLeafletCrs } from '../../../../utils/logic/getLeafletCrs'
import { maxSeatSize, defaultSeatSize } from '../../../../utils/logic/layout/layoutUtils'
import { filterReservationByOrg } from '../../../../utils/logic/reservation/reservationUtils'
import { setGlobalCss } from '../../../../utils/logic/setGlobalCss'
import { switchDisplayLayer } from '../../../../utils/logic/switchDisplayLayer'
import { MethodTypeForUseArray } from '../../parts/useArray'
import { ConstantsContext } from '../../standardUser'
import { Room } from './room/room'
import { Seat } from './seat/seat'

const StyledMapContainer = styled(MapContainer)`
  height: calc(100vh - 100px);
  width: 100%;
  @media screen and (max-width: 1280px) {
    height: calc(100vh - 100px * 0.7);
    margin-top: calc(-100px * (1 - 0.7));
  }
`

// 正規化されたフロア画像の長辺の長さ
const normalizeUnit = 100

// 表示領域を保存するlocalStorageのキー
const viewStorageKey = 'viewSetting'

interface ViewSetting {
  layoutId: number
  zoom: number
  center: [number, number]
}

export const FloorMap = ({
  layout,
  search,
  focusAreaId,
  setFocusAreaId,
  currentLayoutReservations,
  updateLayoutAndHistoryList,
  seatsToReserve,
  changeSeatsToReserve,
  isMultiSeatReservationMode,
  setShowReservationCalendar,
  setSelectedSeatId,
}: {
  layout: LayoutHook
  search: SearchHook
  focusAreaId: number
  setFocusAreaId: SetState<number>
  currentLayoutReservations: Reservation[]
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
  const constantsContext = useContext(ConstantsContext)
  const myself = useContext(MyselfContext)
  const areaLayer = useRef<L.LayerGroup | null>(null)
  const seatLayer = useRef<L.LayerGroup | null>(null)
  const roomLayer = useRef<L.LayerGroup | null>(null)
  const layerRefs = useRef<{ [name: string]: React.RefObject<L.LayerGroup> | undefined }>({
    area: areaLayer,
    seat: seatLayer,
  })
  const mapRef = useRef<L.Map>()
  const [mapInitState, setMapInitState] = useState(false)
  const [roomList, setRoomList] = useState<Room[]>([])

  // 以下は親コンポーネントで非undefinedが確認されていることを前提とする
  const currentLayout = layout[0].currentLayout as LayoutById
  const currentFloor = layout[0].currentFloor as FloorDetail
  const currentBase = layout[0].currentBase as Base

  const { bounds, boundX, boundY } = calcImageBounds(currentLayout.image)
  const normalizeArea = (coord: [number, number]) => {
    return new L.LatLng(coord[1] * boundY, coord[0] * boundX)
  }

  const [
    { searchMethod, searchTargetUserIds, searchTargetOrganization, searchTargetRooms },
    { setSearchTargetRooms, setSearchSuggestRooms },
  ] = search

  // 検索ボックスに入力されたユーザーや組織の予約情報
  const searchedReservations = useMemo<Reservation[]>(() => {
    let reservations: Reservation[] = []
    if (searchMethod === 'userId') {
      reservations = currentLayoutReservations.filter((reservation) =>
        searchTargetUserIds.includes(reservation.reserved_for.user_id)
      )
    }
    if (searchMethod === 'organization') {
      let departmentCode: number = -1 // 未所属
      switch (searchTargetOrganization.type) {
        case 'team':
          // チーム検索
          reservations = reservations.concat(
            // チームの全員
            filterReservationByOrg(currentLayoutReservations, 'team', searchTargetOrganization.team_code, 'any'),
            // グループ長
            filterReservationByOrg(currentLayoutReservations, 'group', searchTargetOrganization.group_code, 'leader')
          )
          departmentCode =
            constantsContext.groups.find((group) => group.group_code === searchTargetOrganization.group_code)
              ?.department_code ?? departmentCode
          break
        case 'group':
          // グループ検索
          reservations = reservations.concat(
            // グループの全員
            filterReservationByOrg(currentLayoutReservations, 'group', searchTargetOrganization.group_code, 'any')
          )
          departmentCode = searchTargetOrganization.department_code
          break
      }
      if (departmentCode > 0) {
        // 部門長の予約情報
        reservations = reservations.concat(
          filterReservationByOrg(currentLayoutReservations, 'department', departmentCode, 'leader')
        )
      }
    }
    return reservations
  }, [searchMethod, searchTargetUserIds, searchTargetOrganization, currentLayoutReservations, constantsContext.groups])

  /**
   * 保存されている表示領域情報を取得する
   */
  const getSavedView = useCallback((): {
    index: number
    data: ViewSetting
  } | null => {
    const jsonData = localStorage.getItem(viewStorageKey)
    if (jsonData === null) {
      return null
    }
    const data: ViewSetting[] = JSON.parse(jsonData)
    const index = data.findIndex((item) => item.layoutId === currentLayout.layout_id)
    if (index === -1) {
      return null
    }
    return {
      index: index,
      data: data[index],
    }
  }, [currentLayout])

  /**
   * 表示領域情報を保存する
   */
  const saveView = useCallback(() => {
    const map = mapRef.current
    if (!map) {
      return
    }
    const zoom = map.getZoom()
    const center = map.getCenter()
    const viewDataJson = localStorage.getItem(viewStorageKey)
    const viewData: ViewSetting[] = viewDataJson === null ? [] : JSON.parse(viewDataJson)
    const savedView = getSavedView()
    if (savedView === null) {
      viewData.push({
        layoutId: currentLayout.layout_id,
        zoom: zoom,
        center: [center.lat, center.lng],
      })
    } else {
      viewData[savedView.index]['zoom'] = zoom
      viewData[savedView.index]['center'] = [center.lat, center.lng]
    }
    localStorage.setItem(viewStorageKey, JSON.stringify(viewData))
  }, [currentLayout])

  /**
   * レイヤーの表示・非表示を切り替える
   */
  const controlDisplayLayer = useCallback(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    if (areaLayer.current && seatLayer.current) {
      // 十分に縮小されたときの動作
      if (map.getZoom() < currentLayout.threshold_of_switch_to_area_display && currentLayout.areas.length > 0) {
        switchDisplayLayer('area', layerRefs.current, map)
      } else {
        switchDisplayLayer('seat', layerRefs.current, map)
      }
    }
  }, [currentLayout])

  /**
   * searchMethodが変更されたときにもcontrolDisplayLayerを実行する
   */
  useEffect(() => {
    controlDisplayLayer()
  }, [searchMethod])

  /**
   * ズームレベルに応じてアイコンのスタイルを更新する
   */
  const updateIconStyle = useCallback(
    (currentZoomLevel: number) => {
      const seatIconSize =
        currentLayout.is_zoomable && currentLayout.max_zoom_level
          ? maxSeatSize * 2 ** (currentZoomLevel - currentLayout.max_zoom_level)
          : defaultSeatSize

      // 座席アイコン・会議室アイコン
      setGlobalCss(
        `
    .seatMap-seatIconNotReserved, .seatMap-seatIconUnavailable, .seatMap-seatIconReserved, .roomMap-roomIcon {
      width: ${seatIconSize}px !important;
      height: ${seatIconSize}px !important;
      margin-left: -${seatIconSize * 0.5}px !important;
      margin-top: -${seatIconSize * 0.5}px !important;
    }
    .seatMap-seatIconNotReserved, .seatMap-seatIconUnavailable {
      overflow: hidden;
    }
    `,
        'seat-icon-style'
      )
      setGlobalCss(
        `
    [class^="seat_seatButton"], [class^="seat_img"], [class^="room_roomButton"] {
      width: 100% !important;
      height: 100% !important;
      font-size: ${seatIconSize * 0.3}px !important;
    }
    `,
        'seat-seatButton'
      )
      // 予約キャンセルアイコン
      const cancelIconStyleId = 'cancelIconStyle'
      const existingStyle = document.querySelector(`#${cancelIconStyleId}`)
      if (existingStyle) {
        existingStyle.remove()
      }
      // マップ表示
      setGlobalCss(
        `
      .seatMap-cancelIcon {
        width: ${seatIconSize * 0.5}px !important;
        height: ${seatIconSize * 0.5}px !important;
        top: ${-seatIconSize * 0.4}px !important;
        left: ${seatIconSize * 0.4}px !important;
        margin-left: -${seatIconSize * 0.2}px !important;
        margin-top: -${seatIconSize * 0.2}px !important;
      }
    `,
        'seatMap-cancelIcon'
      )
      // エリア表示
      // TODO: ズームレベルに応じて変更できるようにする
      setGlobalCss(
        `
      .seatArea-cancelIcon {
        width: ${defaultSeatSize * 0.5}px !important;
        height: ${defaultSeatSize * 0.5}px !important;
        top: ${-defaultSeatSize * 0.4}px !important;
        left: ${defaultSeatSize * 0.4}px !important;
        margin-left: -${defaultSeatSize * 0.2}px !important;
        margin-top: -${defaultSeatSize * 0.2}px !important;
      }
    `,
        'seatArea-cancelIcon'
      )
    },
    [currentLayout]
  )

  /**
   * 指定したエリアにフォーカスしてマップを表示させる
   */
  const showFocusArea = useCallback(
    (area_id: number): boolean => {
      let area = null
      if (currentLayout.areas.length > 0 && area_id > -1) {
        area = currentLayout.areas.find((area) => area.area_id === area_id)
      }

      if (area && mapRef.current) {
        const polygon = L.polygon(area.coordinates.cod.map(normalizeArea))
        mapRef.current.fitBounds(polygon.getBounds(), { animate: false })
        retu