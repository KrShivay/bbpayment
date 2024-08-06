import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {compareAsc} from "date-fns";
import {
  billCategories,
  billData,
  billerForCategories,
  paymentToken,
} from "../service";
import {errorService, successService} from "../utils/serviceHelpers";
import showSwal from "../utils/swal";

export const paymentTokenApi = createAsyncThunk(
  "bbpsSlice/paymentTokenApi",
  async () =>
    paymentToken().then((resp) => ({
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
      // ...resp,
      apiResponseCode: 200,
      apiResponseMessage: "Success",
      apiResponseFrom: "GET BILLER LIST : BILL PAY CONTR",
      apiResponseDateTime: "2024-08-06T16:47:49.804Z",
      apiResponseData: {
        responseCode: 200,
        responseMessage: "Success",
        responseData: {
          billData: {
            txnDateTime: "06-08-2024 21:23:13",
            responseCode: "200",
            responseMessage: "Success",
            responseFrom: "RBLS",
            txnResponse: {
              responseCode: "200",
              responseMessage: "SUCCESS",
              merchnatID: "6",
              subMerchnatID: "726963",
              rmn: "",
              urn: "2421921239054",
              txnSlip: "",
              billDetails:
                '{"code":200,"payload":{"billerId":"IDFC00000NATXM","amount":100,"additionalParams":{"Available Recharge Limit":"9360","tagId":"34161FA820328EE830E4AC60","Available Balance":"640","vehicleClass":"4","vehicleClassDesc":"Car / Jeep / Van","status":"Activated"},"dueDate":"1900-01-01","requestTimeStamp":"2024-08-06","approvalRefNum":"470542462","billDate":"1900-01-01","refId":"446F09AE8BE74D3888A038AF9B842192123","billNumber":"NA","accountHolderName":"id fc","amountDetails":null,"billPeriod":"NA"},"status":"SUCCESS"}',
              refID: "446F09AE8BE74D3888A038AF9B842192123",
            },
          },
        },
      },
    }));
  }
);

const bbpsSlice = createSlice({
  name: "bbpsSlice",
  initialState: {
    paymentTokenApiLoading: false,
    paymentAuthToken: sessionStorage.getItem("paymentAuthToken"),
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
        console.log({billerForCategoriesList});
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
        const billDataResponse =
          resp?.apiResponseData?.responseData?.billDetails;
        if (!billDataResponse?.length > 0) {
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
