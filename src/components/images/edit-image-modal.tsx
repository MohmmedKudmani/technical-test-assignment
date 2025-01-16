import * as React from "react";
import { styled, css, Stack } from "@mui/system";
import Fade from "@mui/material/Fade";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImageType, PostImageType } from "@/common/schemas/images.schema";
import useImages from "@/common/hooks/useImages";
import { useNotifications } from "@toolpad/core";
import useCategories from "@/common/hooks/useCategories";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  open: boolean;
  onClose: () => void;
  image: ImageType;
};

function EditImageModal({ open, onClose, image }: Props) {
  const notifications = useNotifications();
  const { mutatePutImage, mutatePutImageStatus } = useImages();
  const { categories } = useCategories();
  const [file, setFile] = useState<File | null>(null);

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
    <Modal
      aria-labelledby='unstyled-modal-title'
      aria-describedby='unstyled-modal-description'
      open={open}
      onClose={onClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={open}>
        <ModalContent sx={style}>
          <Typography variant='h6' mb={2}>
            Edit Image
          </Typography>
          <form
            onSubmit={form.handleSubmit((values) => {
              if (file) {
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
                    onSuccess: () => {
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
              <FormControl variant='standard'>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input id='name' {...form.register("name")} />
              </FormControl>
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
        </ModalContent>
      </Fade>
    </Modal>
  );
}

const Backdrop = React.forwardRef<HTMLDivElement, { open: boolean }>(
  (props, ref) => {
    const { open, ...other } = props;
    return (
      <Fade in={open}>
        <div ref={ref as React.RefObject<HTMLDivElement>} {...other} />
      </Fade>
    );
  },
);

Backdrop.displayName = "Backdrop";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export default EditImageModal;

