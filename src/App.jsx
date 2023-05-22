import { indigo, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "leaflet/dist/leaflet.css";
import React, { createContext, useState } from "react";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx";
import Map from "./components/Map.jsx";
import StatisticsContainer from "./components/StatisticsContainer.jsx";
import LoadingSnackbar from "./components/LoadingSnackbar";

const theme = createTheme({
  palette: {
    origin: {
      main: indigo[500],
      contrastText: "#fff",
    },
    destination: {
      main: red[900],
      contrastText: "#fff",
    },
  },
});

export const InputContext = createContext();

function App() {
  const [startLocation, setStartLocation] = useState(undefined);
  const [endLocation, setEndLocation] = useState(undefined);
  const [extraDistancePercent, setExtraDistancePercent] = useState(25);
  const [elevationOption, setElevationOption] = useState("maximized");
  const [overlayContent, setOverlayContent] = useState(undefined);
  const [path, setPath] = useState(undefined);

  return (
    <ThemeProvider theme={theme}>
      <InputContext.Provider
        value={{
          startLocation,
          setStartLocation,
          endLocation,
          setEndLocation,
          extraDistancePercent,
          setExtraDistancePercent,
          elevationOption,
          setElevationOption,
          overlayContent,
          setOverlayContent,
          path,
          setPath,
        }}
      >
        <InputContainer />
        <Map />
        <StatisticsContainer />
        <LoadingSnackbar/>
      </InputContext.Provider>
    </ThemeProvider>
  );
}

export default App;
