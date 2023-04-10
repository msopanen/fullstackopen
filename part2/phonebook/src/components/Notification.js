import { useEffect, useState } from "react";

export const DEFAULT_NOTIFICATION = { id: 0, message: null };

const notificationStyle = {
  color: "green",
  backgroundColor: "lightgrey",
  borderStyle: "solid",
  borderColor: "green",
  borderRadius: ".5rem",
  fontSize: "1.25rem",
  padding: "1rem",
  marginBottom: "1rem",
};

const Notification = ({ notification }) => {
  const { id, message } = notification;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) setShow(true);
  }, [id, message]);

  useEffect(() => {
    const delay = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(delay);
  });

  return show ? <div style={notificationStyle}>{message}</div> : null;
};

export default Notification;
