import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

function ElevationSelection({ sx, onChange, value }) {
  return (
    <ToggleButtonGroup
      sx={{ ...sx }}
      fullWidth
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
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
