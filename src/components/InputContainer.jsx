import { Button, Grid, Paper } from "@mui/material";
import React from "react";

import DestinationField from "./DestinationField.jsx";
import ElevationSelection from "./ElevationSelection.jsx";
import ExtraDistanceSelection from "./ExtraDistanceSeletion.jsx";
import HelpModal from "./HelpModal.jsx";

function InputContainer() {
  return (
    <Paper
      style={{
        minWidth: "80%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 1,
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0%)",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={6}>
          <DestinationField />
        </Grid>
        <Grid item xs={6}>
          <ElevationSelection sx={{ paddingBottom: "10px " }} />
          <ExtraDistanceSelection />
        </Grid>
        <Grid item xs={11}>
          <Button fullWidth variant="contained">
            Calculate Route
          </Button>
        </Grid>
        <Grid item xs={1} sx={{ justifyContent: "flex-end" }}>
          <HelpModal />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default InputContainer;
