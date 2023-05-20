import { Box, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { InputContext } from "../App.jsx";

export default function StatisticsContainer() {
  const { userLocation } = useContext(InputContext);

  let content;
  if (userLocation === undefined) {
    content = "Please enable location permissions to use this application";
  }

  if (!content) {
    return <></>;
  }

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
        <Typography>{content}</Typography>
      </Box>
    </Paper>
  );
}
