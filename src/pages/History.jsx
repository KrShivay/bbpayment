import {Grid} from "@mui/material";
import React from "react";
import BackToHome from "../components/header/backToHome";
import TableComponent from "../components/tableComponent";

export default function History() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BackToHome />
      </Grid>
      <Grid item xs={12}>
        <TableComponent />
      </Grid>
    </Grid>
  );
}
