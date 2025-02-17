"use client";

import { NotificationsProvider } from "@toolpad/core/useNotifications";

interface Props {
  children: React.ReactNode;
}

// Create a notifications provider.
function NotificationProvider({ children }: Props) {
  return <NotificationsProvider>{children}</NotificationsProvider>;
}

export default NotificationProvider;

