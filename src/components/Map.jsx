import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const center = [42.3906, -72.5283];
const zoom = 16;

function Map() {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default Map;