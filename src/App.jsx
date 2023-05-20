import "leaflet/dist/leaflet.css";
import React, { createContext, useState } from "react";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx";
import Map from "./components/Map.jsx";

export const InputContext = createContext();

function App() {
  const [destinationLocation, setDestinationLocation] = useState(undefined);
  const [userLocation, setUserLocation] = useState(undefined);
  const [extraDistance, setExtraDistance] = useState(25);
  const [elevationOption, setElevationOption] = useState("maximized");

  return (
    <InputContext.Provider
      value={{
        destinationLocation,
        setDestinationLocation,
        userLocation,
        setUserLocation,
        extraDistance,
        setExtraDistance,
        elevationOption,
        setElevationOption,
      }}
    >
      <InputContainer />
      <Map />
    </InputContext.Provider>
  );
}

export default App;
