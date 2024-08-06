import {Button} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export default function BackToHome() {
  return (
    <Link
      to="/"
      className="bg-primary bg-custom-image bg-cover bg-center text-white"
    >
      <Button
        variant="outlined"
        className="bg-primary bg-custom-image bg-cover bg-center text-white"
      >
        HOME
      </Button>
    </Link>
  );
}
