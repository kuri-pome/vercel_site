"use client";
import { ImageOverlay, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { CRS, LatLng, LatLngBounds } from 'leaflet'
import "leaflet/dist/leaflet.css";

const img_path = "../../../../public/img/communal_field.jpg"
const imageBounds = new LatLngBounds([0, 0], [1000, 800]);

const MapLayout = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <ImageOverlay
        url={img_path}
        bounds={imageBounds}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLayout;