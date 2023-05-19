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
          <Paper style={{ padding: "10px" }}>
            <Typography variant="h5" gutterBottom>
              ⛰️ EleNa{" "}
            </Typography>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In non labore dicta repellat veritatis dolores
              similique laudantium, soluta deleniti, alias cupiditate saepe assumenda quae ipsa dolorum quisquam fugit
              officia ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo exercitationem cumque, voluptates
              nihil perspiciatis aliquam ullam. Iure minus, enim nisi cum quis veniam vero beatae vitae non sed repellat
              maxime!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Usage
            </Typography>
            <Typography variant="body1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In non labore dicta repellat veritatis dolores
              similique laudantium, soluta deleniti, alias cupiditate saepe assumenda quae ipsa dolorum quisquam fugit
              officia ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo exercitationem cumque, voluptates
              nihil perspiciatis aliquam ullam. Iure minus, enim nisi cum quis veniam vero beatae vitae non sed repellat
              maxime!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Meet the Team!
            </Typography>
            <Typography variant="body1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In non labore dicta repellat veritatis dolores
              similique laudantium, soluta deleniti, alias cupiditate saepe assumenda quae ipsa dolorum quisquam fugit
              officia ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo exercitationem cumque, voluptates
              nihil perspiciatis aliquam ullam. Iure minus, enim nisi cum quis veniam vero beatae vitae non sed repellat
              maxime!
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
