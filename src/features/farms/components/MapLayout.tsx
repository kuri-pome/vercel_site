"use client";
import { ImageOverlay, MapContainer, Marker, Popup, TileLayer, Polygon, SVGOverlay, CircleMarker } from "react-leaflet";
import L, { CRS, LatLng, LatLngBounds } from 'leaflet'
import Image from "next/image";
import "leaflet/dist/leaflet.css";


const img_path = "/img/communal_field.jpg"
const imageBounds = new LatLngBounds([0, 0], [800, 1000]);

const MapLayout = () => {
  return (
    <MapContainer
      crs={CRS.Simple}
      center={new LatLng(400, 500)}
      zoom={0}
      style={{ height: 800, width: 1000 }}
      // scrollWheelZoom={false}
      // style={{ height: "100%", width: "100%" }}
    >
      <ImageOverlay
        url={img_path}
        bounds={imageBounds}
      />
      <SVGOverlay
        bounds={new LatLngBounds([400, 400], [450, 450])}
        attributes={{ stroke: 'red' }}
      >
        <Image src="/img/vegetables/tomato.svg" alt="tomato" height={50} width={50} />
      </SVGOverlay>
      {/* <Polygon pathOptions={ color: 'purple' } positions={polygon} /> */}
      <CircleMarker center={[450, 450]} pathOptions={{ color: 'red' }} radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Marker
        position={[400, 300]}
        icon={L.icon({iconUrl: "/img/vegetables/tomato.svg", iconSize: [20, 20], iconAnchor: [0, 0]})}
        // eventHandlers={{
        //   click: () => {
        //     seat.seat_id && deleteReservationSelected(reservation, baseName, floorName, updateLayoutAndHistoryList)
        //   },
        // }}
      ></Marker>

      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default MapLayout;