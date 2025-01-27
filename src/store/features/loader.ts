import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LoaderVariant = 'default' | 'spinner' | 'dots' | 'pulse'
export type LoaderScope = 'global' | 'local'

interface LoaderState {
  isLoading: boolean
  message?: string
  variant: LoaderVariant
  scope: LoaderScope
  isTransparentBg?: boolean
}

const initialState: LoaderState = {
  isLoading: false,
  message: undefined,
  variant: 'default',
  scope: 'global',
  isTransparentBg: false
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{ message?: string; variant?: LoaderVariant; scope?: LoaderScope; isTransparentBg?: boolean }>) => {
      state.isLoading = true
      state.message = action.payload.message
      state.variant = action.payload.variant || 'default'
      state.scope = action.payload.scope || 'global'
      state.isTransparentBg = action.payload.isTransparentBg || false
    },
    hide: (state) => {
      state.isLoading = false
      state.message = undefined
    }
  }
})

export const { show, hide } = loaderSlice.actions
export const loaderReducer = loaderSlice.reducer;

