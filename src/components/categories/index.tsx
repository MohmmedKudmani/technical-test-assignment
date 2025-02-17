"use client";

import useCategories from "@/common/hooks/useCategories";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ActionsMenu from "../ui/actions-menu";
import ConfirmModal from "../ui/modals/confirm-modal";
import { CategoryType } from "@/common/schemas/categories.schema";
import EditCategoryModal from "./edit-category-modal";
import CreateCategoryModal from "./create-category-modal";

function Categories() {
  // Categories hooks
  const {
    categories,
    categoriesStatus,
    mutateDeleteCategory,
    mutateDeleteCategoryStatus,
  } = useCategories();

  // selected category
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );

  // modals states
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          minWidth: 280,
          height: "fit-content",
        }}
      >
        {/* Category title */}
        <Typography
          variant='h6'
          sx={{
            mb: 2,
          }}
        >
          Categories
        </Typography>

        {/* Categories list */}
        <Stack gap={3}>
          {categoriesStatus === "pending" ? (
            <Stack
              justifyContent='center'
              alignItems='center'
              height='50vh'
              width='100%'
            >
              <CircularProgress />
            </Stack>
          ) : (
            categories.map((category) => (
              <Box
                key={category.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction='row' alignItems='center' gap={1}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <Typography
                      variant='body1'
                      style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant='inherit'
                      style={{ fontSize: "0.9rem" }}
                    >
                      {category.description}
                    </Typography>
                  </div>
                </Stack>
                <Box
                  sx={{
                    ml: 1,
                  }}
                >
                  <ActionsMenu
                    handleDelete={() => {
                      setSelectedCategory(category);
                      setDeleteModal(true);
                    }}
                    handleEdit={() => {
                      setSelectedCategory(category);
                      setEditModal(true);
                    }}
                  />
                </Box>
              </Box>
            ))
          )}
        </Stack>

        {/* Create category button */}
        <Button
          onClick={() => setCreateModal(true)}
          variant='contained'
          sx={{
            mt: 3,
            width: "100%",
          }}
        >
          Create a category
        </Button>
      </Paper>

      {/* Confirm delete category modal */}
      {selectedCategory ? (
        <ConfirmModal
          open={deleteModal}
          onClose={() => {
            setSelectedCategory(null);
            setDeleteModal(false);
          }}
          message={`Are you sure you want to delete ${selectedCategory.name} category`}
          title='Delete category'
          onConfirm={() => {
            mutateDeleteCategory(selectedCategory?.id, {
              onSuccess: () => {
                setSelectedCategory(null);
                setDeleteModal(false);
              },
            });
          }}
          loading={mutateDeleteCategoryStatus === "pending"}
        />
      ) : null}

      {/* Edit category modal */}
      {selectedCategory ? (
        <EditCategoryModal
          category={selectedCategory}
          open={!!editModal}
          onClose={() => {
            setSelectedCategory(null);
            setEditModal(false);
          }}
        />
      ) : null}

      {/* Create category modal */}
      <CreateCategoryModal
        onClose={() => setCreateModal(false)}
        open={createModal}
      />
    </>
  );
}

export default Categories;

