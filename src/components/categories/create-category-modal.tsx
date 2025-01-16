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
import { PostCategoryType } from "@/common/schemas/categories.schema";
import useCategories from "@/common/hooks/useCategories";
import BaseModal from "../ui/modals/base-modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

function CreateCategoryModal({ open, onClose }: Props) {
  // Categories hooks
  const { mutatePostCategory, mutatePostCategoryStatus } = useCategories();

  // React hook form
  const form = useForm<PostCategoryType>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <BaseModal open={open} onClose={onClose}>
      <>
        {/* Modal title */}
        <Typography variant='h6' mb={2}>
          Create Category
        </Typography>

        {/* Modal form */}
        <form
          onSubmit={form.handleSubmit((values) =>
            mutatePostCategory(
              {
                name: values.name,
                description: values.description,
                image: "",
              },
              {
                onSuccess: () => {
                  onClose();
                },
              },
            ),
          )}
        >
          <Stack gap={4}>
            {/* Name input */}
            <FormControl variant='standard'>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input id='name' {...form.register("name")} />
            </FormControl>

            {/* Description input */}
            <FormControl variant='standard' {...form.register("description")}>
              <InputLabel htmlFor='description'>Description</InputLabel>
              <Input id='description' />
            </FormControl>
          </Stack>

          {/* Modal actions */}
          <Stack direction='row' justifyContent='end' mt={4} gap={2}>
            <Button variant='outlined' onClick={onClose}>
              Close
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={mutatePostCategoryStatus === "pending"}
              loading={mutatePostCategoryStatus === "pending"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </>
    </BaseModal>
  );
}

export default CreateCategoryModal;

