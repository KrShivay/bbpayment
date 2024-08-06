import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function LoaderModal({ loading }) {
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={loading !== undefined ? loading : true}
      fullScreen
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      className="tw-z-[999999999]"
    >
      <div
        className="row align-items-center"
        style={{ height: "100%", width: "100%", position: "fixed" }}
      >
        <div style={{ width: "12%" }}>
          <div id="circle3"></div>
        </div>
      </div>
    </BootstrapDialog>
  );
}
