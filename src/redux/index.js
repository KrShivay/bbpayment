import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {compareAsc} from "date-fns";
import {
  billCategories,
  billData,
  billerForCategories,
  paymentToken,
  submitBill,
} from "../service";
import {errorService, successService} from "../utils/serviceHelpers";
import showSwal from "../utils/swal";

export const paymentTokenApi = createAsyncThunk(
  "bbpsSlice/paymentTokenApi",
  async (userId) =>
    paymentToken(userId).then((resp) => ({
      ...resp,
    }))
);

export const billCategoriesApi = createAsyncThunk(
  "bbpsSlice/billCategoriesApi",
  async (headers) =>
    billCategories(headers).then((resp) => ({
      ...resp,
    }))
);

export const billerForCategoriesApi = createAsyncThunk(
  "bbpsSlice/billerForCategoriesApi",
  async ({payload, headers}) => {
    return billerForCategories(payload, headers).then((resp) => ({
      ...resp,
    }));
  }
);

export const billDataApi = createAsyncThunk(
  "bbpsSlice/billDataApi",
  async ({payload, headers}) => {
    return billData(payload, headers).then((resp) => ({
      ...resp,
    }));
  }
);

// submitBill

export const submitBillApi = createAsyncThunk(
  "bbpsSlice/submitBillApi",
  async ({payload, headers}) => {
    return submitBill(payload, headers).then((resp) => ({
      ...resp,
    }));
  }
);

const bbpsSlice = createSlice({
  name: "bbpsSlice",
  initialState: {
    paymentTokenApiLoading: false,
    paymentAuthToken: sessionStorage.getItem("paymentAuthToken"),
    redirectUrl: "",
    billCategoriesApiLoading: false,
    billCategoriesList: [],
    billerForCategoriesApiLoading: false,
    billerForCategoriesList: [],
    billDataApiLoading: false,
    billDataResponse: [],
    selectedTab: 0,
    selectedSubBiller: [],
    billerRequestData: [],
    displayAmountValue: 0,
    amountValue: 0,
    amountError: false,
    submitBillLoading: false,
    txnSlip: [],
  },
  reducers: {
    resetPaymentToken: (state, _action) => {
      state.paymentAuthToken = "";
    },
    resetBillData: (state, _action) => {
      state.billDataResponse = [];
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setSubBiller: (state, action) => {
      state.selectedSubBiller = action.payload;
    },
    resetBillModalState: (state, action) => {
      state.billDataResponse = [];
      state.billerRequestData = [];
      state.displayAmountValue = 0;
      state.amountValue = 0;
      state.amountError = false;
    },
    resetTxnSlip: (state, _action) => {
      state.txnSlip = [];
    },
    setState: (state, action) => {
      const key = Object.keys(action.payload);
      for (let i = 0; i < key?.length; i++) {
        state[key[i]] = action.payload[key[i]];
      }
    },
  },
  extraReducers: (builder) => {
    // ------------------- paymentTokenApi -------------------
    builder.addCase(paymentTokenApi.pending, (state, _actions) => {
      state.paymentTokenApiLoading = true;
      state.paymentAuthToken = "";
    });
    builder.addCase(paymentTokenApi.fulfilled, (state, actions) => {
      state.paymentTokenApiLoading = false;
      const resp = actions.payload;
      if (successService(resp)) {
        const paymentAuthToken =
          resp?.apiResponseData?.responseData?.accessToken;
        state.redirectUrl = resp?.apiResponseData?.responseData?.redirectUrl;
        if (!paymentAuthToken) {
          showSwal({
            icon: "info",
            message:
              resp?.apiResponseData?.responseMessage ||
              resp?.apiResponseData?.apiResponseMessage,
          });
        } else {
          sessionStorage.setItem("paymentAuthToken", paymentAuthToken);
          state.paymentAuthToken = paymentAuthToken;
        }
      } else {
        errorService(resp);
      }
    });
    builder.addCase(paymentTokenApi.rejected, (state, _actions) => {
      state.paymentTokenApiLoading = false;
      state.paymentAuthToken = "";
    });

    // ------------------- billCategoriesApi -------------------

    builder.addCase(billCategoriesApi.pending, (state, _actions) => {
      state.billCategoriesApiLoading = true;
      state.billCategoriesList = [];
    });
    builder.addCase(billCategoriesApi.fulfilled, (state, actions) => {
      state.billCategoriesApiLoading = false;
      const resp = actions.payload;
      if (successService(resp)) {
        const billerCategoriesList =
          resp?.apiResponseData?.responseData?.billerCategories;
        if (!billerCategoriesList?.length > 0) {
          showSwal({
            icon: "info",
            message:
              resp?.apiResponseData?.responseMessage ||
              resp?.apiResponseData?.apiResponseMessage,
          });
        } else {
          state.billCategoriesList = billerCategoriesList;
        }
      } else {
        errorService(resp);
      }
    });
    builder.addCase(billCategoriesApi.rejected, (state, _actions) => {
      state.billCategoriesApiLoading = false;
      state.billCategoriesList = [];
    });

    // ------------------- billerForCategoriesApi -------------------

    builder.addCase(billerForCategoriesApi.pending, (state, _actions) => {
      state.billerForCategoriesApiLoading = true;
      state.billerForCategoriesList = [];
      state.selectedSubBiller = [];
    });
    builder.addCase(billerForCategoriesApi.fulfilled, (state, actions) => {
      state.billerForCategoriesApiLoading = false;
      const resp = actions.payload;
      if (successService(resp)) {
        const billerForCategoriesList =
          resp?.apiResponseData?.responseData?.billers;
        if (!billerForCategoriesList?.length > 0) {
          showSwal({
            icon: "info",
            message:
              resp?.apiResponseData?.responseMessage ||
              resp?.apiResponseData?.apiResponseMessage,
          });
        } else {
          state.billerForCategoriesList = billerForCategoriesList;
          state.selectedSubBiller = billerForCategoriesList[0];
        }
      } else {
        errorService(resp);
      }
    });
    builder.addCase(billerForCategoriesApi.rejected, (state, _actions) => {
      state.billerForCategoriesApiLoading = false;
      state.billerForCategoriesList = [];
    });

    // ------------------- billDataApi -------------------

    builder.addCase(billDataApi.pending, (state, _actions) => {
      state.billDataApiLoading = true;
      state.billDataResponse = [];
    });
    builder.addCase(billDataApi.fulfilled, (state, actions) => {
      state.billDataApiLoading = false;
      const resp = actions.payload;
      if (successService(resp)) {
        // const billDataResponse = resp?.apiResponseData?.responseData?.billData;
        const billDataResponse = {
          ...resp?.apiResponseData?.responseData,
          txnDateTime:
            resp?.apiResponseData?.responseData?.billData.txnDateTime,
        };
        if (!Object.keys(billDataResponse)?.length > 0) {
          showSwal({
            icon: "info",
            message:
              resp?.apiResponseData?.responseMessage ||
              resp?.apiResponseData?.apiResponseMessage,
          });
        } else {
          state.billDataResponse = billDataResponse;
          const earlyDate = new Date(
            billDataResponse?.payload?.additionalParams["Early Payment Date"]
          );
          const dueDate = new Date(billDataResponse?.payload?.dueDate);
          const txnDate = new Date(billDataResponse?.payload?.requestTimeStamp);

          const amount = billDataResponse?.payload?.amount;
          const earlyAmount =
            billDataResponse?.payload?.additionalParams["Early Payment Amount"];
          const lateAmount =
            billDataResponse?.payload?.additionalParams["Late Payment Amount"];
          if (Number(billDataResponse?.payload?.amount) !== 0) {
            if (compareAsc(txnDate, earlyDate) <= 0) {
              state.displayAmountValue =
                earlyAmount?.toString() ?? amount?.toString();
              state.amountValue = earlyAmount?.toString() ?? amount?.toString();
            } else if (
              compareAsc(txnDate, earlyDate) > 0 &&
              compareAsc(txnDate, dueDate) <= 0
            ) {
              state.displayAmountValue = amount?.toString();
              state.amountValue = amount?.toString();
            } else if (compareAsc(txnDate, dueDate) > 0) {
              state.displayAmountValue =
                lateAmount?.toString() ?? amount?.toString();
              state.amountValue = lateAmount?.toString() ?? amount?.toString();
            } else {
              state.displayAmountValue = amount?.toString();
              state.amountValue = amount?.toString();
            }
          }
        }
      } else {
        errorService(resp);
      }
    });
    builder.addCase(billDataApi.rejected, (state, _actions) => {
      state.billDataApiLoading = false;
      state.billDataResponse = [];
    });

    // ------------------- submitBillApi -------------------

    builder.addCase(submitBillApi.pending, (state, _actions) => {
      state.submitBillLoading = true;
      state.txnSlip = [];
    });
    builder.addCase(submitBillApi.fulfilled, (state, actions) => {
      state.submitBillLoading = false;
      const resp = actions.payload;
      if (successService(resp)) {
        const txnSlip = resp?.apiResponseData?.responseData;
        if (!txnSlip?.length > 0) {
          showSwal({
            icon: "info",
            message:
              resp?.apiResponseData?.responseMessage ||
              resp?.apiResponseData?.apiResponseMessage,
          });
        } else {
          state.txnSlip = txnSlip;
        }
      } else {
        errorService(resp);
      }
    });
    builder.addCase(submitBillApi.rejected, (state, _actions) => {
      state.submitBillLoading = false;
      state.txnSlip = [];
    });
  },
});

export const {
  resetPaymentToken,
  resetBillData,
  setSelectedTab,
  setState,
  setSubBiller,
  resetBillModalState,
} = bbpsSlice.actions;
export default bbpsSlice.reducer;
