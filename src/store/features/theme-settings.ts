import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
};

const themeSlice = createSlice({
  name: "theme-settings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem("vite-ui-theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
