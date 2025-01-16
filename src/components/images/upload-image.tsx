"use client";

import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import CreateImageModal from "./create-image-modal";

function UploadImage() {
  // modals states
  const [createImage, setCreateImage] = useState(false);

  return (
    <>
      {/* Upload image button */}
      <Box
        mt={{
          xs: 4,
          sm: 4,
          md: 0,
        }}
      >
        <Paper
          sx={{
            minWidth: 280,
            padding: "1rem",
          }}
        >
          <Button
            variant='contained'
            sx={{
              width: "100%",
            }}
            onClick={() => setCreateImage(true)}
          >
            Upload Image
          </Button>
        </Paper>
      </Box>

      {/* Create image modal */}
      <CreateImageModal
        onClose={() => setCreateImage(false)}
        open={createImage}
      />
    </>
  );
}

export default UploadImage;

