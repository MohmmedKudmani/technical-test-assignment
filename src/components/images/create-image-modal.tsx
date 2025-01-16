"use client";

import { styled, Stack } from "@mui/system";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useCategories from "@/common/hooks/useCategories";
import useImages from "@/common/hooks/useImages";
import { PostImageType } from "@/common/schemas/images.schema";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useNotifications } from "@toolpad/core";
import BaseModal from "../ui/modals/base-modal";

// Modal styles
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Create image modal props
type Props = {
  open: boolean;
  onClose: () => void;
};

function CreateImageModal({ open, onClose }: Props) {
  // Notification hook
  const notifications = useNotifications();

  // Images hooks
  const { mutatePostImage, mutatePostImageStatus } = useImages();

  // Categories hooks
  const { categories } = useCategories();

  // File state
  const [file, setFile] = useState<File | null>(null);

  // React hook form
  const form = useForm<PostImageType>({
    defaultValues: {
      name: "",
      url: "",
      metadata: {
        resolution: "",
        size: "",
      },
      categoryId: 1,
    },
  });

  return (
    <BaseModal
      open={open}
      onClose={() => {
        // Close and reset form
        onClose();
        setFile(null);
        form.reset();
      }}
    >
      <>
        {/* Modal title */}
        <Typography variant='h6' mb={2}>
          Create Category
        </Typography>

        {/* Modal form */}
        <form
          onSubmit={form.handleSubmit((values) => {
            if (file) {
              mutatePostImage(
                {
                  name: values.name,
                  url: file.name,
                  metadata: {
                    resolution: values.metadata.resolution || "",
                    size: values.metadata.size || "",
                  },
                  categoryId: values.categoryId,
                },
                {
                  onSuccess: () => {
                    // Close and reset form
                    onClose();
                    setFile(null);
                    form.reset();
                  },
                },
              );
            } else {
              notifications.show("Please select an image", {
                severity: "error",
              });
            }
          })}
        >
          <Stack gap={4}>
            {/* Name input */}
            <FormControl variant='standard'>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input id='name' {...form.register("name")} />
            </FormControl>

            {/* Category select */}
            <FormControl fullWidth>
              <InputLabel id='category'>Category</InputLabel>
              <Controller
                name='categoryId'
                control={form.control}
                defaultValue={form.getValues().categoryId}
                render={({ field }) => (
                  <Select
                    labelId='category'
                    id='category'
                    label='Category'
                    {...field}
                    onChange={(event) => {
                      field.onChange(+event.target.value);
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Upload image */}
            <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload image
              <VisuallyHiddenInput
                type='file'
                onChange={(event) => {
                  if (event.target.files) {
                    setFile(event.target.files[0]);
                  }
                }}
              />
            </Button>
          </Stack>

          {/* Modal actions */}
          <Stack direction='row' justifyContent='end' mt={4} gap={2}>
            <Button
              variant='outlined'
              onClick={() => {
                onClose();
                setFile(null);
                form.reset();
              }}
            >
              Close
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={mutatePostImageStatus === "pending"}
              loading={mutatePostImageStatus === "pending"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    </BaseModal>
  );
}

export default CreateImageModal;

