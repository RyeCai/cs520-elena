import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useContext } from "react";
import { InputContext } from "../App.jsx";

function ElevationSelection({ sx }) {
  const { elevationOption, setElevationOption } = useContext(InputContext);

  return (
    <ToggleButtonGroup
      sx={{ ...sx }}
      fullWidth
      color="primary"
      value={elevationOption}
      exclusive
      onChange={e => setElevationOption(e.target.value)}
    >
      <ToggleButton sx={{ textTransform: "none" }} value="maximized">
        Maximize Elevation Gain
      </ToggleButton>
      <ToggleButton sx={{ textTransform: "none" }} value="minimized">
        Minimize Elevation Gain
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ElevationSelection;
