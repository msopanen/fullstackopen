import { useContext, useEffect } from "react";
import NotificationContext, { hideNotification } from "./NotificationContext";

const Notification = () => {
  const [n, dispatch] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (n) {
      const timer = setTimeout(() => dispatch(hideNotification()), n.time);
      return () => clearTimeout(timer);
    }
  }, [n]);

  return n && <div style={style}>{n.notification}</div>;
};

export default Notification;
