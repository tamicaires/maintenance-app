import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectThemeSettings = createDraftSafeSelector(
  (state: RootState) => state.themeSettings,
  (themeSettings) => themeSettings.theme
);

export const selectAuth = createDraftSafeSelector(
  (state: RootState) => state.auth,
  (auth) => ({
    user: auth.user,
    error: auth.error,
  })
);

export const selectMembership = createDraftSafeSelector(
  (state: RootState) => state.membership,
  (membership) => ({
    membership: membership.currentMembership,
    loading: membership.status === "loading",
  })
);

export const selectNotification = createDraftSafeSelector(
  (state: RootState) => state.notification,
  (notification) => ({
    isOpen: notification.isOpen,
    type: notification.type,
    title: notification.title,
    description: notification.description,
    primaryAction: notification.primaryAction,
    secondaryAction: notification.secondaryAction,
    footer: notification.footer,
  })
);
