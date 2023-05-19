import { Grid, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import ElevationSelection from "./ElevationSelection.jsx";
import ExtraDistanceSelection from "./ExtraDistanceSeletion.jsx";
import HelpModal from "./HelpModal.jsx";

function InputGroup() {
  const [destination, setDestination] = useState("");
  const [extraDistance, setExtraDistance] = useState(25);
  const [elevationOption, setElevationOption] = useState("maximized");

  const handleCalculateRoute = () => {
    // TODO
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Grid item xs={6}>
        <TextField
          sx={{ paddingBottom: "20px" }}
          fullWidth
          label="Destination"
          value={destination}
          onChange={e => setDestination(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={handleCalculateRoute}>
          Search
        </Button>
      </Grid>
      <Grid item xs={6}>
        <ElevationSelection
          sx={{ paddingBottom: "10px " }}
          value={elevationOption}
          onChange={e => setElevationOption(e.target.value)}
        />
        <ExtraDistanceSelection value={extraDistance} onChange={e => setExtraDistance(e.target.value)} />
      </Grid>
      <Grid item xs={11}>
        <Button fullWidth variant="contained" onClick={handleCalculateRoute}>
          Calculate Route
        </Button>
      </Grid>
      <Grid item xs={1} sx={{ justifyContent: "flex-end" }}>
        <HelpModal />
      </Grid>
    </Grid>
  );
}

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
      <InputGroup />
    </Paper>
  );
}

export default InputContainer;
