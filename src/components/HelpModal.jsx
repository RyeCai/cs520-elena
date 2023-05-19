import GitHubIcon from "@mui/icons-material/GitHub";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Button, IconButton, Modal, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

function HelpModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button fullWidth onClick={() => setOpen(true)}>
        <HelpOutlineIcon />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
          }}
        >
          <Paper display="flex" style={{ padding: "10px", marginBottom: "5px" }}>
            <Typography variant="h5">⛰️ EleNa</Typography>
            <Typography variant="h6">About</Typography>
            <Typography variant="body1" paragraph>
              This web application calculates geographical routes that maximizes or minimizes elevation gain. Users may
              enter a destination address, a selection to either maximize or minimize elevation, and an allowed extra
              distance as a percentage of the shortest route. The application will then calculate and display a
              resulting path.
            </Typography>
            <Typography variant="h6">Usage</Typography>
            <Typography variant="body1" paragraph>
              Using the text field, search for your destination using an address or location name. Avoid using long form
              mailing addresses. The building number, street name, and town should be good enough. Example: &quot;6 Main
              Street Amherst&quot;. After pressing &quot;SEARCH&quot;, a marker will show on the map to display your
              current location and resolved destination.
            </Typography>
            <Typography variant="body1" paragraph>
              After selecting a destination, you can configure your route preferences. First, select whether your route
              should maximize or minimize total elevation gain. Then configure how much additional distance the
              elevation-sensitive route may have. This is represented as a percentage of the shortest possible route.
            </Typography>
            <Typography variant="body1" paragraph>
              Finally, press &quot;CALCULATE ROUTE&quot; to have your route calculated and displayed.
            </Typography>
            <Box display="flex" justifyContent="center">
              <IconButton
                component="a"
                href={"https://github.com/RyeCai/cs520-elena"}
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Paper>
        </div>
      </Modal>
    </>
  );
}

export default HelpModal;
