import { useSelector } from "react-redux";

const Notification = () => {
  //const { message, error = false } = notification;
  const { message, error = false } = useSelector((state) => state.notification);

  const notificationStyle = {
    color: error ? "red" : "green",
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    borderColor: error ? "red" : "green",
    borderRadius: ".5rem",
    fontSize: "1.25rem",
    padding: "1rem",
    marginBottom: "1rem",
  };

  return message ? (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  ) : null;
};

export default Notification;
