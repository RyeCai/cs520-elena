import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const UMASS_LOCATION = [42.3906, -72.5283];
const DEFAULT_ZOOM = 16;

function MapController() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position =>
      setUserLocation([position.coords.latitude, position.coords.longitude])
    );
  }, [setUserLocation]);

  useEffect(() => {
    if (userLocation) map.flyTo(userLocation, DEFAULT_ZOOM);
  }, [map, userLocation]);

  return null;
}

export default function Map() {
  return (
    <MapContainer center={UMASS_LOCATION} zoom={DEFAULT_ZOOM} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController />
    </MapContainer>
  );
}
