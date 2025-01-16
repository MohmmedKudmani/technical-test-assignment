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
import { useEffect, useState } from "react";
import { ImageType, PostImageType } from "@/common/schemas/images.schema";
import useImages from "@/common/hooks/useImages";
import { useNotifications } from "@toolpad/core";
import useCategories from "@/common/hooks/useCategories";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BaseModal from "../ui/modals/base-modal";

// Edit image modal props
type Props = {
  open: boolean;
  onClose: () => void;
  image: ImageType;
};

function EditImageModal({ open, onClose, image }: Props) {
  // Notification hook
  const notifications = useNotifications();

  // Images hook
  const { mutatePutImage, mutatePutImageStatus } = useImages();

  // Categories hook
  const { categories } = useCategories();

  // File state
  const [file, setFile] = useState<File | null>(null);

  // React hook form
  const form = useForm<PostImageType>({
    defaultValues: {
      name: "",
      categoryId: 1,
      url: "",
      metadata: {
        resolution: "",
        size: "",
      },
    },
  });

  // Load form data from image API data
  useEffect(() => {
    form.reset({
      name: image.name,
      categoryId: image.categoryId,
      url: image.url,
      metadata: {
        resolution: image.metadata.resolution,
        size: image.metadata.size,
      },
    });
  }, [image, form]);

  // Upload image button styles
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

  return (
    <BaseModal onClose={onClose} open={open}>
      <>
        <Typography variant='h6' mb={2}>
          Edit Image
        </Typography>
        <form
          onSubmit={form.handleSubmit((values) => {
            if (file) {
              // Upload image
              mutatePutImage(
                {
                  payload: {
                    name: values.name,
                    url: values.url,
                    metadata: {
                      resolution: values.metadata.resolution,
                      size: values.metadata.size,
                    },
                    categoryId: values.categoryId,
                  },
                  id: image.id,
                },
                {
                  // On success close and reset form
                  onSuccess: () => {
                    onClose();
                    setFile(null);
                    form.reset();
                  },
                },
              );
            } else {
              // If the file is not selected, show an error
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

            {/* Image input */}
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
              disabled={mutatePutImageStatus === "pending"}
              loading={mutatePutImageStatus === "pending"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    </BaseModal>
  );
}

export default EditImageModal;

