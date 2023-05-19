import React, { useContext } from "react";

import { Button, TextField } from "@mui/material";
import { InputContext } from "../App.jsx";

function DestinationField() {
  const { destination, setDestination } = useContext(InputContext);

  return (
    <>
      <TextField
        sx={{ paddingBottom: "20px" }}
        fullWidth
        label="Destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <Button fullWidth variant="contained">
        Search
      </Button>
    </>
  );
}

export default DestinationField;
