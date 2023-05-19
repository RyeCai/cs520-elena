import "leaflet/dist/leaflet.css";
import React from "react";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx";
import Map from "./components/Map.jsx";

function App() {
  return (
    <>
      <InputContainer />
      <Map />
    </>
  );
}

export default App;
