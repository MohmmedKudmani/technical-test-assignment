"use client";

import { Stack } from "@mui/system";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  CategoryType,
  PostCategoryType,
} from "@/common/schemas/categories.schema";
import useCategories from "@/common/hooks/useCategories";
import { useEffect } from "react";
import BaseModal from "../ui/modals/base-modal";

// Edit category modal props
type Props = {
  open: boolean;
  onClose: () => void;
  category: CategoryType;
};

function EditCategoryModal({ open, onClose, category }: Props) {
  // Categories hooks
  const { mutatePutCategory, mutatePutCategoryStatus } = useCategories();

  // React hook form
  const form = useForm<PostCategoryType>({
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  // Load form data from categories API data
  useEffect(() => {
    form.reset({
      name: category.name,
      description: category.description,
    });
  }, [category.description, category.name, form]);

  return (
    <BaseModal open={open} onClose={onClose}>
      <>
        {/* Modal title */}
        <Typography variant='h6' mb={2}>
          Edit Category
        </Typography>

        {/* Modal form */}
        <form
          onSubmit={form.handleSubmit((values) =>
            // Edit category function
            mutatePutCategory(
              {
                payload: {
                  name: values.name,
                  description: values.description,
                  image: "",
                },
                id: category.id,
              },
              {
                // On success close modal
                onSuccess: () => {
                  onClose();
                },
              },
            ),
          )}
        >
          <Stack gap={4}>
            {/* Name input */}
            <FormControl variant='standard' {...form.register("name")}>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input id='name' />
            </FormControl>

            {/* Description input */}
            <FormControl variant='standard' {...form.register("description")}>
              <InputLabel htmlFor='description'>Description</InputLabel>
              <Input id='description' />
            </FormControl>
          </Stack>

          {/* Modal actions buttons */}
          <Stack direction='row' justifyContent='end' mt={4} gap={2}>
            <Button variant='outlined' onClick={onClose}>
              Close
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={mutatePutCategoryStatus === "pending"}
              loading={mutatePutCategoryStatus === "pending"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    </BaseModal>
  );
}

export default EditCategoryModal;

