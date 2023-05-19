import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const marks = [5, 10, 25, 50].map(v => ({ value: v, label: `${v}%` }));

function DistanceSelection() {
  return (
    <>
      <Typography>Extra Allowed Distance:</Typography>
      <Box sx={{ paddingX: "10px" }}>
        <Slider defaultValue={20} step={1} valueLabelDisplay="auto" min={5} max={50} marks={marks} />
      </Box>
    </>
  );
}

export default DistanceSelection;
