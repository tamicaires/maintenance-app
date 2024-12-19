import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LoaderVariant = 'default' | 'spinner' | 'dots' | 'pulse'

interface LoaderState {
  isLoading: boolean
  message?: string
  variant: LoaderVariant
}

const initialState: LoaderState = {
  isLoading: false,
  message: undefined,
  variant: 'default'
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{ message?: string; variant?: LoaderVariant }>) => {
      state.isLoading = true
      state.message = action.payload.message
      state.variant = action.payload.variant || 'default'
    },
    hide: (state) => {
      state.isLoading = false
      state.message = undefined
    }
  }
})

export const { show, hide } = loaderSlice.actions
export const loaderReducer = loaderSlice.reducer;

