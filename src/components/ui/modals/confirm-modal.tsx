"use client";

import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import BaseModal from "./base-modal";

// Modal props
type Props = {
  message: string;
  title: string;
  onConfirm: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

function ConfirmModal({
  message,
  onConfirm,
  title,
  loading,
  open,
  onClose,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <>
        {/* Modal content */}
        <h2 id='transition-modal-title' className='modal-title'>
          {title}
        </h2>
        <p id='transition-modal-description' className='modal-description'>
          {message}
        </p>
        {/* Modal actions */}
        <Stack direction='row' justifyContent='end' mt={2} gap={2}>
          <Button variant='outlined' onClick={onClose}>
            Close
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              onConfirm();
            }}
            disabled={loading}
            loading={loading}
          >
            Confirm
          </Button>
        </Stack>
      </>
    </BaseModal>
  );
}

export default ConfirmModal;

