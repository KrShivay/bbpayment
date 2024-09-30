import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
  billDataApi,
  resetBillModalState,
  setState,
  submitBillApi,
} from "../../redux";
import {convertCustomerData} from "../../utils/helper";
import BillModal from "../billModal";
import ContainerModal from "../containerModal";
import Receipt from "../receipt";

const DynamicForm = ({data}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {
    paymentAuthToken,
    selectedSubBiller,
    billDataResponse,
    amountValue,
    billerRequestData,
    displayAmountValue,
    txnSlip,
  } = useSelector((state) => state.bbpsSlice);
  const [open, setOpen] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatchEvent(resetBillModalState());
  };

  const [openReceipt, setOpenReceipt] = useState(false);

  const handleOpenReceipt = () => setOpenReceipt(true);
  const handleCloseReceipt = () => {
    dispatch(setState({txnSlip: []}));
    setOpenReceipt(false);
  };

  const handleSubmitBillAmount = () => {
    setOpen(false);
    // handleOpenOtpModal();
    const payload = {
      localDateTime: new Date().getTime(),
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      deviceFingerprint: sessionStorage.getItem("fingerprint"),
      ipAddress: sessionStorage.getItem("ip"),
      operatorId: selectedSubBiller?.billerId,
      operatorAccount: billDataResponse?.payload?.accountHolderName,
      amount: amountValue,
      billAmount: displayAmountValue,
      billRequestForm: billerRequestData,
      billerCategory: selectedSubBiller?.billerCategory,
      refId: billDataResponse?.refId,
      requestFrom: "WEB",
      serviceType: "BILL_PAYMENT",
    };
    const headers = {
      authToken: paymentAuthToken,
    };
    dispatch(submitBillApi({payload, headers}));
  };

  // const handleSubmitOtp = (otp) => {
  //   // Handle OTP submission logic here
  //   console.log("Submitted OTP:", otp);
  //   setOpenOtpModal(false);
  // };

  // const handleOpenOtpModal = () => setOpenOtpModal(true);

  // const handleCloseOtpModal = () => {
  //   setOpenOtpModal(false);
  //   dispatchEvent(resetBillModalState());
  // };

  const onSubmit = (formData) => {
    const payload = {
      billerRequestData: convertCustomerData(formData),
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      deviceFingerprint: sessionStorage.getItem("fingerprint"),
      transactionDate: new Date().getTime(),
      ipAddress: sessionStorage.getItem("ip"),
      operatorId: selectedSubBiller?.billerId,
      requestFrom: "WEB",
      serviceType: "BILL_FETCH",
      customerName: "NA",
      customerMobile: "NA",
    };
    dispatch(
      setState({
        billerRequestData: payload.billerRequestData,
      })
    );
    const headers = {authToken: paymentAuthToken};
    dispatch(billDataApi({payload, headers}));
    // handleOpen();
  };

  useEffect(() => {
    if (Object.keys(billDataResponse)?.length > 0) {
      handleOpen();
    }
  }, [billDataResponse]);

  useEffect(() => {
    if (txnSlip?.length > 0) {
      handleOpenReceipt();
    }
  }, [txnSlip]);

  useEffect(() => {
    reset();
    // dispatch(resetBillModalState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const renderTextField = (field, index) => {
    return (
      <Controller
        key={index}
        name={field.paramName}
        control={control}
        rules={{
          required:
            field.optional === false || field.optional === "false"
              ? `${field.paramName} is required`
              : false,
          minLength: field.minLength
            ? {
                value: field.minLength,
                message: `${field.paramName} must be at least ${field.minLength} characters long`,
              }
            : undefined,
          maxLength: field.maxLength
            ? {
                value: field.maxLength,
                message: `${field.paramName} must be at most ${field.maxLength} characters long`,
              }
            : undefined,
          pattern: field.regex
            ? {
                value: new RegExp(field.regex),
                message: `${field.paramName} does not match the required pattern`,
              }
            : undefined,
        }}
        render={({field}) => (
          <TextField
            {...field}
            label={field.name}
            variant="outlined"
            fullWidth
            size="small"
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        )}
      />
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {data?.map(
            (field, index) =>
              (field.visibility || field.paramName) && (
                <Grid item xs={12} key={index}>
                  {renderTextField(field, field.paramName)}
                </Grid>
              )
          )}
          <Grid item xs={12}>
            {data?.length > 0 && Object.keys(data[0])?.length > 0 ? (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="!text-white"
              >
                Submit
              </Button>
            ) : (
              <Typography className="my-2 text-gray-500">
                No Form Data Available
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
      <BillModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmitBillAmount}
      />
      {/* <OTPModal
        open={openOtpModal}
        handleClose={handleCloseOtpModal}
        handleSubmit={handleSubmitOtp}
      /> */}
      <ContainerModal
        component={<Receipt />}
        open={openReceipt}
        handleClose={handleCloseReceipt}
      />
    </>
  );
};

export default DynamicForm;
