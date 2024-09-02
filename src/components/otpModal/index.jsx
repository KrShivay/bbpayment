import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState} from "react";

const OTPModal = ({open, handleClose, handleSubmit}) => {
  const [otp, setOtp] = useState("");

  const handleSubmitOtp = () => {
    // Handle OTP submission logic here
    handleSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="otp-modal-title"
      aria-describedby="otp-modal-description"
    >
      <Box
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <Box className="flex justify-between items-center mb-4">
          <Typography id="otp-modal-title" variant="h6" className="font-bold">
            Enter OTP
          </Typography>
          <IconButton onClick={handleClose}>X</IconButton>
        </Box>
        <Box className="mb-4">
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{maxLength: 6, pattern: "[0-9]*"}}
            className="text-center"
          />
        </Box>
        <Button
          onClick={handleSubmitOtp}
          variant="contained"
          color="primary"
          fullWidth
          className="bg-primary"
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default OTPModal;
