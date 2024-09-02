import {Box, Container, Divider, Typography} from "@mui/material";
import React from "react";
import bbpsImages from "../../assets/bbpsImages";

const Receipt = () => {
  return (
    <Box className="flex justify-center items-center">
      <Container
        maxWidth="md"
        className="bg-white p-5 grid grid-rows-auto gap-5"
      >
        <Box className="flex justify-center mb-5">
          <img
            src={bbpsImages.finkedaLogo}
            alt="Company Logo"
            className="max-w-xs h-auto"
          />
        </Box>
        <Divider className="mb-5" />
        <Box className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Transacton Id:
            </Typography>
            <Typography variant="body1">IA24G097W22249093042</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Transaction Type:
            </Typography>
            <Typography variant="body1">Aadhar Pay</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Transaction Date/Time:
            </Typography>
            <Typography variant="body1">2024-08-12 09:30:42</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Customer account number:
            </Typography>
            <Typography variant="body1">XXXXXXXX903</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Customer Name:
            </Typography>
            <Typography variant="body1">AKHAND PRATAP YADAV</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Customer Bank:
            </Typography>
            <Typography variant="body1">State Bank of India</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Customer phone number:
            </Typography>
            <Typography variant="body1">8120577975</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight="bold">
              Bank IIN:
            </Typography>
            <Typography variant="body1">11323</Typography>
          </Box>
        </Box>
        <Divider className="mt-5" />
        <Typography variant="body2" className="text-center mt-5">
          <strong>Note:</strong> This receipt is computer generated and requires
          no signature.
        </Typography>
      </Container>
    </Box>
  );
};

export default Receipt;
