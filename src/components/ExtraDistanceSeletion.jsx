import { Box, Slider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { InputContext } from "../App.jsx";

const marks = [5, 10, 25, 50].map(v => ({ value: v, label: `${v}%` }));

function ExtraDistanceSelection() {
  const { extraDistance, setExtraDistance } = useContext(InputContext);

  return (
    <>
      <Typography>Extra Allowed Distance:</Typography>
      <Box sx={{ paddingX: "10px" }}>
        <Slider
          value={extraDistance}
          step={1}
          onChange={e => setExtraDistance(e.target.value)}
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
