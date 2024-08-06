import { configureStore } from "@reduxjs/toolkit";
import bbpsSlice from "../redux";

export const store = configureStore({
  reducer: { bbpsSlice },
});
