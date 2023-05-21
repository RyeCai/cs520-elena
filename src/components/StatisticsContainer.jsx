import { Box, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { InputContext } from "../App.jsx";

export default function StatisticsContainer() {
  const { overlayContent } = useContext(InputContext);

  if (overlayContent === undefined) return <></>;

  return (
    <Paper
      style={{
        minWidth: "80%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        zIndex: 1,
        position: "absolute",
        left: "50%",
        bottom: "0",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Box flex justifyContent="center" alignContent="center" textAlign="center">
        <Typography>{overlayContent}</Typography>
      </Box>
    </Paper>
  );
}
