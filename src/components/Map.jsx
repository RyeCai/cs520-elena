import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { match } from "ts-pattern";
import { InputContext } from "../App.jsx";

const UMASS_LOCATION = [42.3906, -72.5283];
const DEFAULT_ZOOM = 16;

function MapController() {
  const map = useMap();
  const { destinationLocation, setOverlayContent } = useContext(InputContext);
  const [userLocation, setUserLocation] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => setUserLocation([position.coords.latitude, position.coords.longitude]),
      error =>
        match(error.code)
          .with(error.PERMISSION_DENIED, () =>
            setOverlayContent(
              "This application requires location information. Please enable location permissions in your browsers settings."
            )
          )
          .with(error.POSITION_UNAVAILABLE, () =>
            setOverlayContent("Unable to retrieve location information. Please refresh and try again.")
          )
          .with(error.TIMEOUT, () => setOverlayContent("Timed out. Please refresh and try again."))
          .otherwise(() => setOverlayContent("An unknown error occurred. Please refresh and try again."))
    );
  }, [setUserLocation, setOverlayContent]);

  useEffect(() => {
    map.flyTo(userLocation ?? UMASS_LOCATION, DEFAULT_ZOOM);
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
