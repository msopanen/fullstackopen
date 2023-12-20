import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const visible = notification.length > 0;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: visible ? "" : "none",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
