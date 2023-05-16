import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

function InputContainer() {
  const [destination, setDestination] = useState("");
  const [elevationOption, setElevationOption] = useState("maximize");

  const handleCalculateRoute = () => {
    // TODO
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "40px" }}>
      <TextField
        label="Destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        sx={{ marginBottom: "1rem" }}
      />

      <Select
        value={elevationOption}
        onChange={e => setElevationOption(e.target.value)}
        label="Elevation Option"
        sx={{ marginBottom: "1rem" }}
      >
        <MenuItem value="maximize">Maximize Elevation</MenuItem>
        <MenuItem value="minimize">Minimize Elevation</MenuItem>
      </Select>

      <Button variant="contained" onClick={handleCalculateRoute}>
        Calculate Route
      </Button>
    </Box>
  );
}

export default InputContainer;
