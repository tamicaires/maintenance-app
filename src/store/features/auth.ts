import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/auth";
import { AppThunk } from "../store";
import {
  decodeToken,
  getUserLocalStorage,
  setUserLocalStorage,
} from "@/utils/auth";
import { AuthService } from "@/services/auth";

interface AuthState {
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  user: getUserLocalStorage(),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
      setUserLocalStorage(action.payload);
      state.error = null;
    },
    logout(state) {
      state.user = null;
      setUserLocalStorage(null);
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    cleanError(state) {
      state.error = null;
    },
  },
});

export const { setUser, logout, setError, cleanError } = authSlice.actions;

export const authenticate =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    const response = await AuthService.signIn(email, password);
    if (response.success && response.data) {
      if (!response.data.access_token) {
        throw new Error("Token não encontrado");
      }

      const decodedToken = decodeToken(response.data.access_token);
      dispatch(setUser(decodedToken));
    }

    if (!response.success) {
      dispatch(setError(response.error || "Login falhou!"));
      throw new Error(response.error || "Login falhou!");
    }
  };

export const authReducer = authSlice.reducer;
