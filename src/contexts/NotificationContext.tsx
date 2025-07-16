import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext<ReturnType<typeof notification.useNotification> | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={[api, contextHolder]}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useAppNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useAppNotification must be used within a NotificationProvider');
  }
  return context[0]; // Return the api
};
