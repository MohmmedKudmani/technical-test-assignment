"use client";

import useImages from "@/common/hooks/useImages";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import dayjs from "@/lib/dayjs";
import useCategories from "@/common/hooks/useCategories";
import Filters from "./filters";
import ActionsMenu from "@/lib/ui/actions-menu";
import { ImageType } from "@/common/schemas/images.schema";
import ConfirmModal from "@/lib/ui/modals/confirm-modal";
import EditImageModal from "./edit-image-modal";

function Images() {
  const { images, imagesStatus, mutateDeleteImage, mutateDeleteImageStatus } =
    useImages();
  const { categories } = useCategories();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  // selected category
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  // modals states
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const filteredImages = images.filter((image) => {
    const matchesCategory =
      category === "all" || image.categoryId === +category;

    const matchesName = image.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesName;
  });

  return (
    <>
      <section style={{ width: "100%" }}>
        <Filters
          categories={categories}
          category={category}
          search={search}
          setCategory={setCategory}
          setSearch={setSearch}
        />
        <Stack gap={3} direction='row' flexWrap='wrap'>
          {imagesStatus === "pending" ? (
            <Stack
              justifyContent='center'
              alignItems='center'
              height='80vh'
              width='100%'
            >
              <CircularProgress />
            </Stack>
          ) : (
            filteredImages.map((image) => {
              const category = categories.find(
                (cat) => cat.id === image.categoryId,
              );

              return (
                <Paper
                  key={image.id}
                  sx={{
                    position: "relative",
                    padding: "0.5rem",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(.98)",
                      "& .overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Stack
                    justifyContent='end'
                    alignItems='end'
                    width='100%'
                    mb={1}
                  >
                    <ActionsMenu
                      handleDelete={() => {
                        setSelectedImage(image);
                        setDeleteModal(true);
                      }}
                      handleEdit={() => {
                        setSelectedImage(image);
                        setEditModal(true);
                      }}
                    />
                  </Stack>
                  <Box
                    sx={{
                      position: "relative",
                      width: 250,
                      height: 200,
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: "7px",
                      }}
                      src={image.url}
                      alt={image.name}
                      width={250}
                      height={200}
                    />
                    <Box
                      className='overlay'
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "7px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                        color: "white",
                        padding: "1rem",
                      }}
                    >
                      <Stack
                        direction='row'
                        width='100%'
                        justifyContent='space-between'
                      >
                        <Typography variant='subtitle1'>
                          {dayjs(image.uploadDate).fromNow()}
                        </Typography>
                        <Typography variant='subtitle1'>
                          {category?.name || ""}
                        </Typography>
                      </Stack>
                      <Stack direction='row'>
                        <Typography variant='subtitle1'>
                          {image.name}
                        </Typography>
                      </Stack>
                      <Stack
                        width='100%'
                        justifyContent='space-between'
                        direction='row'
                      >
                        <Typography variant='subtitle1'>
                          {image.metadata.size}
                        </Typography>
                        <Typography variant='subtitle1'>
                          {image.metadata.resolution}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Paper>
              );
            })
          )}
        </Stack>
      </section>
      {selectedImage ? (
        <ConfirmModal
          open={deleteModal}
          onClose={() => {
            setSelectedImage(null);
            setDeleteModal(false);
          }}
          message={`Are you sure you want to delete ${selectedImage.name} image`}
          title='Delete image'
          onConfirm={() => {
            mutateDeleteImage(selectedImage?.id, {
              onSuccess: () => {
                setSelectedImage(null);
                setDeleteModal(false);
              },
            });
          }}
          loading={mutateDeleteImageStatus === "pending"}
        />
      ) : null}
      {selectedImage ? (
        <EditImageModal
          image={selectedImage}
          open={!!editModal}
          onClose={() => {
            setSelectedImage(null);
            setEditModal(false);
          }}
        />
      ) : null}
    </>
  );
}

export default Images;

