// import { notification } from 'antd';
// import { createContext, useContext } from 'react';

// const [api, contextHolder] = notification.useNotification();
// export const NotificationContext = createContext(api);

// export function NotificationProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <NotificationContext.Provider value={api}>
//       {contextHolder}
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export const useAppNotification = () => useContext(NotificationContext);
// NotificationContext.tsx
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
