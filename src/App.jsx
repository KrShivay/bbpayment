import {createTheme, ThemeProvider} from "@mui/material";
import * as React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";
import {store} from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a5daa", // Replace with your desired color
    },
    secondary: {
      main: "#33a6a8",
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
