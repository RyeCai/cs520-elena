import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Icon, useTheme } from "@mui/material";
import { divIcon } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { InputContext } from "../App.jsx";

const UMASS_LOCATION = [42.3906, -72.5283];
const DEFAULT_ZOOM = 16;

function MapController() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState(undefined);
  const { startLocation, endLocation } = useContext(InputContext);

  useEffect(() => {
    if (startLocation || endLocation) return;

    navigator.geolocation.getCurrentPosition(position =>
      setUserLocation([position.coords.latitude, position.coords.longitude])
    );
  }, [setUserLocation]);

  useEffect(() => {
    if (userLocation) map.flyTo(userLocation, DEFAULT_ZOOM);
  }, [map, userLocation]);

  useEffect(() => {
    if (startLocation && endLocation) {
      map.fitBounds([startLocation.coords, endLocation.coords]);
    } else if (startLocation || endLocation) {
      const location = startLocation ?? endLocation;
      map.fitBounds([location.coords, location.coords]);
    }
  }, [map, startLocation, endLocation]);

  return null;
}

function LocationMarker({ location, color }) {
  const icon = divIcon({
    html: renderToString(<Icon component={LocationOnIcon} style={{ fill: color }} />),
    iconSize: [32, 32],
  });
  return <Marker position={location.coords} icon={icon} />;
}

export default function Map() {
  const theme = useTheme();

  const { startLocation, endLocation } = useContext(InputContext);

  return (
    <MapContainer center={UMASS_LOCATION} zoom={DEFAULT_ZOOM} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {startLocation && <LocationMarker color={theme.palette.origin.main} location={startLocation} />}
      {endLocation && <LocationMarker color={theme.palette.destination.main} location={endLocation} />}
      <MapController />
    </MapContainer>
  );
}
