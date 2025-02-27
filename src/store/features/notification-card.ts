import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type NotificationType = "success" | "error"

export interface NotificationState {
  isOpen: boolean
  type: NotificationType
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  footer?: {
    text: string
    link: {
      label: string
      onClick: () => void
    }
  }
}

const initialState: NotificationState = {
  isOpen: false,
  type: "success",
  title: "",
  description: "",
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Omit<NotificationState, "isOpen">>) => {
      state.isOpen = true
      state.type = action.payload.type
      state.title = action.payload.title
      state.description = action.payload.description
      state.primaryAction = action.payload.primaryAction
      state.secondaryAction = action.payload.secondaryAction
      state.footer = action.payload.footer
    },
    hideNotification: (state) => {
      state.isOpen = false
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer;


