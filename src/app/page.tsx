"use client";

import Images from "@/components/images";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Categories from "@/components/categories";
import UploadImage from "@/components/images/upload-image";

function HomePage() {
  return (
    <section>
      <Container>
        <Typography variant='h4' fontWeight={500} my={3}>
          Image Annotation App
        </Typography>
        <Stack direction='row'>
          <Images />
          <Stack gap={4}>
            <UploadImage />
            <Categories />
          </Stack>
        </Stack>
      </Container>
    </section>
  );
}

export default HomePage;

