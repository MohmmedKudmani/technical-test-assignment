"use client";

import { styled, css } from "@mui/system";
import Fade from "@mui/material/Fade";
import { Modal as MuiModal } from "@mui/base/Modal";
import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

function BaseModal({ children, onClose, open }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      // Backdrop styles
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={open}>
        <ModalContent sx={style}>{children}</ModalContent>
      </Fade>
    </Modal>
  );
}

// Modal backdrop
const Backdrop = forwardRef<HTMLDivElement, { open: boolean }>((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref as React.RefObject<HTMLDivElement>} {...other} />
    </Fade>
  );
});

Backdrop.displayName = "Backdrop";

// Modal styles
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

const Modal = styled(MuiModal)`
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

export default BaseModal;

