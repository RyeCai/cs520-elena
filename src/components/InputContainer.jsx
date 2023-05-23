import { Button, Grid, Stack, Paper, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useState, useContext } from "react";

import { InputContext } from "../App.jsx";
import findPath from "../findPath.js";
import ElevationSelection from "./ElevationSelection.jsx";
import ExtraDistanceSelection from "./ExtraDistanceSeletion.jsx";
import HelpModal from "./HelpModal.jsx";
import LocationSelection from "./LocationSelection.jsx";

function InputContainer() {
  const {
    startLocation,
    setStartLocation,
    endLocation,
    setEndLocation,
    setExtraDistancePercent,
    extraDistancePercent,
    setElevationOption,
    elevationOption,
    setPath,
    setOverlayContent,
    isCalculating,
    setIsCalculating,
  } = useContext(InputContext);
  const [error, setError] = useState(undefined);
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const [expanded, setExpanded] = useState(true);

  async function handleCalculateRoute() {
    handleExpand();
    setIsCalculating(true);
    try {
      const result = await findPath({
        startCoords: startLocation.coords,
        endCoords: endLocation.coords,
        elevationOption,
        extraDistancePercent,
      });

      console.log(result);
      if (result) {
        setError(undefined);
        setPath(result.path);
      } else {
        setError(
          "Unable to calculate path. Please allow additional extra distance."
        );
      }
    } catch (e) {
      console.error(e);
      // TODO
    }
    setIsCalculating(false);
  }

  function handleReset() {
    setStartLocation(undefined);
    setEndLocation(undefined);
    setExtraDistancePercent(25);
    setElevationOption("maximized");
    setOverlayContent(undefined);
    setStartText("");
    setEndText("");
    setPath(undefined);
  }

  function handleExpand() {
    setExpanded((prev) => !prev);
  }

  return (
    <Stack
      sx={{
        minWidth: "80%",
        zIndex: 1,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Collapse in={expanded}>
        <Paper
          style={{
            borderRadius: 0,
            padding: "8px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocationSelection
                name="Start"
                color="origin"
                selection={startLocation}
                onSelect={(location) => {
                  setPath(undefined);
                  setStartLocation(location);
                }}
                text={startText}
                setText={setStartText}
              />
            </Grid>
            <Grid item xs={6}>
              <LocationSelection
                name="End"
                color="destination"
                selection={endLocation}
                onSelect={(location) => {
                  setPath(undefined);
                  setEndLocation(location);
                }}
                text={endText}
                setText={setEndText}
              />
            </Grid>
            <Grid item xs={6}>
              <ElevationSelection />
            </Grid>
            <Grid item xs={6}>
              <ExtraDistanceSelection />
            </Grid>
            <Grid item xs={8}>
              <Button
                fullWidth
                variant="contained"
                disabled={
                  startLocation === undefined || endLocation === undefined
                }
                onClick={handleCalculateRoute}
              >
                Calculate Route
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={isCalculating}
                color="error"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={1}>
              <HelpModal />
            </Grid>
          </Grid>
          {error && (
            <Modal
              open={error !== undefined}
              onClose={() => setError(undefined)}
            >
              <Paper
                display="flex"
                style={{ padding: "10px", marginBottom: "5px" }}
              >
                <Typography variant="h5">{error}</Typography>
              </Paper>
            </Modal>
          )}
        </Paper>
      </Collapse>
      <Button
        disabled={isCalculating}
        fullWidth
        variant="contained"
        sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
        onClick={handleExpand}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
    </Stack>
  );
}

export default InputContainer;
