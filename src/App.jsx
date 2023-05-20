import "leaflet/dist/leaflet.css";
import React, { createContext, useState } from "react";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx";
import Map from "./components/Map.jsx";
import StatisticsContainer from "./components/StatisticsContainer.jsx";

export const InputContext = createContext();

function App() {
  const [startLocation, setStartLocation] = useState(undefined);
  const [endLocation, setEndLocation] = useState(undefined);
  const [extraDistance, setExtraDistance] = useState(25);
  const [elevationOption, setElevationOption] = useState("maximized");
  const [overlayContent, setOverlayContent] = useState(undefined);

  return (
    <InputContext.Provider
      value={{
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        extraDistance,
        setExtraDistance,
        elevationOption,
        setElevationOption,
        overlayContent,
        setOverlayContent,
      }}
    >
      <InputContainer />
      <Map />
      <StatisticsContainer />
    </InputContext.Provider>
  );
}

export default App;
