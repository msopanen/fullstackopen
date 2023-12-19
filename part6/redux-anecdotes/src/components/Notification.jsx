import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const visible = notification.length > 0;

  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideNotification()), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: visible ? "" : "none",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
