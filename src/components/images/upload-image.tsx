"use client";

import { Button, Paper } from "@mui/material";
import React, { useState } from "react";
import CreateImageModal from "./create-image-modal";

function UploadImage() {
  // modals states
  const [createImage, setCreateImage] = useState(false);

  return (
    <>
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

      <CreateImageModal
        onClose={() => setCreateImage(false)}
        open={createImage}
      />
    </>
  );
}

export default UploadImage;

