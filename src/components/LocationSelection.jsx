import React, { useState } from "react";

import { Button, TextField } from "@mui/material";

export default function LocationSelection({ name }) {
  const [text, setText] = useState("");

  return (
    <>
      <TextField
        sx={{ paddingBottom: "20px" }}
        fullWidth
        label={`${name} Location`}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button fullWidth variant="outlined">
        Search
      </Button>
    </>
  );
}
