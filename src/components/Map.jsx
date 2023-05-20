import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { match } from "ts-pattern";
import { InputContext } from "../App.jsx";

const center = [42.3906, -72.5283];
const zoom = 16;

function Map() {
  const { userLocation, setUserLocation, destinationLocation, setOverlayContent } = useContext(InputContext);

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
  });

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
