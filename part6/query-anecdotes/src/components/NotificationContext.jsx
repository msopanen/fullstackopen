import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.payload;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const showNotification = (notification, time) => ({
  type: "SHOW_NOTIFICATION",
  payload: { notification, time },
});

export const hideNotification = () => ({
  type: "HIDE_NOTIFICATION",
});

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationDispatch = () => {
  const parts = useContext(NotificationContext);
  return parts[1];
};

export default NotificationContext;
