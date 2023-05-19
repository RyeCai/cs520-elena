import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const marks = [5, 10, 25, 50].map(v => ({ value: v, label: `${v}%` }));

function ExtraDistanceSelection({ onChange, value }) {
  return (
    <>
      <Typography>Extra Allowed Distance:</Typography>
      <Box sx={{ paddingX: "10px" }}>
        <Slider
          value={value}
          step={1}
          onChange={onChange}
          valueLabelDisplay="auto"
          min={5}
          max={50}
          marks={marks}
        />
      </Box>
    </>
  );
}

export default ExtraDistanceSelection;
