import * as React from "react";
import { styled, css, Stack } from "@mui/system";
import Fade from "@mui/material/Fade";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { Modal as BaseModal } from "@mui/base/Modal";
import { useForm } from "react-hook-form";
import {
  CategoryType,
  PostCategoryType,
} from "@/common/schemas/categories.schema";
import useCategories from "@/common/hooks/useCategories";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  category: CategoryType;
};

function EditCategoryModal({ open, onClose, category }: Props) {
  const { mutatePutCategory, mutatePutCategoryStatus } = useCategories();
  const form = useForm<PostCategoryType>({
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  useEffect(() => {
    form.reset({
      name: category.name,
      description: category.description,
    });
  }, [category.description, category.name, form]);

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
            Edit Category
          </Typography>
          <form
            onSubmit={form.handleSubmit((values) =>
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
                  onSuccess: () => {
                    onClose();
                  },
                },
              ),
            )}
          >
            <Stack gap={4}>
              <FormControl variant='standard' {...form.register("name")}>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input id='name' />
              </FormControl>
              <FormControl variant='standard' {...form.register("description")}>
                <InputLabel htmlFor='description'>Description</InputLabel>
                <Input id='description' />
              </FormControl>
            </Stack>
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

export default EditCategoryModal;

