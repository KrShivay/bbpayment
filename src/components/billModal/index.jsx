import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {format} from "date-fns";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 3,
};

const getErrorMessage = (amount) => {
  if (amount && Number(amount) > 49999) {
    return "Maximum amount allowed is 49,999!";
  } else {
    return "Transfer amount is required!";
  }
};

function BillModal({open, handleClose}) {
  const {
    billDataResponse,
    billerRequestData,
    displayAmountValue,
    selectedSubBiller,
    amountValue,
    amountError,
  } = useSelector((state) => state.bbpsSlice);
  const dispatch = useDispatch();

  const handelChangeAmount = (e) => {
    dispatch(setState({amountValue: e.target.value}));
  };

  const handleChangeError = (bool) => {
    dispatch(
      setState({
        amountError: bool,
      })
    );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Bill Details
            </Typography>
            <IconButton onClick={handleClose}>x</IconButton>
          </Box>
          <div style={{maxHeight: "50vh", overflow: "scroll"}}>
            <table
              className="tw-w-full tw-border tw-border-gray-600 tw-mb-4"
              style={{maxHeight: "50vh"}}
            >
              <tbody style={{maxHeight: "50vh"}}>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    {billerRequestData[0]?.CustParam1Name}
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {billerRequestData[0]?.CustParam1Value}
                  </td>
                </tr>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Account Holder Name
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {billDataResponse?.payload?.accountHolderName}
                  </td>
                </tr>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Bill Number
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {billDataResponse?.payload?.refId}
                  </td>
                </tr>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Biller Name
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {selectedSubBiller?.billerName}
                  </td>
                </tr>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Bill Date
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {billDataResponse?.txnDateTime}
                  </td>
                </tr>
                {billDataResponse?.payload?.dueDate ? (
                  <tr>
                    <th
                      align="left"
                      className="tw-border tw-border-gray-600 tw-p-4"
                    >
                      Due Date
                    </th>
                    <td className="tw-border tw-border-gray-600 tw-p-4">
                      {format(
                        new Date(billDataResponse?.payload?.dueDate),
                        "dd-MM-yyyy"
                      )}
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Amount
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {displayAmountValue ?? 0}
                  </td>
                </tr>
                <tr>
                  <th
                    align="left"
                    className="tw-border tw-border-gray-600 tw-p-4"
                  >
                    Total Amount
                  </th>
                  <td className="tw-border tw-border-gray-600 tw-p-4">
                    {displayAmountValue ?? 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <TextField
            autoComplete="new-password"
            disabled={false}
            size="small"
            value={amountValue}
            onWheel={(e) => document.activeElement.blur()}
            onInput={(e) => {
              var textInput = e.target.value.slice(0, 8);
              textInput = textInput.replace(/[^0-9.]/g, "");

              e.target.value = textInput;
              const le = e.target.value;
              const len = le?.toString()?.split(".")[0]?.length;
              if (len <= 5 && le?.length <= 8) {
                handelChangeAmount(e);
                if (len === 0) {
                  handleChangeError(true);
                } else if (e.target.value && Number(e.target.value) > 49999) {
                  handleChangeError(true);
                } else {
                  handleChangeError(false);
                }
              }
            }}
            onKeyDown={(evt) => {
              const regex = new RegExp(/^\d{0,6}\.?\d{0,2}$/g);
              const specialKeys = [
                "Backspace",
                "Tab",
                "End",
                "Home",
                "ArrowLeft",
                "ArrowRight",
                "Del",
                "Delete",
                "e",
                "E",
                "+",
                "-",
                "ArrowUp",
                "ArrowDown",
              ];
              if (specialKeys.indexOf(evt.key) !== -1) {
                return;
              }
              let current = evt.target.value;
              const position = current.length;
              const next = [
                current.slice(0, position),
                evt.key == "Decimal" ? "." : evt.key,
                current.slice(position),
              ].join("");
              if (next && !String(next).match(regex)) {
                evt.preventDefault();
              }
            }}
            sx={{
              "& legend": {display: "none"},
              "& fieldset": {top: 0},
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            placeholder="Enter amount"
            error={amountError}
            helperText={amountError ? getErrorMessage(amountError) : ""}
            variant="outlined"
            fullWidth
            className="tw-px-4 tw-text-sm"
          />
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              className="!text-white"
              onClick={handleClose}
            >
              Pay Bill
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BillModal;
