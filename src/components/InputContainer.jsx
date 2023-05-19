import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

function InputBox() {
  const [destination, setDestination] = useState("");
  const [elevationOption, setElevationOption] = useState("maximize");

  const handleCalculateRoute = () => {
    // TODO
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "15px", zIndex: "inherit" }}>
      <TextField label="Destination" value={destination} onChange={e => setDestination(e.target.value)} />

      <Select value={elevationOption} onChange={e => setElevationOption(e.target.value)} label="Elevation Option">
        <MenuItem value="maximize">Maximize Elevation</MenuItem>
        <MenuItem value="minimize">Minimize Elevation</MenuItem>
      </Select>

      <Button variant="contained" onClick={handleCalculateRoute}>
        Calculate Route
      </Button>
    </Box>
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
      }}
    >
      <InputBox />
    </Paper>
  );
}

export default InputContainer;
