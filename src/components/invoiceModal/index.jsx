import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import bbpsImages from "../../assets/bbpsImages";

const InvoiceModal = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-5">
      <div className="bg-white border border-gray-300 p-5 w-full max-w-4xl shadow-lg">
        <div className="flex items-center py-1 relative">
          <div className="text-sm">2024/08/18, 09:47</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start mb-5 border border-black">
          <div className="flex items-center justify-center border-b md:border-b-0 md:border-r border-black p-5">
            <img
              src={bbpsImages.finkedaLogo}
              alt="Company Logo"
              className="max-w-xs h-auto"
            />
          </div>
          <div className="p-5 text-sm">
            <p>
              <strong>Receipt No:</strong> IA24G097W22249093042
            </p>
            <p>
              <strong>Receipt Date/Time:</strong> 2024-08-12 09:30:42
            </p>
            <p>
              <strong>Name:</strong> AKHAND PRATAP YADAV (Prashant computer)
            </p>
            <p>
              <strong>BCE Code:</strong> IKD783422733
            </p>
            <p>
              <strong>Phone:</strong> 8120577975
            </p>
            <p>
              <strong>Email:</strong> akhandyadav801@gmail.com
            </p>
          </div>
        </div>
        <TableContainer component={Paper} className="mb-5">
          <Table aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Reference Number</TableCell>
                <TableCell>Amount(₹)</TableCell>
                <TableCell>Bank Name</TableCell>
                <TableCell>RRN</TableCell>
                <TableCell>Aadhar Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Aadhar Pay</TableCell>
                <TableCell>IA24G097W22249093042</TableCell>
                <TableCell>5000.00</TableCell>
                <TableCell>
                  Union Bank of India erstwhile Corporation Bank erstwhile
                  Andhra Bank
                </TableCell>
                <TableCell>422509287252</TableCell>
                <TableCell>********3882</TableCell>
                <TableCell>Success</TableCell>
                <TableCell>2024-08-12 09:30:42</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="text-center text-sm mt-5">
          <p>
            <strong>Note:</strong> This receipt is computer generated and
            requires no signature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
