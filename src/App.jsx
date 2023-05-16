import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx"

const center = [42.3906, -72.5283];
const zoom = 16;

function Map() {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

import { useState, useEffect } from "react";
import "./App.css";
import L from "../node_modules/leaflet/dist/leaflet.js"; // // Creating map options
import axios from "../node_modules/axios/dist/axios.js";
function App() {
  return (
    <>
      <InputContainer />
      <Map />
    </>
  );
}

export default App;
