import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";

const ContainerDialog = ({open, handleClose, component}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="dialog-title">
        <Box className="flex justify-end items-center">
          <IconButton onClick={handleClose}>X</IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className="bg-white rounded-lg shadow-lg">{component}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default ContainerDialog;
