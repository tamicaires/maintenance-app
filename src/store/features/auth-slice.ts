import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: any | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    updateUser: (state, action: PayloadAction<Partial<any>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { setUser, clearUser, updateUser } = authSlice.actions

export default authSlice.reducer

