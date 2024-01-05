import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const { message, error = false } = useSelector((state) => state.notification);

  return message ? (
    <Alert className="notification" severity={error ? "error" : "success"}>
      {message}
    </Alert>
  ) : null;
};

export default Notification;
