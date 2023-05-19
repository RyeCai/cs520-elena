import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

function ElevationSelection({ sx }) {
  console.log(sx);
  const [option, setOption] = useState("maximized");

  return (
    <ToggleButtonGroup
      sx={{ ...sx }}
      fullWidth
      color="primary"
      value={option}
      exclusive
      onChange={(_, option) => setOption(option)}
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
