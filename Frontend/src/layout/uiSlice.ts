import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  return localStorage.getItem("theme") === "dark" ? true : false;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setDarkMode: (state) => {
      localStorage.setItem("theme", !state.darkMode ? "dark" : "light");
      state.darkMode = !state.darkMode;
    },
  },
});

export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
