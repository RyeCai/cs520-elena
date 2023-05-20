import { Button, Grid, Paper } from "@mui/material";
import React, { useContext } from "react";

import { InputContext } from "../App.jsx";
import ElevationSelection from "./ElevationSelection.jsx";
import ExtraDistanceSelection from "./ExtraDistanceSeletion.jsx";
import HelpModal from "./HelpModal.jsx";
import LocationSelection from "./LocationSelection.jsx";

function InputContainer() {
  const { startLocation, endLocation } = useContext(InputContext);

  return (
    <Paper
      style={{
        minWidth: "80%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 1,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocationSelection name="Start" />
        </Grid>
        <Grid item xs={6}>
          <LocationSelection name="End" />
        </Grid>
        <Grid item xs={6}>
          <ElevationSelection />
        </Grid>
        <Grid item xs={6}>
          <ExtraDistanceSelection />
        </Grid>
        <Grid item xs={8}>
          <Button fullWidth variant="contained" disabled={startLocation === undefined || endLocation === undefined}>
            Calculate Route
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained">
            Reset
          </Button>
        </Grid>
        <Grid item xs={1}>
          <HelpModal />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default InputContainer;
