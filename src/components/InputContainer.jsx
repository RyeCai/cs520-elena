import { Button, Grid, Stack, Paper, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import React, { useState, useContext } from "react";

import { InputContext } from "../App.jsx";
import ElevationSelection from "./ElevationSelection.jsx";
import ExtraDistanceSelection from "./ExtraDistanceSeletion.jsx";
import HelpModal from "./HelpModal.jsx";
import LocationSelection from "./LocationSelection.jsx";

function InputContainer() {
  const { startLocation, 
    setStartLocation, 
    endLocation, 
    setEndLocation, 
    setElevationOption, 
    setExtraDistance, 
    setOverlayContent
    } = useContext(InputContext);
  const [startText, setStartText] = useState("");
  const [isCalculating, setIsCalculating] = useState(false)
  const [endText, setEndText] = useState("");
  const [expanded, setExpanded] = useState(true);

  function handleReset() {
    setStartLocation(undefined);
    setEndLocation(undefined);
    setExtraDistance(25);
    setElevationOption("maximized");
    setOverlayContent(undefined);
    setStartText("");
    setEndText("");
  }

  function handleExpand() { 
    setExpanded(prev => !prev);
  } 

  function handleCalculating() {
    handleExpand();
    setIsCalculating(true);
  }

  return (
    <Stack sx={{minWidth: "80%", zIndex: 1, position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
      <Collapse in={expanded}>
      <Paper
        style={{
          borderRadius: 0, 
          padding: "8px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LocationSelection name="Start" color="origin" selection={startLocation} onSelect={setStartLocation} text={startText} setText={setStartText}/>
          </Grid>
          <Grid item xs={6}>
            <LocationSelection name="End" color="destination" selection={endLocation} onSelect={setEndLocation} text={endText} setText={setEndText}/>
          </Grid>
          <Grid item xs={6}>
            <ElevationSelection />
          </Grid>
          <Grid item xs={6}>
            <ExtraDistanceSelection />
          </Grid>
          <Grid item xs={8}>
            <Button fullWidth variant="contained" disabled={startLocation === undefined || endLocation === undefined} onClick={handleCalculating}>
              Calculate Route
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant="outlined" disabled={isCalculating} color="error" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={1}>
            <HelpModal />
          </Grid>
        </Grid>
      </Paper>
      </Collapse>
      <Button disabled={isCalculating} fullWidth variant="contained" sx={{borderTopRightRadius: 0, borderTopLeftRadius: 0}} onClick={handleExpand}>
        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
      </Button>
    </Stack>
  );
}

export default InputContainer;
