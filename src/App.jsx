import { makeStyles } from "@mui/styles";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import RoundedContainer from "./components/RoundedContainer.jsx";

const center = [42.3906, -72.5283];
const zoom = 16;

function Map() {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

const useStyles = makeStyles(theme => ({
  parentContainer: {
    position: "relative",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.parentContainer}>
      <Map />
      <RoundedContainer />
    </div>
  );
}

export default App;
